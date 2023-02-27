import axios from "axios";


export const fetchOrganizations = async () => {
  const res = await axios.get(
    "http://localhost:3000/api/organization/find-all"
  );
  return res.data;
};
 

