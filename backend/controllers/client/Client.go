package client

import (
	"LeadersOfDigital/backend/db"
	"LeadersOfDigital/backend/models/entities"
	u "LeadersOfDigital/backend/utils"
	"encoding/json"
	"github.com/jinzhu/gorm"
	"net/http"
)

var RetrieveClient = func(w http.ResponseWriter, r *http.Request) {
	Client := &entities.Client{}
	clientID := u.GetUserIDFromRequest(r)

	db := db.GetDB()
	err := db.First(&Client, clientID).Error

	if err != nil {
		if err == gorm.ErrRecordNotFound {
			u.HandleNotFound(w)
		} else {
			u.HandleBadRequest(w, err)
		}
		return
	}

	res, _ := json.Marshal(Client)
	u.RespondJSON(w, res)
}
