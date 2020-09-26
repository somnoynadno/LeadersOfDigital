package common

import (
	"LeadersOfDigital/backend/db"
	"LeadersOfDigital/backend/models/entities"
	u "LeadersOfDigital/backend/utils"
	"encoding/json"
	"errors"
	"github.com/jinzhu/gorm"
	"net/http"
)

// TODO: explicit check IsEmployee field from context
var AddClientComment = func(w http.ResponseWriter, r *http.Request) {
	comment := &entities.Comment{}
	err := json.NewDecoder(r.Body).Decode(comment)

	if err != nil {
		u.HandleBadRequest(w, err)
		return
	}

	clientID := u.GetUserIDFromRequest(r)

	db := db.GetDB()
	application := &entities.Application{}
	err = db.First(&application, comment.ApplicationID).Error

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

	err = db.Create(comment).Error
	if err != nil {
		u.HandleBadRequest(w, err)
	} else {
		res, _ := json.Marshal(comment)
		u.RespondJSON(w, res)
	}
}

// TODO: explicit check IsEmployee field from context
var AddEmployeeComment = func(w http.ResponseWriter, r *http.Request) {
	comment := &entities.Comment{}
	err := json.NewDecoder(r.Body).Decode(comment)

	if err != nil {
		u.HandleBadRequest(w, err)
		return
	}

	employeeID := u.GetUserIDFromRequest(r)

	db := db.GetDB()
	application := &entities.Application{}
	err = db.First(&application, comment.ApplicationID).Error

	if err != nil {
		if err == gorm.ErrRecordNotFound {
			u.HandleNotFound(w)
		} else {
			u.HandleBadRequest(w, err)
		}
		return
	}

	if application.ClientID != employeeID {
		u.HandleForbidden(w, errors.New("forbidden"))
		return
	}

	err = db.Create(comment).Error
	if err != nil {
		u.HandleBadRequest(w, err)
	} else {
		res, _ := json.Marshal(comment)
		u.RespondJSON(w, res)
	}
}