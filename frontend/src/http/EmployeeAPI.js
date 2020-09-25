import {BASE_URL, DEBUG} from "../globals";
import {API} from "./API";

class EmployeeAPI extends API{
    GetAllApplicationStatuses = async () => {
        let response = await fetch(BASE_URL + `/employee/application_statuses`,
            {method: 'POST', headers: this.headers});

        let data = await response.json();
        if (DEBUG) {
            console.log(response.status, data);
        }

        if (response.status === 200) {
            return data;
        } else {
            throw new Error(data["message"]);
        }
    }
}

export const employeeAPI = new EmployeeAPI();
