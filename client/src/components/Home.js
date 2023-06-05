import React, { useState, useEffect } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CreateIcon from "@mui/icons-material/Create";
import { NavLink } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

const Home = () => {
  const [getuserdata, setUserdata] = useState([]);
  console.log(getuserdata);

  const getdata = async (e) => {
    const res = await fetch("/getdata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error");
    } else {
      setUserdata(data);
      console.log("get data");
    }
  };
  useEffect(() => {
    getdata();
  }, []);

  const deleteuser = async (id) => {
    const res2 = await fetch(`/deleteuser/${id}`, {
      method: "DELETE",
      headers: {
        "COntent-Type": "application/json",
      },
    });
    const deletedata = await res2.json();
    console.log(deletedata);
    if (res2.status === 422 || !deletedata) {
      console.log("error");
    } else {
      console.log("user deleted");
      getdata();
    }
  };

  return (
    <div className="mt-5">
      <div className="container">
        <div className="add_btn mt-2 mb-2">
          <NavLink to="/register" className="btn btn-primary">
            Add data
          </NavLink>
        </div>
        <table class="table">
          <thead>
            <tr className="table-dark">
              <th scope="col">id</th>
              <th scope="col">Username</th>
              <th scope="col">email</th>
              <th scope="col">Job</th>
              <th scope="col">Number</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {getuserdata.map((element, id) => {
              return (
                <tr>
                  <th scope="row">{id + 1}</th>
                  <td>{element.name}</td>
                  <td>{element.email}</td>
                  <td>{element.work}</td>
                  <td>{element.mobile}</td>
                  <td className="d-flex justify-content-between">
                    <NavLink to={`view/${element._id}`}>
                      <button className="btn btn-success">
                        <RemoveRedEyeIcon />
                      </button>
                    </NavLink>
                    <NavLink to={`edit/${element._id}`}>
                      <button className="btn btn-primary">
                        <CreateIcon />
                      </button>
                    </NavLink>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteuser(element._id)}
                    >
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
