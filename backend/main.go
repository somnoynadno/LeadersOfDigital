package main

import (
	log "github.com/sirupsen/logrus"
	"net/http"
	"os"
)

func init() {
	log.SetOutput(os.Stdout)
	log.SetLevel(log.DebugLevel)
}

func main() {
	router := InitRouter()

	port := os.Getenv("PORT")
	if port == "" {
		port = "4000" // localhost
	}

	log.Info("listening on: ", port)

	err := http.ListenAndServe(":" + port, router)
	if err != nil {
		log.Panic(err)
	}
}