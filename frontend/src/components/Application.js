import React from "react";
import Row from "react-bootstrap/Row";

import '../styles/Application.css';

class Application extends React.Component {
    constructor(props) {
        super(props);

        this.entity = this.props.entity;
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
                <div className={"add-button"}>
                    <span>Редактировать</span>
                </div>
                <div className={"delete-button"}>
                    <span>Удалить заявку</span>
                </div>
        </Row>
    }
}

export default Application;
