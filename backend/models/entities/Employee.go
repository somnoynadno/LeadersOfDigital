package entities

import "github.com/jinzhu/gorm"

type Employee struct {
	gorm.Model
	User
	Applications []*Application `json:",omitempty"`
}