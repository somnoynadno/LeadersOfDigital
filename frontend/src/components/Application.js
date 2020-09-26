import React from "react";
import Row from "react-bootstrap/Row";

import '../styles/Application.css';
import {clientAPI} from "../http/ClientAPI";

class Application extends React.Component {
    constructor(props) {
        super(props);

        this.entity = this.props.entity;
    }

    handleDeleteApplication = async () => {
        await clientAPI.DeleteApplication(this.entity.ID)
            .then((res) => window.location.reload())
    }

    render () {
        return <Row className={"application"}>
                <div className={"number"}>
                    <span>№{this.entity.ID}</span>
                </div>
                <div className={"name"}>
                    <span>{this.entity.ServiceType.Name}</span>
                </div>
                <div className={"date"}>
                    <time>{(new Date(this.entity.CreatedAt)).toLocaleString('ru', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',})}</time>
                </div>
                <div className={"status"}>
                    <span>{this.entity.ApplicationStatus.Name}</span>
                </div>
                <div className={"add-button"} onClick={() => this.props.history.push(`/application/${this.entity.ID}`)}>
                    <span>Редактировать</span>
                </div>
                <div className={"delete-button"} onClick={() => this.handleDeleteApplication()}>
                    <span>Удалить заявку</span>
                </div>
        </Row>
    }
}

export default Application;
