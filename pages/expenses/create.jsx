import { data } from "autoprefixer";
import React, { useRef, useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";

const CreateExpense = () => {
  const title = useRef("");
  const description = useRef("");
  const amount = useRef("");
  const [type, setType] = useState([
    { value: "invoice", label: "Invoice" },
    { value: "receipt", label: "Receipt" },
  ]);

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const invoice = useRef("");

  const [invoices, setInvoice] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/invoice/find-all")
      .then((res) => res.json())
      .then((data) => {
        setInvoice(data);
      });
  }, []);

  const addExpense = () => {
    var data = {
      title: title.current.value,
      description: description.current.value,
      amount: amount.current.value,
      type: type.current.value,

      invoice: type.current.value,
    };

    fetch("http://localhost:3000/api/expense", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    //window.location.reload();
    // window.location.href = "/expenses";
  };
  return (
    <>
      <div className="card m-3">
        <h5 className="card-header">Add Expense</h5>
        <div className="card-body">
          <Container className="mt-2">
            <div className="container">
              <Row>
                <Col className="col-md-6 offset-md-3">
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      ref={title}
                    />

                    <label htmlFor="description">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      ref={description}
                    />

                    <label htmlFor="amount">Amount</label>
                    <input
                      type="text"
                      className="form-control"
                      id="amount"
                      ref={amount}
                    />

                    <label htmlFor="type">Type</label>
                    <select
                      className="form-control"
                      id="type"
                      ref={type}
                      onChange={handleChange}
                    >
                      {type.map((type) => (
                        <option value={type.value}>{type.label}</option>
                      ))}
                    </select>
                    <div className="form-group">
                      <label htmlFor="invoice">Invoice</label>

                      <select
                        className="form-control"
                        id="invoice"
                        ref={invoice}
                      >
                        {invoices.map((invoice) => (
                          <option value={invoice.id}>{invoice.type}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button className="btn btn-primary" onClick={addExpense}>
                    Add Expense
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

export default CreateExpense;
