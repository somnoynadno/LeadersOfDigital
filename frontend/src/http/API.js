export class API {
    token = null;
    isEmployee = null;
    headers = {
        'Content-Type': 'application/json',
    };

    constructor() {
        this.invalidateLocalStorage();
    }

    invalidateLocalStorage() {
        this.token = localStorage.getItem("token");
        this.isEmployee = localStorage.getItem("IsEmployee");

        if (this.token) {
            this.headers["Authorization"] = `Bearer ${this.token}`;
        }
    }
}
