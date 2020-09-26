package entities

import "github.com/jinzhu/gorm"

type ServiceType struct {
	gorm.Model
	Name          string
	Description   string
	DocumentTypes []*DocumentType `json:",omitempty"`
}
