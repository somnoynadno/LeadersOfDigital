import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Header from "../../components/Header";
import Application from "../../components/Application";

import '../../styles/Applications.css';
import {clientAPI} from "../../http/ClientAPI";

class Applications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {title: "Мои заявки"}
    }

    componentDidMount = async () => {
        await clientAPI.GetClientsApplications()
            .then((res) => console.log(res))
    }

    render () {
        return (
            <Container>
                <Header />
                <Row className={"row-auto"} id={"client-info"}>
                    <Col className={"col-auto"}>
                        <h3><b>Кеков Кек Кекович</b></h3>
                        <h4>Мои заявки</h4>
                    </Col>
                    <div className={"app-add-button"}>
                        <Button onClick={() => this.props.history.push('/new_application')}>Новое заявление</Button>
                    </div>
                </Row>
                <Col>
                    <Application />
                    <Application />
                    <Application />
                    <Application />
                    <Application />
                    <Application />
                </Col>
            </Container>
        )
    }
}

export default Applications;
