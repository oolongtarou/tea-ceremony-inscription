package repository

import(
	"gorm.io/gorm"
	"go-app/internal/entity"
)

// すべての月の登録単語数を取得する
func FindAllMonthWordCount(db *gorm.DB) ([]entity.MonthWordEntity, error) {
	var monthWordEntities []entity.MonthWordEntity

	result := db.Table("words").
	Select("target_month AS month, COUNT(*) AS word_count").
	Joins("LEFT JOIN words_months_mappings ON words_months_mappings.word_id = words.word_id").
	Group("target_month").
	Order("target_month ASC").
	Find(&monthWordEntities)

	return monthWordEntities, result.Error
}