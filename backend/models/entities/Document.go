package entities

import "github.com/jinzhu/gorm"

type Document struct {
	gorm.Model
	Link           string
	DocumentTypeID uint
	DocumentType   DocumentType
	ApplicationID  uint
	Application    Application
}
