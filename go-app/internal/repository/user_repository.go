package repository

import(
	"gorm.io/gorm"
	"errors"
	
	"go-app/internal/entity"
)

// すべてのユーザー情報を取得する
func FindAllUsers(db *gorm.DB) ([]entity.User, error) {
	var users []entity.User
	result := db.Find(&users)

	return users, result.Error
}

// ユーザーIDをキーにしてユーザー情報を取得する
func FindUserById(userId int, db *gorm.DB) (entity.User, error){
	var user entity.User
	result := db.Find(&user, userId)

	return user, result.Error
}

// メールアドレスをキーにしてユーザー情報を取得する
func FindUserByMailAddress(mailAddress string, db *gorm.DB) (entity.User, error){
	var user entity.User
	result := db.Where("mail_address = ?", mailAddress).Find(&user)

	return user, result.Error
}

// ユーザー名を更新する
func UpdateUserName(user entity.User, db *gorm.DB) (int64, error) {
	if len(user.UserName) <= 0{
		return 0, errors.New("ユーザー名が空のため更新できません。")
	}

	result := db.Model(&entity.User{}).
		Where("user_id = ?", user.UserId).
		Update("user_name", user.UserName)

	return result.RowsAffected, result.Error
}

// メールアドレスを更新する
func UpdateMailAddress(user entity.User, db *gorm.DB) (int64, error) {
	if len(user.MailAddress) <= 0{
		return 0, errors.New("メールアドレスが空のため更新できません。")
	}

	result := db.Model(&entity.User{}).
		Where("user_id = ?", user.UserId).
		Update("mail_address", user.MailAddress)

	return result.RowsAffected, result.Error
}

// パスワードを更新する
func UpdatePassword(user entity.User, db *gorm.DB) (int64, error) {
	if len(user.Password) <= 0{
		return 0, errors.New("パスワードが空のため更新できません。")
	}

	result := db.Model(&entity.User{}).
		Where("user_id = ?", user.UserId).
		Update("password", user.Password)

	return result.RowsAffected, result.Error
}

// 新しくユーザーアカウントを1️つ作成する
func CreateUser(user entity.User, db *gorm.DB) error {
	result := db.Create(user)

	return result.Error
}

// 新しくユーザーアカウントを複数作成する
func CreateUsers(users []entity.User, db *gorm.DB) (int64, error) {
	result := db.Create(users)

	return result.RowsAffected, result.Error
}

// ユーザーを削除する
func DeleteUser(userId int, db * gorm.DB) (int64, error) {
	result := db.Delete(&entity.User{}, userId)

	return result.RowsAffected, result.Error
}

