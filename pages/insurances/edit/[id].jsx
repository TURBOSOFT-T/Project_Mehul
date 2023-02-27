

import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams("id");
  const name = useRef("");
  const email = useRef("");
  const siret = useRef("");
  const requirements = useRef("");
  const taxIntra = useRef("");



  useEffect(() => {
    fetch(`http://localhost:3000/api/insurance/${id}`)
      .then((res) => res.json())
      .then((data) => {
        name.current.value = data.name;
        email.current.value = data.email;
        siret.current.value = data.siret;
        requirements.current.value = data.requirements;
        taxIntra.current.value = data.taxIntra;
      })
      .catch((err) => console.log(err));
  }, []);

  const updateInsurance = () => {
    const payload = {
      name: name.current.value,
      email: email.current.value,
      siret: siret.current.value,
      requirements: requirements.current.value,
      taxIntra: taxIntra.current.value,
    };
    const isConfirmed = confirm("Are you sure you want to update this item?");
    if (isConfirmed) {
      fetch(`http://localhost:3000/api/insurance/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payload,
        }),
      }).then((res) => {
        if (res.ok) {
          alert("Insurance updated successfully");
        }
      });
   
      window.location.reload();
      window.location.href = "/insurances";
    }
  };

  return (
    <div>
      <h1>Edit Insurance</h1>

      <form >
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            ref={name}
       
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            ref={email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="siret">Siret</label>
          <input
            type="text"
            className="form-control"
            id="siret"
            name="siret"
            ref={siret}
          />
        </div>
        <div className="form-group">
          <label htmlFor="requirements">Requirements</label>
          <input
            type="text"
            className="form-control"
            id="requirements"
            name="requirements"
            ref={requirements}
          />
        </div>
        <div className="form-group">
          <label htmlFor="taxIntra">Tax Intra</label>
          <input
            type="text"
            className="form-control"
            id="taxIntra"
            name="taxIntra"
            ref={taxIntra}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={updateInsurance}>
          Update Insurance
        </button>
      </form>
    </div>
  );
};

export default Edit;
