package main

import (
	"LeadersOfDigital/backend/controllers/auth"
	"LeadersOfDigital/backend/controllers/client"
	"LeadersOfDigital/backend/controllers/common"
	"LeadersOfDigital/backend/controllers/employee"
	"LeadersOfDigital/backend/middleware"
	"github.com/gorilla/mux"
	"net/http"
)


func InitRouter() *mux.Router {
	router := mux.NewRouter()

	// Base API router
	api   := router.PathPrefix("/api").Subrouter()

	// Secondary routers
	clientAPI   := api.PathPrefix("/client").Subrouter()
	employeeAPI := api.PathPrefix("/employee").Subrouter()
	authAPI     := api.PathPrefix("/auth").Subrouter()

	authAPI.HandleFunc("/register", auth.Registration).Methods(http.MethodPost, http.MethodOptions)
	authAPI.HandleFunc("/login", auth.Login).Methods(http.MethodPost, http.MethodOptions)

	clientAPI.HandleFunc("/me", client.RetrieveClient).Methods(http.MethodGet, http.MethodOptions)

	clientAPI.HandleFunc("/applications", client.GetClientsApplications).Methods(http.MethodGet, http.MethodOptions)
	clientAPI.HandleFunc("/application", client.CreateApplication).Methods(http.MethodPost, http.MethodOptions)
	clientAPI.HandleFunc("/application/{id}", client.RetrieveApplication).Methods(http.MethodGet, http.MethodOptions)
	clientAPI.HandleFunc("/application/{id}", client.DeleteApplication).Methods(http.MethodDelete, http.MethodOptions)

	clientAPI.HandleFunc("/service_types", common.GetAllServiceTypes).Methods(http.MethodGet, http.MethodOptions)

	clientAPI.HandleFunc("/application/{id}/upload_document/{document_type_id}", client.UploadDocument).Methods(http.MethodPost, http.MethodOptions)
	clientAPI.HandleFunc("/add_comment", common.AddClientComment).Methods(http.MethodPost, http.MethodOptions)
	clientAPI.HandleFunc("/document/{id}", client.DeleteDocument).Methods(http.MethodDelete, http.MethodOptions)

	clientAPI.HandleFunc("/add_comment", common.AddClientComment).Methods(http.MethodPost, http.MethodOptions)

	employeeAPI.HandleFunc("/me", employee.RetrieveEmployee).Methods(http.MethodGet, http.MethodOptions)

	employeeAPI.HandleFunc("/free_applications", employee.GetFreeApplications).Methods(http.MethodGet, http.MethodOptions)
	employeeAPI.HandleFunc("/applications", employee.GetEmployeesApplications).Methods(http.MethodGet, http.MethodOptions)
	employeeAPI.HandleFunc("/application/{id}", employee.RetrieveApplication).Methods(http.MethodGet, http.MethodOptions)
	employeeAPI.HandleFunc("/application/{id}", employee.UpdateApplication).Methods(http.MethodPut, http.MethodOptions)

	employeeAPI.HandleFunc("/application_statuses", employee.GetAllApplicationStatuses).Methods(http.MethodGet, http.MethodOptions)

	employeeAPI.HandleFunc("/add_comment", common.AddEmployeeComment).Methods(http.MethodPost, http.MethodOptions)

	// middleware usage
	// do NOT modify the order
	api.Use(middleware.CORS)    // enable CORS headers
	api.Use(middleware.LogPath) // log HTTP request URI and method
	// api.Use(middleware.LogBody) // log HTTP request body (debugging)

	// checking JWT
	clientAPI.Use(middleware.JwtAuthentication)
	employeeAPI.Use(middleware.JwtAuthentication)

	// security features
	clientAPI.Use(middleware.CheckClientRole)
	employeeAPI.Use(middleware.CheckEmployeeRole)

	return router
}
