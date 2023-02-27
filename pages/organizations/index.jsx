import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";

import { fetchOrganizations } from "./api/FetchApi";
import { ListRow } from "./list";

function OrganizationList() {
  const [organizations, setOrganization] = useState([]);

  const { data } = useQuery("organizations", fetchOrganizations);

  const deleteOrganization = useMutation((id) => {
    const isConfirmed = confirm("Are you sure you want to delete this item?");
    if (isConfirmed) {
      fetch(`http://localhost:3000/api/organization/${id}`, {
        method: "DELETE",
      }).then((res) => {
        if (res.ok) {
          const findIndex = organizations.findIndex(
            (organization) => organization.id === id
          );
          organizations.splice(findIndex, 1);
          setOrganization([...organizations]);
        }
      });
      window.location.reload();
      window.location.href = "/organizations";
    }
  });

  useEffect(() => {
    if (data) {
      setOrganization(data);
    }
  }, []);

  const setData = (data) => {
    setOrganization(data);
  };

  return (
    <div>
      <h2>Organization List</h2>
      <Link
        href="/organizations/create"
        className="btn btn-sm btn-success mb-2"
      >
        Add Organization
      </Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th style={{ width: "3%" }}></th>
            <th style={{ width: "10%" }}>Name</th>
            <th style={{ width: "10%" }}>Email</th>

            <th style={{ width: "10%" }}>Phones</th>
            <th style={{ width: "10%" }}>Address</th>

            <th style={{ width: "5%" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 &&
            data.map((organization) => (
              <tr key={organization.id}>
                <td></td>
                <td>{organization.name}</td>
                <td>{organization.email}</td>
                <td>{organization.phones}</td>

                <td></td>

                <td>
                  <Link
                    href={`/organization/${organization.id}`}
                    className="btn btn-sm btn-primary"
                  >
                    Edit
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteOrganization.mutate(organization.id)}
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
export default OrganizationList;
