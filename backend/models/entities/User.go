package entities

type User struct {
	Name       string
	Surname    string
	Patronymic *string
	Email      string
	Password   string      `json:"-"`
	PrivateKey	[]byte `json:"-"`
	PublicKey	[]byte
}
