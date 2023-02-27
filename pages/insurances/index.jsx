import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "react-bootstrap";

function InsuranceList() {
  const [insurances, setInsurance] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/insurance/find-all")
      .then((res) => res.json())
      .then((data) => {
        setInsurance(data);
      });

    return () => {
      setInsurance([]);
    };
  }, []);

  const setData = (data) => {
    setInsurance(data);
  };

  const deleteInsurance = (id) => {
    const isConfirmed = confirm("Are you sure you want to delete this item?");
    if (isConfirmed) {
      fetch(`http://localhost:3000/api/insurance/${id}`, {
        method: "DELETE",
      }).then((res) => {
        if (res.ok) {
          const findIndex = insurances.findIndex(
            (insurance) => insurance.id === id
          );
          insurances.splice(findIndex, 1);
          setInsurance([...insurances]);
        }
      });
      window.location.reload();
      window.location.href = "/insurances";
    }
  };

  return (
    <div>
      <h2>Insurance List</h2>
      <Link href="/insurances/create" className="btn btn-sm btn-success mb-2">
        Add insurance
      </Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th style={{ width: "3%" }}></th>
            <th style={{ width: "5%" }}>Name</th>
            <th style={{ width: "10%" }}>Email</th>
            <th style={{ width: "10%" }}>Siret</th>
            <th style={{ width: "10%" }}>Requirements</th>
            <th style={{ width: "10%" }}>TaxIntra</th>
            <th style={{ width: "15%" }}>Address</th>
            <th style={{ width: "15%" }}>Insurer</th>
            <th style={{ width: "%" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {insurances?.length > 0 &&
            insurances.map((insurance) => (
              <tr key={insurance.id}>
                <td></td>
                <td>{insurance.name}</td>
                <td>{insurance.email}</td>
                <td>{insurance.siret}</td>
                <td>{insurance.requirements}</td>
                <td>{insurance.taxIntra}</td>
                <td>
                  <ol>
                    <li key={insurance.address.id}>
                      Street: {insurance.address.street}
                    </li>
                    <li key={insurance.address.id}>
                      City: {insurance.address.city}
                    </li>

                    <li key={insurance.address.id}>
                      ZipCode: {insurance.address.zipCode}
                    </li>
                    <li key={insurance.address.id}>
                      Country: {insurance.address.country}
                    </li>
                  </ol>
                </td>
                <td>
                  <li key={insurance.insurer.id}>
                    FullName: {insurance.insurer.fullName}
                  </li>
                  <li key={insurance.insurer.insurerAddress.id}>
                    Street: {insurance.insurer.insurerAddress.street}
                  </li>
                  <li key={insurance.insurer.insurerAddress.id}>
                    City: {insurance.insurer.insurerAddress.city}
                  </li>

                  <li key={insurance.insurer.insurerAddress.id}>
                    ZipCode: {insurance.insurer.insurerAddress.zipCode}
                  </li>
                  <li key={insurance.insurer.insurerAddress.id}>
                    Country: {insurance.insurer.insurerAddress.country}
                  </li>
                </td>
                <td>
                  <Link
                    href={`/insurances/edit/${insurance.id}`}
                    className="btn btn-sm btn-primary"
                  >
                    Edit
                  </Link>
                </td>

                <td>
                  <Button
                    variant="danger"
                    type="button"
                    onClick={() => {
                      deleteInsurance(insurance.id);
                    }}
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
export default InsuranceList;
