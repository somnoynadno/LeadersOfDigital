package entities

import "github.com/jinzhu/gorm"

type ChangeLog struct {
	gorm.Model
	Message       string
	ApplicationID uint
}