package entities

import "github.com/jinzhu/gorm"

type Application struct {
	gorm.Model
	ApplicationStatusID uint
	ApplicationStatus   *ApplicationStatus `json:",omitempty"`
	Documents           []*Document        `json:",omitempty"`
	ChangeLogs          []*ChangeLog       `json:",omitempty"`
	EmployeeID          *uint
	Employee            *Employee          `json:",omitempty"`
	ClientID            uint
	Client              *Client            `json:",omitempty"`
	ServiceTypeID       uint
	ServiceType         *ServiceType       `json:",omitempty"`
	Comments            []*Comment         `json:",omitempty"`
}
