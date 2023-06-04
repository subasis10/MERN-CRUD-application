import React, { useEffect, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import { CardContent } from "@mui/material";
import { useParams } from "react-router-dom";

const Detail = () => {
  const [getuserdata, setUserdata] = useState([]);
  console.log(getuserdata);

  const { id } = useParams("");
  console.log(id);

  const getdata = async () => {
    const res = await fetch(`/getuser/${id}`, {
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
  });

  return (
    <div className="container mt-3">
      <h1 style={{ fontWeight: 400 }}>Welcome Ram</h1>
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <div className="left_view  ">
            <div className="add_btn ">
              <button className="btn btn-primary mx-2">
                <CreateIcon />
              </button>
              <button className="btn btn-danger">
                <DeleteIcon />
              </button>
            </div>
            <img src="/profile.png" style={{ width: 50 }} alt="profile" />
            <h3 className="mt-3">
              Name: <span>{getuserdata.name}</span>{" "}
            </h3>
            <h3 className="mt-3">
              {" "}
              Age: <span>{getuserdata.age}</span>
            </h3>
            <p>
              Email: <span>{getuserdata.email}</span>
            </p>
            <p>
              Occupation: <span>{getuserdata.work}</span>
            </p>
          </div>
          <div classname="right_view">
            <p>
              mobile: <span>{getuserdata.mobile}</span>
            </p>
            <p>
              location: <span>{getuserdata.add}</span>
            </p>
            <p>
              Description: <span>{getuserdata.desc}</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Detail;
