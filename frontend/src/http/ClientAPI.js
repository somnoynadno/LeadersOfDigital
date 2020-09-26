import {BASE_URL, DEBUG} from "../globals";
import {API} from "./API";

class ClientAPI extends API {
    GetAllServiceTypes = async () => {
        let response = await fetch(BASE_URL + `/client/service_types`,
            {method: 'GET', headers: this.headers});

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

    GetClient = async () => {
        let response = await fetch(BASE_URL + `/client/me`,
            {method: 'GET', headers: this.headers});

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

    GetClientsApplications = async () => {
        let response = await fetch(BASE_URL + `/client/applications`,
            {method: 'GET', headers: this.headers});

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

    GetApplicationByID = async (applicationID) => {
        let response = await fetch(BASE_URL + `/client/application/${applicationID}`,
            {method: 'GET', headers: this.headers});

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

export const clientAPI = new ClientAPI();
