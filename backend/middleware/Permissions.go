package middleware

import (
	u "LeadersOfDigital/backend/utils"
	"errors"
	"net/http"
	"strings"
)

var CheckEmployeeRole = func(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// allow employee API paths only to employee
		if r.Context().Value("context").(u.Values).Get("is_employee") == "false" &&
			strings.HasPrefix(r.URL.Path, "/api/employee"){
			u.HandleForbidden(w, errors.New("restricted access"))
			return
		} else {
			next.ServeHTTP(w, r)
		}
	})
}

var CheckClientRole = func(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// allow client API paths only to clients
		if r.Context().Value("context").(u.Values).Get("is_employee") == "true" &&
			strings.HasPrefix(r.URL.Path, "/api/client"){
			u.HandleForbidden(w, errors.New("restricted access"))
			return
		} else {
			next.ServeHTTP(w, r)
		}
	})
}