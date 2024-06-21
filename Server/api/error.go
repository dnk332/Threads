package api

import (
	"encoding/json"
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

// errorResponse creates a standardized error response
func errorResponse(errCode int, err error) (int, gin.H) {
	errors := gin.H{
		"message":   err.Error(),
		"code":      strconv.Itoa(errCode),
		"timestamp": time.Now().Format(time.RFC3339),
	}
	return errCode, gin.H{"error": errors}
}

// errorBindJSONResponse creates a standardized error response for JSON binding errors
func errorBindJSONResponse(errCode int, err error) (int, gin.H) {
	errors := make(map[string]interface{})

	switch err := err.(type) {
	case validator.ValidationErrors:
		var errMessage []string
		for _, e := range err {
			errMessage = append(errMessage, fmt.Sprintf("%s %s", e.Field(), msgForTag(e.Tag())))
		}
		errors["message"] = strings.Join(errMessage, ", ")
	case *json.UnmarshalTypeError:
		errors["message"] = fmt.Sprintf("%s type must be %s", err.Field, err.Type)
	default:
		errors["message"] = err.Error()
	}
	errors["code"] = errCode
	errors["timestamp"] = time.Now().Format(time.RFC3339)
	return errCode, gin.H{"error": errors}
}

// msgForTag returns custom error messages for validation tags
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
	case "alphanum":
		return "value must contain only alphanumeric characters (letters and numbers)"
	}
	return "unknown error"
}
