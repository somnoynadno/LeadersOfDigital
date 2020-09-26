package common

import (
	"LeadersOfDigital/backend/db"
	"LeadersOfDigital/backend/models/entities"
	u "LeadersOfDigital/backend/utils"
	"encoding/json"
	"net/http"
)

var GetAllServiceTypes = func(w http.ResponseWriter, r *http.Request) {
	var entities []entities.ServiceType

	db := db.GetDB()
	err := db.Preload("DocumentTypes").Find(&entities).Error

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