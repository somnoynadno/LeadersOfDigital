package entities

type User struct {
	Name       string
	Surname    string
	Patronymic *string
	Email      string
	Password   string
	PrivateKey	*[64]byte
	PublicKey	*[32]byte
}
