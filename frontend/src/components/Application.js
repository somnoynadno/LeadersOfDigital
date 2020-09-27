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
        return <Row className={"application"} style={{opacity: (this.entity.ApplicationStatusID >= 4 ? 0.5: 1)}}>
            <div className={"number"}>
                <span>№{this.entity.ID}</span>
            </div>
            <div className={"name"}>
                <span>{this.entity.ServiceType.Name}</span>
            </div>
            <div className={"status"}>
                <span>{this.entity.ApplicationStatus.Name}</span>
            </div>
            <div className={"date"}>
                <time>{(new Date(this.entity.CreatedAt)).toLocaleString('ru', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',})}</time>
            </div>
            <div className={"add-button"} style={{visibility: (this.entity.ApplicationStatusID >= 4 ? "hidden": "visible")}}
                 onClick={() => this.props.history.push(`/application/${this.entity.ID}`)}>
                <span>Редактировать</span>
            </div>
            <div className={"delete-button"} onClick={() => this.handleDeleteApplication()}>
                <span>Удалить</span>
            </div>
        </Row>
    }
}

export default Application;
