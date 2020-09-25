package entities

import "github.com/jinzhu/gorm"

type Comment struct {
	gorm.Model
	Text          string
	EmployeeID    uint
	IsChecked     bool
	ApplicationID uint
}
