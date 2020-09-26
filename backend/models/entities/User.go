package entities

type User struct {
	Name       string
	Surname    string
	Patronymic *string
	Email      string
	Password   string
	PrivateKey	[]byte
	PublicKey	[]byte
}
