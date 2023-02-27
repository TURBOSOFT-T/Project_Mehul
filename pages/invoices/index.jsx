import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "react-bootstrap";

function InvoiceList() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/invoice/find-all")
      .then((res) => res.json())
      .then((data) => {
        setInvoices(data);
      });

    return () => {
      setInvoices([]);
    };
  }, []);

  const setData = (data) => {
    setInvoices(data);
  };

  const deleteInvoice = (id) => {
    const isConfirmed = confirm("Are you sure you want to delete this item?");
    if (isConfirmed) {
      fetch(`http://localhost:3000/api/invoice/${id}`, {
        method: "DELETE",
      }).then((res) => {
        if (res.ok) {
          const findIndex = invoices.findIndex((invoice) => invoice.id === id);
          organizations.splice(findIndex, 1);
          setInvoices([...invoices]);
        }
      });
      window.location.reload();
      window.location.href = "/invoices";
    }
  };

  return (
    <div>
      <h2>Invoice List</h2>
      <Link href="/invoices/create" className="btn btn-sm btn-success mb-2">
        Add Invoice
      </Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th style={{ width: "3%" }}></th>
            <th style={{ width: "10%" }}>Type</th>
            <th style={{ width: "10%" }}>Total</th>

            <th style={{ width: "10%" }}>DutyFreeTotal</th>

            <th style={{ width: "5%" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {invoices?.length > 0 &&
            invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td></td>
                {console.log(invoice,"invoice")}
                <td>{invoice.type}</td>
                <td>{invoice.total}</td>
                <td>{invoice.dutyFreeTotal}</td>

                <td>
                  <Link
                    href={`/invoice/${invoice.id}`}
                    className="btn btn-sm btn-primary"
                  >
                    Edit
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteInvoice(invoice.id)}
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
export default InvoiceList;
