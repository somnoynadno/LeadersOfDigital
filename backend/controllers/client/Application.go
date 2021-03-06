package client

import (
	"LeadersOfDigital/backend/db"
	"LeadersOfDigital/backend/models/entities"
	u "LeadersOfDigital/backend/utils"
	"encoding/json"
	"errors"
	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
	"net/http"
)

var CreateApplication = func(w http.ResponseWriter, r *http.Request) {
	Application := &entities.Application{}
	err := json.NewDecoder(r.Body).Decode(Application)
	clientID := u.GetUserIDFromRequest(r)

	if err != nil {
		u.HandleBadRequest(w, err)
		return
	}

	Application.ClientID = clientID
	Application.ApplicationStatusID = 1 // new

	db := db.GetDB()
	err = db.Create(Application).Error

	if err != nil {
		u.HandleBadRequest(w, err)
	} else {
		res, _ := json.Marshal(Application)
		u.RespondJSON(w, res)
	}
}

var RetrieveApplication = func(w http.ResponseWriter, r *http.Request) {
	Application := &entities.Application{}

	params := mux.Vars(r)
	id := params["id"]

	db := db.GetDB()
	// база данных не сдохнет
	// я это гарантирую
	err := db.Preload("ApplicationStatus").
		Preload("Documents").
		Preload("ChangeLogs").
		Preload("Comments").
		Preload("ServiceType").
		Preload("ServiceType.DocumentTypes").
		Preload("Client").
		Preload("Employee").
		First(&Application, id).Error

	if err != nil {
		if err == gorm.ErrRecordNotFound {
			u.HandleNotFound(w)
		} else {
			u.HandleBadRequest(w, err)
		}
		return
	}

	clientID := u.GetUserIDFromRequest(r)
	if Application.ClientID != clientID {
		u.HandleForbidden(w, errors.New("forbidden"))
		return
	}

	res, err := json.Marshal(Application)
	if err != nil {
		u.HandleBadRequest(w, err)
	} else if Application.ID == 0 {
		u.HandleNotFound(w)
	} else {
		u.RespondJSON(w, res)
	}
}

var UpdateApplication = func(w http.ResponseWriter, r *http.Request) {
	Application := &entities.Application{}

	params := mux.Vars(r)
	id := params["id"]

	db := db.GetDB()
	err := db.First(&Application, id).Error

	if err != nil {
		if err == gorm.ErrRecordNotFound {
			u.HandleNotFound(w)
		} else {
			u.HandleBadRequest(w, err)
		}
		return
	}

	clientID := u.GetUserIDFromRequest(r)
	if Application.ClientID != clientID {
		u.HandleForbidden(w, errors.New("forbidden"))
		return
	}

	newApplication := &entities.Application{}
	err = json.NewDecoder(r.Body).Decode(newApplication)

	if err != nil {
		u.HandleBadRequest(w, err)
		return
	}

	err = db.Model(&Application).Updates(newApplication).Error

	if err != nil {
		u.HandleBadRequest(w, err)
	} else {
		u.Respond(w, u.Message(true, "OK"))
	}
}

var DeleteApplication = func(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id := params["id"]

	db := db.GetDB()
	Application := entities.Application{}
	err := db.First(&Application, id).Error

	if err != nil {
		if err == gorm.ErrRecordNotFound {
			u.HandleNotFound(w)
		} else {
			u.HandleBadRequest(w, err)
		}
		return
	}

	clientID := u.GetUserIDFromRequest(r)
	if Application.ClientID != clientID {
		u.HandleForbidden(w, errors.New("forbidden"))
		return
	}

	err = db.Delete(&entities.Application{}, id).Error

	if err != nil {
		u.HandleBadRequest(w, err)
	} else {
		u.Respond(w, u.Message(true, "OK"))
	}
}

var GetClientsApplications = func(w http.ResponseWriter, r *http.Request) {
	var entities []entities.Application
	clientID := u.GetUserIDFromRequest(r)

	db := db.GetDB()
	err := db.Preload("ApplicationStatus").
		Preload("Documents").
		Preload("ServiceType").
		Preload("ServiceType.DocumentTypes").
		Where("client_id = ?", clientID).Find(&entities).Error

	if err != nil {
		u.HandleBadRequest(w, err)
		return
	}

	res, err := json.Marshal(entities)
	if err != nil {
		u.HandleBadRequest(w, err)
	} else {
		u.RespondJSON(w, res)
	}
}
