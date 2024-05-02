package repository

import (
	"gorm.io/gorm"

	"go-app/internal/entity"
	"go-app/internal/converter"
)

// 単語IDをキーにして任意の単語の詳細情報を取得する
func FindWordInfoDetail(wordId int, db *gorm.DB) (entity.WordInfoDetail, error) { 
	var wordsInfoTemp entity.WordInfoBriefTemp
	result := db.Table("words").
	Select("words.word_id, words.title, words.pronunciation, GROUP_CONCAT(DISTINCT word_descriptions.description) AS descriptions, GROUP_CONCAT(DISTINCT words_months_mappings.target_month) AS months, GROUP_CONCAT(DISTINCT word_tags.tag_name) AS tags, GROUP_CONCAT(DISTINCT word_tags.tag_id) AS tag_id_list").
	Joins("LEFT JOIN word_descriptions ON word_descriptions.word_id = words.word_id").
	Joins("LEFT JOIN words_tags_mappings ON words_tags_mappings.word_id = words.word_id").
	Joins("LEFT JOIN word_tags ON word_tags.tag_id = words_tags_mappings.tag_id").
	Joins("LEFT JOIN words_months_mappings ON  words_months_mappings.word_id = words.word_id").
	Where("words.word_id = ?", wordId).
	Group("words.word_id").
	First(&wordsInfoTemp)

	wordsInfoBrief := converter.ToWordInfoBrief(wordsInfoTemp)
	descriptions, _ := FindWordDescriptions(wordId, db)

	wordInfoDetail := entity.WordInfoDetail{
		WordId:wordsInfoBrief.WordId,
		Title:wordsInfoBrief.Title,
		Pronunciation:wordsInfoBrief.Pronunciation,
		Descriptions:descriptions,
		Months:wordsInfoBrief.Months,
		Tags:wordsInfoBrief.Tags}
	
	return wordInfoDetail, result.Error
}

// 単語IDをキーにして単語の語釈を取得する
func FindWordDescriptions(wordId int, db *gorm.DB) ([]entity.WordDescription, error) {
	var descriptions []entity.WordDescription
	result := db.Table("word_descriptions").
	Select("words.word_id, description_id, description, word_descriptions.source_id, source_name").
	Joins("LEFT JOIN words ON words.word_id = word_descriptions.word_id").
	Joins("LEFT JOIN description_sources ON description_sources.source_id = word_descriptions.source_id").
	Where("words.word_id = ?", wordId).
	Order("word_descriptions.source_id ASC").
	Order("description_id ASC").
	Find(&descriptions)

	return descriptions, result.Error
}

// 単語情報(簡易版)を複数取得する
func FindWorInfoBriefArray(title string, pronunciation string, tagId int, month int, offset int, limit int, db *gorm.DB) ([]entity.WordInfoBrief, error) {
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
	Order("GROUP_CONCAT(DISTINCT words_months_mappings.target_month) asc"). // 月の順番で表示したいためソートする
	Order("words.word_id asc").
	Limit(limit).
	Offset(offset).
	Find(&wordsInfoTemp)

	result := chain
	wordsInfo := converter.ToWordInfoBriefArray(wordsInfoTemp)
	return wordsInfo, result.Error
}