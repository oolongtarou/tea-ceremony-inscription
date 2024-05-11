package security

import (
	"crypto/sha256"
	"encoding/hex"
)

func ToHashed(val string) string {
	hashed := sha256.Sum256([]byte(val))
	return hex.EncodeToString(hashed[:])
}