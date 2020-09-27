import {BASE_URL, DEBUG} from "../globals";
import {API} from "./API";

class EmployeeAPI extends API{
    GetAllApplicationStatuses = async () => {
        let response = await fetch(BASE_URL + `/employee/application_statuses`,
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

    GetEmployee = async () => {
        let response = await fetch(BASE_URL + `/employee/me`,
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

    AddComment = async (applicationID, text) => {
        let body = JSON.stringify({ApplicationID: parseInt(applicationID), Text: text});

        let response = await fetch(BASE_URL + `/employee/add_comment`,
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

    GetFreeApplications = async () => {
        let response = await fetch(BASE_URL + `/employee/free_applications`,
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

    GetMyApplications = async () => {
        let response = await fetch(BASE_URL + `/employee/applications`,
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
        let response = await fetch(BASE_URL + `/employee/application/${applicationID}`,
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

    UpdateApplication = async (application) => {
        let response = await fetch(BASE_URL + `/employee/application/${application.ID}`,
            {method: 'PUT', headers: this.headers, body: JSON.stringify(application)});

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
