package main

import (
	"LeadersOfDigital/backend/controllers/auth"
	"LeadersOfDigital/backend/middleware"
	"github.com/gorilla/mux"
	"net/http"
)

func InitRouter() *mux.Router {
	router := mux.NewRouter()

	// Base API router
	api   := router.PathPrefix("/api").Subrouter()

	// Secondary routers
	client        := api.PathPrefix("/client").Subrouter()
	employee      := api.PathPrefix("/employee").Subrouter()
	authorization := api.PathPrefix("/auth").Subrouter()

	authorization.HandleFunc("/register", auth.Registration).Methods(http.MethodPost, http.MethodOptions)
	authorization.HandleFunc("/login", auth.Login).Methods(http.MethodPost, http.MethodOptions)

	client.HandleFunc("/me", nil).Methods(http.MethodGet, http.MethodOptions)

	client.HandleFunc("/applications", nil).Methods(http.MethodGet, http.MethodOptions)
	client.HandleFunc("/application", nil).Methods(http.MethodPost, http.MethodOptions)
	client.HandleFunc("/application/{id}", nil).Methods(http.MethodGet, http.MethodOptions)
	client.HandleFunc("/application/{id}", nil).Methods(http.MethodDelete, http.MethodOptions)
	client.HandleFunc("/application/{id}/changelog", nil).Methods(http.MethodGet, http.MethodOptions)

	client.HandleFunc("/service_types", nil).Methods(http.MethodGet, http.MethodOptions)

	client.HandleFunc("/application/{id}/add_document", nil).Methods(http.MethodPost, http.MethodOptions)
	client.HandleFunc("/document/{id}", nil).Methods(http.MethodGet, http.MethodOptions)
	client.HandleFunc("/document/{id}", nil).Methods(http.MethodDelete, http.MethodOptions)

	employee.HandleFunc("/me", nil).Methods(http.MethodGet, http.MethodOptions)

	employee.HandleFunc("/free_applications", nil).Methods(http.MethodGet, http.MethodOptions)
	employee.HandleFunc("/applications", nil).Methods(http.MethodGet, http.MethodOptions)
	employee.HandleFunc("/application/{id}", nil).Methods(http.MethodGet, http.MethodOptions)
	employee.HandleFunc("/application/{id}", nil).Methods(http.MethodPut, http.MethodOptions)
	employee.HandleFunc("/application/{id}/changelog", nil).Methods(http.MethodGet, http.MethodOptions)

	// middleware usage
	// do NOT modify the order
	api.Use(middleware.CORS)    // enable CORS headers
	api.Use(middleware.LogPath) // log HTTP request URI and method
	api.Use(middleware.LogBody) // log HTTP request body

	client.Use(middleware.JwtAuthentication) // check JWT token
	employee.Use(middleware.JwtAuthentication) // check JWT token

	return router
}
