package repository

import(
	"gorm.io/gorm"
	"errors"
	
	"go-app/internal/entity"
)

func FindUsers(db *gorm.DB) ([]entity.User, error) {
	var users []entity.User
	result := db.Find(&users)

	return users, result.Error
}

func FindUserById(userId int, db *gorm.DB) (entity.User, error){
	var user entity.User
	result := db.Find(&user, userId)

	return user, result.Error
}

func UpdateUserName(user entity.User, db *gorm.DB) (int64, error) {
	if len(user.UserName) <= 0{
		return 0, errors.New("ユーザー名が空のため更新できません。")
	}

	result := db.Model(&entity.User{}).
		Where("user_id = ?", user.UserId).
		Update("user_name", user.UserName)

	return result.RowsAffected, result.Error
}

func UpdateMailAddress(user entity.User, db *gorm.DB) (int64, error) {
	if len(user.MailAddress) <= 0{
		return 0, errors.New("メールアドレスが空のため更新できません。")
	}

	result := db.Model(&entity.User{}).
		Where("user_id = ?", user.UserId).
		Update("mail_address", user.MailAddress)

	return result.RowsAffected, result.Error
}

func UpdatePassword(user entity.User, db *gorm.DB) (int64, error) {
	if len(user.Password) <= 0{
		return 0, errors.New("パスワードが空のため更新できません。")
	}

	result := db.Model(&entity.User{}).
		Where("user_id = ?", user.UserId).
		Update("password", user.Password)

	return result.RowsAffected, result.Error
}

func CreateUsers(users []entity.User, db *gorm.DB) (int64, error) {
	result := db.Create(users)

	return result.RowsAffected, result.Error
}

func DeleteUser(userId int, db * gorm.DB) (int64, error) {
	result := db.Delete(&entity.User{}, userId)

	return result.RowsAffected, result.Error
}

