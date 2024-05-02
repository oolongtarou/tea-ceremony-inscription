package repository

import (
	"gorm.io/gorm"
	// "errors"

	"go-app/internal/entity"
	"go-app/internal/converter"
)



func FindWordInfo(title string, pronunciation string, tagId int, month int, db *gorm.DB) ([]entity.WordInfoBrief, error) {
	var wordsInfoTemp []entity.WordInfoBriefTemp
	chain := db.Table("words").
	Select("words.word_id, words.title, words.pronunciation, GROUP_CONCAT(DISTINCT word_descriptions.description) AS descriptions, GROUP_CONCAT(DISTINCT words_months_mappings.target_month) AS months, GROUP_CONCAT(DISTINCT word_tags.tag_name) AS tags, GROUP_CONCAT(DISTINCT word_tags.tag_id) AS tag_id_list").
	Joins("LEFT JOIN word_descriptions ON word_descriptions.word_id = words.word_id").
	Joins("LEFT JOIN words_tags_mappings ON words_tags_mappings.word_id = words.word_id").
	Joins("LEFT JOIN word_tags ON word_tags.tag_id = words_tags_mappings.tag_id").
	Joins("LEFT JOIN words_months_mappings ON  words_months_mappings.word_id = words.word_id")

	if title != "" {
		chain.Where("words.title LIKE ?", "%" + title + "%")
	}

	if pronunciation != "" {
		chain.Where("words.pronunciation LIKE ?", "%" + pronunciation + "%")
	}

	chain.Group("words.word_id")

	if tagId > 0 {
		chain.Having("tag_id_list IN(?)", tagId)
	}

	if month > 0 {
		chain.Having("months IN(?)", month)
	}

	chain.
	Order("GROUP_CONCAT(DISTINCT words_months_mappings.target_month) asc").
	Order("words.word_id asc").
	Find(&wordsInfoTemp)

	result := chain
	wordsInfo := converter.ToWordInfoBriefArray(wordsInfoTemp)
	return wordsInfo, result.Error
}


// func FindWorInfoBriefs(wordId int, db *gorm.DB) ([]entity.WordInfoBriefTemp, error) {
// 	var wordsInfo []entity.WordInfoBriefTemp
// 	result := db.Table("words").
// 	Select("words.word_id, words.title, words.pronunciation, GROUP_CONCAT(DISTINCT word_descriptions.description) AS descriptions, GROUP_CONCAT(DISTINCT words_months_mappings.target_month) AS months, GROUP_CONCAT(DISTINCT word_tags.tag_name) AS tags").
// 	Joins("LEFT JOIN word_descriptions ON word_descriptions.word_id = words.word_id").
// 	Joins("LEFT JOIN words_tags_mappings ON words_tags_mappings.word_id = words.word_id").
// 	Joins("LEFT JOIN word_tags ON word_tags.tag_id = words_tags_mappings.tag_id").
// 	Joins("LEFT JOIN words_months_mappings ON  words_months_mappings.word_id = words.word_id").
// 	Where("words.word_id IN(?)", wordId).
// 	Group("words.word_id").
// 	Find(&wordsInfo)
// 	return wordsInfo, result.Error
// }



// func FindWordInfo(title string, pronunciation string, tagId int, month int, db *gorm.DB) ([]entity.WordInfoBriefTemp, error) {
// 	var wordsInfo []entity.WordInfoBriefTemp
// 	chain := db.Table("words").
// 	Select("words.word_id, words.title, words.pronunciation, GROUP_CONCAT(DISTINCT word_descriptions.description) AS descriptions, GROUP_CONCAT(DISTINCT words_months_mappings.target_month) AS months, GROUP_CONCAT(DISTINCT word_tags.tag_name) AS tags, GROUP_CONCAT(DISTINCT word_tags.tag_id) AS tag_id_list").
// 	Joins("LEFT JOIN word_descriptions ON word_descriptions.word_id = words.word_id").
// 	Joins("LEFT JOIN words_tags_mappings ON words_tags_mappings.word_id = words.word_id").
// 	Joins("LEFT JOIN word_tags ON word_tags.tag_id = words_tags_mappings.tag_id").
// 	Joins("LEFT JOIN words_months_mappings ON  words_months_mappings.word_id = words.word_id")

// 	if title != "" {
// 		chain.Where("words.title LIKE ?", "%" + title + "%")
// 	}

// 	if pronunciation != "" {
// 		chain.Where("words.pronunciation LIKE ?", "%" + pronunciation + "%")
// 	}

// 	chain.Group("words.word_id")

// 	if tagId > 0 {
// 		chain.Having("tag_id_list IN(?)", tagId)
// 	}

// 	if month > 0 {
// 		chain.Having("months IN(?)", month)
// 	}

// 	chain.
// 	Order("GROUP_CONCAT(DISTINCT words_months_mappings.target_month) asc").
// 	Order("words.word_id asc").
// 	Find(&wordsInfo)

// 	result := chain
// 	return wordsInfo, result.Error
// }