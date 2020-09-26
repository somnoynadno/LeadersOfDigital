package auth

import (
	"LeadersOfDigital/backend/db"
	"LeadersOfDigital/backend/models/auxiliary"
	"LeadersOfDigital/backend/models/entities"
	u "LeadersOfDigital/backend/utils"
	"encoding/json"
	"errors"
	"github.com/dgrijalva/jwt-go"
	"github.com/jinzhu/gorm"
	log "github.com/sirupsen/logrus"
	"net/http"
	"os"
)

func loginEmployee(account Account) map[string]interface{} {
	user := &entities.Employee{}
	err := db.GetDB().Where("email = ?", account.Email).First(user).Error

	if err != nil {
		log.Warn(err)
		if err == gorm.ErrRecordNotFound {
			return u.Message(false, "User not found")
		}
		return u.Message(false, "Connection error. Please retry")
	}

	if !u.CheckPasswordHash(account.Password, user.Password) { // Password does not match!
		return u.Message(false, "Invalid login credentials. Please try again")
	}

	// Create JWT token
	tk := &auxiliary.Token{UserID: user.ID, IsEmployee: true}
	token := jwt.NewWithClaims(jwt.GetSigningMethod("HS256"), tk)
	tokenString, _ := token.SignedString([]byte(os.Getenv("token_password")))

	resp := u.Message(true, "Logged In")
	resp["token"] = tokenString

	return resp
}

func loginClient(account Account) map[string]interface{} {
	user := &entities.Client{}
	err := db.GetDB().Where("email = ?", account.Email).First(user).Error

	if err != nil {
		log.Warn(err)
		if err == gorm.ErrRecordNotFound {
			return u.Message(false, "User not found")
		}
		return u.Message(false, "Connection error. Please retry")
	}

	if !u.CheckPasswordHash(account.Password, user.Password) { // Password does not match!
		return u.Message(false, "Invalid login credentials. Please try again")
	}

	// Create JWT token
	tk := &auxiliary.Token{UserID: user.ID, IsEmployee: false}
	token := jwt.NewWithClaims(jwt.GetSigningMethod("HS256"), tk)
	tokenString, _ := token.SignedString([]byte(os.Getenv("token_password")))

	resp := u.Message(true, "Logged In")
	resp["token"] = tokenString

	if account.IsEmployee {
		resp["IsEmployee"] = true
	} else {
		resp["IsEmployee"] = false
	}

	return resp
}

type Account struct {
	Email      string
	Password   string
	IsEmployee bool
}

var Login = func(w http.ResponseWriter, r *http.Request) {
	account := &Account{}
	err := json.NewDecoder(r.Body).Decode(account)
	if err != nil {
		u.HandleBadRequest(w, err)
		return
	}

	var resp map[string]interface{}

	if account.IsEmployee {
		resp = loginEmployee(*account)
	} else {
		resp = loginClient(*account)
	}

	if resp["token"] == nil {
		u.HandleBadRequest(w, errors.New("wrong credentials"))
		return
	}

	u.Respond(w, resp)
}

type RegisterCredentials struct {
	Name       string
	Surname    string
	Patronymic *string
	Email      string
	Password   string
	IsEmployee bool
}

var Registration = func(w http.ResponseWriter, r *http.Request) {
	account := &RegisterCredentials{}
	err := json.NewDecoder(r.Body).Decode(account)
	
	if err != nil {
		u.HandleBadRequest(w, err)
		return
	}

	db := db.GetDB()

	if account.IsEmployee {
		user := &entities.Employee{}

		user.Email = account.Email
		user.Password, _ = u.HashPassword(account.Password)
		user.Name = account.Name
		user.Surname = account.Surname
		user.Patronymic = account.Patronymic

		err = db.Create(&user).Error

		if err != nil {
			u.HandleBadRequest(w, err)
		} else {
			u.Respond(w, u.Message(true, "OK"))
		}
	} else {
		user := &entities.Client{}

		user.Email = account.Email
		user.Password, _ = u.HashPassword(account.Password)
		user.Name = account.Name
		user.Surname = account.Surname
		user.Patronymic = account.Patronymic

		err = db.Create(&user).Error

		if err != nil {
			u.HandleBadRequest(w, err)
		} else {
			u.Respond(w, u.Message(true, "OK"))
		}
	}
}
