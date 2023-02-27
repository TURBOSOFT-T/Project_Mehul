import { data } from "autoprefixer";
import React, { useRef } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useMutation } from "react-query";

const CreateOrgnization = () => {
  const name = useRef("");
  const email = useRef("");
  const phones = useRef("");
  const siret = useRef("");
  const apeCode = useRef("");
  const intraTax = useRef("");

  const address = useRef({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const mutation = useMutation((data) => {
    var data = {
      name: name.current.value,
      email: email.current.value,
      siret: siret.current.value,
      apeCode: apeCode.current.value,
      phones: phones.current.value,
      intraTax: intraTax.current.value,

      address: {
        street: address.current.street.value,
        city: address.current.city.value,
        state: address.current.state.value,
        zipCode: address.current.zipCode.value,
        country: address.current.country.value,
      },
    };
    return fetch("http://localhost:3000/api/organization", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        window.location.reload();

        window.location.href = "/organizations";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  return (
    <>
      <div className="card m-3">
        <h5 className="card-header">Add Organization</h5>
        <div className="card-body">
          <Container className="mt-2">
            <div className="container">
              <Row>
                <Col className="col-md-6 offset-md-3">
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Name"
                      ref={name}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Email"
                      ref={email}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formSiret">
                    <Form.Label>Siret</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Siret"
                      ref={siret}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formApeCode">
                    <Form.Label>ApeCode</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter ApeCode"
                      ref={apeCode}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPhones">
                    <Form.Label>Phones</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Phones"
                      ref={phones}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formIntraTax">
                    <Form.Label>IntraTax</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter IntraTax"
                      ref={intraTax}
                    />
                  </Form.Group>

                  <h5 className="card-header">Address</h5>
                  <div className="row">
                    <div className="form-group col-4">
                      <Form.Group className="mb-3" controlId="formStreet">
                        <Form.Label>Street</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Street"
                          ref={(node) => (address.current.street = node)}
                        />
                      </Form.Group>
                    </div>
                    <div className="form-group col-4">
                      <Form.Group className="mb-3" controlId="formCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter City"
                          ref={(node) => (address.current.city = node)}
                        />
                      </Form.Group>
                    </div>

                    <div className="form-group col-4">
                      {" "}
                      <Form.Group className="mb-3" controlId="formState">
                        <Form.Label>State</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter State"
                          ref={(node) => (address.current.state = node)}
                        />
                      </Form.Group>
                    </div>
                    <div className="form-group col-4">
                      <Form.Group className="mb-3" controlId="formZipCode">
                        <Form.Label>ZipCode</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter ZipCode"
                          ref={(node) => (address.current.zipCode = node)}
                        />
                      </Form.Group>
                    </div>
                    <div className="form-group col-4">
                      <Form.Group className="mb-3" controlId="formCountry">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Country"
                          ref={(node) => (address.current.country = node)}
                        />
                      </Form.Group>
                    </div>
                  </div>

                  <button className="btn btn-primary" onClick={mutation.mutate}>
                    Add Organization
                  </button>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default CreateOrgnization;
