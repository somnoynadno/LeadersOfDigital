package employee

import (
	"LeadersOfDigital/backend/db"
	"LeadersOfDigital/backend/models/entities"
	u "LeadersOfDigital/backend/utils"
	"encoding/json"
	"net/http"
)

var GetAllApplicationStatuses = func(w http.ResponseWriter, r *http.Request) {
	var entities []entities.ApplicationStatus

	db := db.GetDB()
	err := db.Find(&entities).Error

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