package loghub

import (
	"LeadersOfDigital/backend/db"
	"LeadersOfDigital/backend/models/entities"
)

func AddChangeLog(ApplicationID uint, message string) error {
	database := db.GetDB()

	changelog := &entities.ChangeLog{}
	changelog.Message = message
	changelog.ApplicationID = ApplicationID

	err := database.Create(changelog).Error

	return err
}
