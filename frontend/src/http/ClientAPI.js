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

    CreateApplication = async (serviceTypeID) => {
        let body = JSON.stringify({ServiceTypeID: parseInt(serviceTypeID)});

        let response = await fetch(BASE_URL + `/client/application`,
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

    DeleteApplication = async (applicationID) => {
        let response = await fetch(BASE_URL + `/client/application/${applicationID}`,
            {method: 'DELETE', headers: this.headers});

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

    UploadDocument = async (applicationID, formData, documentTypeID) => {
        let h = this.headers;
        delete h["Content-Type"];

        let response = await fetch(BASE_URL +
            `/client/application/${applicationID}/upload_document/${documentTypeID}`,
            {method: 'POST', headers: h, body: formData});

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

    AddComment = async (applicationID, text) => {
        let body = JSON.stringify({ApplicationID: parseInt(applicationID), Text: text});

        let response = await fetch(BASE_URL + `/client/add_comment`,
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
}

export const clientAPI = new ClientAPI();
