import {BASE_URL, DEBUG} from "../globals";
import {clientAPI} from "./ClientAPI";
import {API} from "./API";
import {employeeAPI} from "./EmployeeAPI";

class AuthAPI extends API {
    RegisterUser = async (name, surname, patronymic, email, password) => {
        let body = JSON.stringify({
            name: name, surname: surname, patronymic: patronymic,
            email: email, password: password,
        });

        let response = await fetch(BASE_URL + `/auth/register`,
            {method: 'POST', headers: this.headers, body: body});

        let data = await response.json();
        if (DEBUG) {
            console.log(response.status, data);
        }

        if (response.status === 200) {
            return data;
        } else {
            throw new Error(data["message"]);
        }
    };

    LoginUser = async (email, password) => {
        let body = JSON.stringify({email: email, password: password});
        
        let response = await fetch(BASE_URL + `/auth/login`,
            {method: 'POST', headers: this.headers, body: body});

        let data = await response.json();
        if (DEBUG) {
            console.log(response.status, data);
        }

        if (response.ok) {
            localStorage.setItem("token", data["token"]);
            localStorage.setItem("IsEmployee", data["IsEmployee"]);

            // reset token to API files
            this.invalidateLocalStorage();
            clientAPI.invalidateLocalStorage();
            employeeAPI.invalidateLocalStorage();

            return data;
        } else {
            throw new Error(data["message"]);
        }
    };
}

export const authAPI = new AuthAPI();
