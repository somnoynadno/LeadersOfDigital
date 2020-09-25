package entities

import "github.com/jinzhu/gorm"

type Client struct {
	gorm.Model
	User
	Applications []*Application
}
