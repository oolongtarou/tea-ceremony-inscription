package security

import (
	"github.com/google/uuid"
)

func GenerateUUID() string {
	uuidValue := uuid.NewString()
	return uuidValue
}