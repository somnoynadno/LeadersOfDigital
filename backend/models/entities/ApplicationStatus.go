package entities

import "github.com/jinzhu/gorm"

type ApplicationStatus struct {
	gorm.Model
	Name        string
	Description string
}
