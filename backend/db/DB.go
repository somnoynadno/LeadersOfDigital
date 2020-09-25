package db

import (
	"LeadersOfDigital/backend/models/entities"
	"fmt"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	log "github.com/sirupsen/logrus"
	"os"
)

var db *gorm.DB

func init() {
	username := os.Getenv("db_user")
	password := os.Getenv("db_pass")
	dbName := os.Getenv("db_name")
	dbHost := os.Getenv("db_host")
	dbPort := os.Getenv("db_port")

	conn, err := gorm.Open("postgres",
		fmt.Sprintf("host=%s port=%s user=%s dbname=%s password=%s sslmode=disable",
			dbHost, dbPort, username, dbName, password))
	if err != nil {
		panic(err)
	} else {
		db = conn
		log.Info(fmt.Sprintf("DB %s (%s:%s) connected successfully", dbName, dbHost, dbPort))
	}

	migrateSchema()
}

func GetDB() *gorm.DB {
	return db
}

func migrateSchema() {
	db.AutoMigrate(
		entities.Application{},
		entities.ApplicationStatus{},
		entities.ChangeLog{},
		entities.Client{},
		entities.Document{},
		entities.DocumentType{},
		entities.Employee{},
		entities.ServiceType{},
	)
}