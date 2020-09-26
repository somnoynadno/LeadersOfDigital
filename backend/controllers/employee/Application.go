package employee

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

	employeeID := u.GetUserIDFromRequest(r)
	if err != nil {
		u.HandleBadRequest(w, err)
		return
	}

	Application.ClientID = employeeID

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
	err := db.First(&Application, id).Error

	if err != nil {
		if err == gorm.ErrRecordNotFound {
			u.HandleNotFound(w)
		} else {
			u.HandleBadRequest(w, err)
		}
		return
	}

	employeeID := u.GetUserIDFromRequest(r)
	if Application.ClientID != employeeID {
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

	employeeID := u.GetUserIDFromRequest(r)
	if Application.ClientID != employeeID {
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

	employeeID := u.GetUserIDFromRequest(r)
	if Application.ClientID != employeeID {
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

var GetEmployeesApplications = func(w http.ResponseWriter, r *http.Request) {
	var entities []entities.Application
	employeeID := u.GetUserIDFromRequest(r)

	db := db.GetDB()
	err := db.Where("employee_id = ?", employeeID).Find(&entities).Error

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

var GetFreeApplications = func(w http.ResponseWriter, r *http.Request) {
	var entities []entities.Application

	db := db.GetDB()
	err := db.Where("employee_id = null").Find(&entities).Error

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
