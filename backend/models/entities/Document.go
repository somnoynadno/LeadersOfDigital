package entities

import "github.com/jinzhu/gorm"

type Document struct {
	gorm.Model
	Link           string
	DocumentTypeID uint
	DocumentType   *DocumentType `json:",omitempty"`
	ApplicationID  uint
	Application    *Application  `json:",omitempty"`
	ClientID       uint
	Signature		[]byte
}
