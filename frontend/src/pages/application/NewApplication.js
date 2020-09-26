import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Header from "../../components/Header";

import '../../styles/NewApplication.css';
import {clientAPI} from "../../http/ClientAPI";

class NewApplication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Новое заявление",
            services: [],
            selectedServiceID: null,
            selectedService: "Выберите тип",
            documents: [],
        }

        this.handleServiceTypeChange.bind(this);
        this.handleContinue.bind(this);
    }

    componentDidMount = async () => {
        await clientAPI.GetAllServiceTypes()
            .then((res) => this.setState({services: res}))
    }

    handleServiceTypeChange = (ek) => {
        for (let s of this.state.services) {
            if (s.ID == ek) {
                this.setState({
                    selectedService: s.Name,
                    documents: s["DocumentTypes"],
                });
            }
        }
        this.setState({selectedServiceID: ek});
    }

    handleContinue = async () => {
        await clientAPI.CreateApplication(this.state.selectedServiceID)
            .then((res) => this.props.history.push(`/application/${res.ID}`))
    }

    render () {
        return (
            <Container>
                <Header />
                <Row className={"row-auto"} id={"application-info"}>
                    <Col className={"col-auto"}>
                        <h3><b>Новое заяление</b></h3>
                    </Col>
                </Row>
                <Form>
                    <Row>
                        <Col>
                            <span>Выберите тип заявления:</span>
                            <Dropdown onSelect={(ek, e) => this.handleServiceTypeChange(ek)}>
                                <Dropdown.Toggle variant="blue" id="dropdown-basic">
                                    {this.state.selectedService}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {this.state.services.map((s) => {
                                        return <Dropdown.Item eventKey={s.ID}>{s.Name}</Dropdown.Item>
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {this.state.documents ?
                            <div>
                                <span>Необходимые документы:</span>
                                <ul>
                                {this.state.documents.map((d) => {
                                    return <li>
                                        <span className={"doc_name"}>{d.Name}</span>
                                    </li>
                                })}
                                </ul>
                            </div> : ''}
                        </Col>
                    </Row>
                    <Button className={"mt-2"} onClick={this.handleContinue}>Продолжить</Button>
                </Form>
            </Container>
        )
    }
}

export default NewApplication;
