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
        this.state = {
            applications: [],
            user: null
        };
    }

    componentDidMount = async () => {
        await clientAPI.GetClient().then((res) => this.setState({user: res}));
        await clientAPI.GetClientsApplications()
            .then((res) => this.setState({applications: res}));
        console.log(this.state.applications);
    }

    render () {
        return (
            <Container>
                <Header />
                <Row className={"row-auto"} id={"application-info"}>
                    <Col className={"col-auto"}>
                        {this.state.user === null ? '' :
                            <h3>{this.state.user.Surname + " " + this.state.user.Name + " " + this.state.user.Patronymic}</h3>
                        }
                        <h4>Мои заявки</h4>
                    </Col>
                    <Col className={"app-add-button"}>
                        <Button className={"float-right"}
                                onClick={() => this.props.history.push('/new_application')}>
                            Новое заявление
                        </Button>
                    </Col>
                </Row>
                <Col>
                    {
                        this.state.applications.map((a) => {
                            return <Application history={this.props.history} entity={a} />
                        })
                    }
                </Col>
            </Container>
        )
    }
}

export default Applications;
