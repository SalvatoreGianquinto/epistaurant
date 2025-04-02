import { Component } from "react"
import { Alert, Col, Container, Row } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

class ReservationForm extends Component {
  state = {
    reservation: {
      name: "",
      phone: "",
      numberOfPeople: "1",
      dateTime: "",
      smoking: false,
      specialRequests: "",
    },
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log("ORA FACCIO LA FETCH!")
    // faccio la fetch, con metodo POST
    fetch("https://striveschool-api.herokuapp.com/api/reservation", {
      method: "POST",
      body: JSON.stringify(this.state.reservation),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("PRENOTAZIONE SALVATA!")
          this.setState({
            reservation: {
              name: "",
              phone: "",
              numberOfPeople: "1",
              dateTime: "",
              smoking: false,
              specialRequests: "",
            },
          })
        } else {
          throw new Error("La chiamata non ha restituito esito positivo")
        }
      })
      .catch((e) => {
        console.log(
          "si è verificato un errore nel salvataggio della prenotazione",
          e
        )
      })
  }

  render() {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <h2 className="my-3 text-center">Prenota il tuo tavolo ORA!</h2>
            <Form className="mb-5" onSubmit={this.handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Il tuo nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Mario Rossi"
                  required
                  value={this.state.reservation.name}
                  onChange={(e) => {
                    this.setState({
                      reservation: {
                        ...this.state.reservation,
                        name: e.target.value,
                      },
                    })
                  }}
                />
              </Form.Group>

              {/* RENDERING CONDIZIONALE */}
              {/* metodo dello "SHORT CIRCUIT" */}
              {this.state.reservation.name === "Al Bano" && (
                <Alert variant="info">
                  Un bicchiere di vino con un panino!
                </Alert>
              )}

              <Form.Group className="mb-3">
                <Form.Label>N. di telefono</Form.Label>
                <Form.Control
                  type="tel"
                  required
                  value={this.state.reservation.phone}
                  onChange={(e) => {
                    this.setState({
                      reservation: {
                        ...this.state.reservation,
                        phone: e.target.value,
                      },
                    })
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Quanti siete?</Form.Label>
                <Form.Select
                  aria-label="numero di persone"
                  value={this.state.reservation.numberOfPeople}
                  onChange={(e) => {
                    this.setState({
                      reservation: {
                        ...this.state.reservation,
                        numberOfPeople: e.target.value,
                      },
                    })
                  }}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Quando venite?</Form.Label>
                <Form.Control
                  type="datetime-local"
                  required
                  value={this.state.reservation.dateTime}
                  onChange={(e) => {
                    this.setState({
                      reservation: {
                        ...this.state.reservation,
                        dateTime: e.target.value,
                      },
                    })
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Tavolo fumatori?"
                  checked={this.state.reservation.smoking}
                  onChange={(e) =>
                    this.setState({
                      reservation: {
                        ...this.state.reservation,
                        smoking: e.target.checked,
                      },
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Allergie, malanni, bambini?</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={this.state.reservation.specialRequests}
                  onChange={(e) => {
                    this.setState({
                      reservation: {
                        ...this.state.reservation,
                        specialRequests: e.target.value,
                      },
                    })
                  }}
                />
              </Form.Group>

              <Button variant="success" type="submit">
                Prenota!
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default ReservationForm
