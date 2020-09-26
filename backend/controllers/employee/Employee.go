package employee

import (
	"LeadersOfDigital/backend/db"
	"LeadersOfDigital/backend/models/entities"
	u "LeadersOfDigital/backend/utils"
	"encoding/json"
	"github.com/jinzhu/gorm"
	"net/http"
)

var RetrieveEmployee = func(w http.ResponseWriter, r *http.Request) {
	Employee := &entities.Employee{}
	employeeID := u.GetUserIDFromRequest(r)

	db := db.GetDB()
	err := db.First(&Employee, employeeID).Error

	if err != nil {
		if err == gorm.ErrRecordNotFound {
			u.HandleNotFound(w)
		} else {
			u.HandleBadRequest(w, err)
		}
		return
	}

	res, _ := json.Marshal(Employee)
	u.RespondJSON(w, res)
}