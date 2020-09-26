package entities

import "github.com/jinzhu/gorm"

type DocumentType struct {
	gorm.Model
	Name          string
	Description   string
	ServiceTypeID uint
	ServiceType   ServiceType
	ExampleLink   *string
}
