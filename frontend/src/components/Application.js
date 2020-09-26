import React from "react";
import Row from "react-bootstrap/Row";

import '../styles/Application.css';

class Application extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return <Row className={"application"}>
                <div className={"number"}>
                    <span>№</span>
                </div>
                <div className={"name"}>
                    <span>Название заявки</span>
                </div>
                <div className={"date"}>
                    <time>01-01-1971</time>
                </div>
                <div className={"status"}>
                    <span>Статус заявки</span>
                </div>
                <div className={"add-button"}>
                    <span>Добавить документы</span>
                </div>
                <div className={"delete-button"}>
                    <span>Удалить заявку</span>
                </div>
        </Row>
    }
}

export default Application;
