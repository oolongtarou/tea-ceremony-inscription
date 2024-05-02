package repository

import (
	"gorm.io/gorm"

	"go-app/internal/entity"
)

// すべての単語タグを取得する
func FindAllTags(db *gorm.DB) ([]entity.WordTag, error) {
	var tags []entity.WordTag
	result := db.Find(&tags)

	return tags, result.Error
}