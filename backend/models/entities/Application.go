package entities

import "github.com/jinzhu/gorm"

type Application struct {
	gorm.Model
	ApplicationStatusID uint
	ApplicationStatus   ApplicationStatus
	Documents           []*Document
	ChangeLogs          []*ChangeLog
	EmployeeID          *uint
	Employee            *Employee
	ClientID            uint
	Client              Client
	ServiceTypeID       uint
	ServiceType         ServiceType
	Comments            []*Comment
}
