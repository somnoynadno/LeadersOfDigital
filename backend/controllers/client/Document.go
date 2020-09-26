package client

import (
	"LeadersOfDigital/backend/db"
	"LeadersOfDigital/backend/loghub"
	"LeadersOfDigital/backend/models/entities"
	u "LeadersOfDigital/backend/utils"
	"golang.org/x/crypto/nacl/sign"
	"encoding/json"
	"errors"
	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
	log "github.com/sirupsen/logrus"
	"crypto/sha256"
	"io"
	"net/http"
	"os"
	"strconv"
)

var UploadDocument = func(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id := params["id"]
	docTypeID := params["document_type_id"]
	clientID := u.GetUserIDFromRequest(r)

	applicationID, err := strconv.ParseUint(id, 10, 32)
	if err != nil {
		u.HandleBadRequest(w, err)
		return
	}

	db := db.GetDB()
	application := &entities.Application{}
	err = db.Preload("Client").First(&application, uint(applicationID)).Error

	if err != nil {
		if err == gorm.ErrRecordNotFound {
			u.HandleNotFound(w)
		} else {
			u.HandleBadRequest(w, err)
		}
		return
	}

	if application.ClientID != clientID {
		u.HandleForbidden(w, errors.New("forbidden"))
		return
	}

	// parse data
	dtID, err := strconv.ParseUint(docTypeID, 10, 32)
	if err != nil {
		u.HandleBadRequest(w, err)
		return
	}

	// maximum upload of 10 MB files
	err = r.ParseMultipartForm(10 << 20)
	if err != nil {
		u.HandleInternalError(w, err)
		return
	}

	// get handler for filename, size and headers
	file, handler, err := r.FormFile("File")
	if err != nil {
		u.HandleInternalError(w, err)
		return
	}

	defer file.Close()

	log.Debug("File Size: ", handler.Size)
	log.Debug("MIME Header: ", handler.Header)

	// allow only PDF files
	if handler.Header["Content-Type"][0] != "application/pdf" {
		u.HandleBadRequest(w, errors.New("bad MIME type"))
		return
	}

	// create file
	nameUUID, _ := uuid.NewUUID()
	name := nameUUID.String() + ".pdf"

	link := os.Getenv("upload_path") + "/" + name
	dst, err := os.Create(link)
	defer dst.Close()

	if err != nil {
		u.HandleInternalError(w, err)
		return
	}
	//sign file
	h := sha256.New()
	var s []byte

	if _, err := io.Copy(h, file); err != nil {
		log.Fatal(err)
	}
	signhash := h.Sum(nil)
	privateKey := application.Client.PrivateKey
	sign.Sign(s, signhash, privateKey)

	// copy the uploaded file to the created file on the filesystem
	if _, err := io.Copy(dst, file); err != nil {
		u.HandleInternalError(w, err)
		return
	}


	Document := &entities.Document{}
	Document.ClientID = clientID
	Document.ApplicationID = uint(applicationID)
	Document.DocumentTypeID = uint(dtID)
	Document.Link = name
	Document.Signature = s
	err = db.Create(Document).Error

	if err != nil {
		u.HandleBadRequest(w, err)
	} else {
		_ = loghub.AddChangeLog(application.ID, "Загружен новый файл")
		res, _ := json.Marshal(Document)
		u.RespondJSON(w, res)
	}
}

var DeleteDocument = func(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id := params["id"]

	db := db.GetDB()
	Document := entities.Document{}
	err := db.First(&Document, id).Error

	if err != nil {
		if err == gorm.ErrRecordNotFound {
			u.HandleNotFound(w)
		} else {
			u.HandleBadRequest(w, err)
		}
		return
	}

	clientID := u.GetUserIDFromRequest(r)
	if Document.ClientID != clientID {
		u.HandleForbidden(w, errors.New("forbidden"))
		return
	}

	err = db.Delete(&entities.Document{}, id).Error

	if err != nil {
		u.HandleBadRequest(w, err)
	} else {
		u.Respond(w, u.Message(true, "OK"))
	}
}
