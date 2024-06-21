package api

import (
	"encoding/json"
	"fmt"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func errorResponse(errCode int, err error) (int, gin.H) {
	errors := make(map[string]string)

	errors["code"] = strconv.Itoa(errCode)
	errors["timestamp"] = time.Now().Format(time.RFC3339)
	errors["message"] = err.Error()

	return errCode, gin.H{"error": errors}
}

func errorBindJSONResponse(errCode int, err error) (int, gin.H) {
	errors := make(map[string]interface{})
	errors["code"] = errCode
	errors["timestamp"] = time.Now().Format(time.RFC3339)

	switch err := err.(type) {
	case validator.ValidationErrors:
		for _, e := range err {
			errors[e.Field()] = fmt.Sprintf("%s %s", e.Field(), msgForTag(e.Tag()))
		}
		return errCode, gin.H{"error": errors}
	case *json.UnmarshalTypeError:
		errors["message"] = fmt.Sprintf("%s type must be %s", err.Field, err.Type)
		return errCode, gin.H{"error": errors}
	}
	return errCode, gin.H{"error": errors}
}

func msgForTag(tag string) string {
	switch tag {
	case "required":
		return "field is required"
	case "min":
		return "value is too short"
	case "alpha":
		return "value must begin with a capital letter"
	case "email":
		return "value must be in the correct email format"
	}
	return "Unknown error"
}
