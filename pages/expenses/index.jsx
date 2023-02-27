import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "react-bootstrap";

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [invoices, setInvoices] = useState([
    {
      id: 1,
      name: "Invoice 1",
      description: "Invoice 1 description",
      amount: 100,
      date: "2021-01-01",
    },
  ]);

  useEffect(() => {
    fetch("http://localhost:3000/api/expense/find-all")
      .then((res) => res.json())
      .then((data) => {
        setExpenses(data);
      });

    return () => {
      setExpenses([]);
    };
  }, []);

  const deleteExpense = (id) => {
    const isConfirmed = confirm("Are you sure you want to delete this item?");
    if (isConfirmed) {
      fetch(`http://localhost:3000/api/expense/${id}`, {
        method: "DELETE",
      }).then((res) => {
        if (res.ok) {
          const findIndex = invoices.findIndex((invoice) => invoice.id === id);
          expenses.splice(findIndex, 1);
          setExpenses([...expenses]);
        }
      });
      window.location.reload();
      window.location.href = "/expenses";
    }
  };

  return (
    <div>
      <h2>Expense List</h2>
      <Link href="/expenses/create" className="btn btn-sm btn-success mb-2">
        Add Expense
      </Link>
      <table className="table table-striped">
        <thead>
          <tr>
            {console.log(expenses)}
            <th style={{ width: "3%" }}></th>
            <th style={{ width: "5%" }}>Title</th>
            <th style={{ width: "10%" }}>Description</th>

            <th style={{ width: "10%" }}>Invoice type</th>
            <th style={{ width: "5%" }}>Amount</th>
            <th style={{ width: "15%" }}>Type</th>

            <th style={{ width: "5%" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses?.length > 0 &&
            expenses.map((expense) => (
              <tr key={expense.id}>
                <td></td>
                <td>{expense.title}</td>
                <td>{expense.description}</td>
                <td>
                  <div>{expense.invoice.type}</div>
                </td>
                <td>{expense.amount}</td>
                <td>{expense.type}</td>

                <td>
                  <Link
                    href={`/expense/${expense.id}`}
                    className="btn btn-sm btn-primary"
                  >
                    Edit
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteExpense(expense.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export default ExpenseList;
