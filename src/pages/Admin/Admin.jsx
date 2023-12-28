import React, { useState } from "react";
import "./Admin.css";
import axios from "axios";

let headers = new Headers();
headers.append("Content-Type", "application/json");
headers.append("Accept", "application/json");

headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
headers.append("Access-Control-Allow-Credentials", "true");

headers.append("GET", "POST", "PUT", "DELETE", "OPTIONS");

const Admin = () => {
  const [psAcUserState, setPsAcUserState] = useState([]);

  const [psAcTaskAdded, setPsAcTaskAdded] = useState({
    psnumber: "",
    acnumber: "",
  });

  const usernameChange = (e) => {
    setPsAcTaskAdded({ ...psAcTaskAdded, [e.target.name]: e.target.value });
  };

  const onPcAcNumberBasedUserFun = () => {
    const API = axios.create({
      baseURL: "http://localhost:5002",
    });
    API.post("/ps-ac-number", psAcTaskAdded, {
      headers: headers,
    })
      .then((res) => {
        // console.log(res.data);
        //  setUserData(res.data);
        setPsAcUserState(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="admin__main__card">
      <div className="admin__input__card">
        <input
          onChange={usernameChange}
          name="psnumber"
          placeholder="PS_Number"
          type="text"
        />
        <input
          onChange={usernameChange}
          name="acnumber"
          placeholder="AC_Number"
          type="text"
        />
        <button onClick={onPcAcNumberBasedUserFun}>Submit</button>
      </div>
      {psAcUserState?.length > 0 ? (
        <div className="table__main__card">
          <div className="table__header__card new__table__head">
            <span>Name</span>
            <span>Phone Number</span>
            <span>PS_Name</span>
            <span>PS_Numner</span>
            <span>AC_Name</span>
            <span>AC_Number</span>
          </div>
          <div className="table__body__card">
            {psAcUserState?.map((each, key) => (
              <div key={key} className="t_body__new_style">
                <span>{each.name}</span>
                <span>{each.phone}</span>
                <span>{each.PS_name}</span>
                <span>{each.PS_No}</span>
                <span>{each.AC_name}</span>
                <span>{each.AC_No}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "70vh",
          }}
        >
          <h2>No User Found</h2>
        </div>
      )}
    </div>
  );
};

export default Admin;
