import React, { useEffect, useState } from "react";
import "./EditProfile.css";
import { useSelector } from "react-redux";
import axios from "axios";
const EditProfile = ({ setEditModalState }) => {
  const UUU = useSelector((state) => state.authReducer.authData);
  const [modalData, setModalData] = useState(null);

  const usernameChange = (e) => {
    setModalData({ ...modalData, [e.target.name]: e.target.value });
  };

  const onSubmitEditDataFromServer = async (e) => {
    e.preventDefault();
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
    headers.append("Access-Control-Allow-Credentials", "true");

    headers.append("GET", "POST", "PUT", "DELETE", "OPTIONS");

    // console.log(modalData?.id);

    const API = axios.create({
      baseURL: "http://localhost:5002",
    });
    await API.put(`/update-profile/${modalData?.id}`, modalData, {
      headers: headers,
    })
      .then((res) => {
        console.log(res.data);
        setEditModalState(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    setModalData(UUU[0]);
  }, []);

  console.log(modalData);

  return (
    <form
      className="edit__form__main__card"
      onSubmit={onSubmitEditDataFromServer}
    >
      <div className="form__pc__ac__card">
        <div
          className="inputBox"
          style={{
            width: "93%",
          }}
        >
          <input
            type="text"
            onChange={usernameChange}
            name="name"
            value={modalData?.name}
            required="required"
          />
          <span>Name</span>
        </div>
        <div
          className="inputBox"
          style={{
            width: "93%",
          }}
        >
          <input
            type="text"
            onChange={usernameChange}
            name="phone
"
            value={modalData?.phone}
            required="required"
          />
          <span>Phone</span>
        </div>
      </div>
      <div className="form__pc__ac__card">
        <div
          className="inputBox"
          style={{
            width: "93%",
          }}
        >
          <input
            type="text"
            onChange={usernameChange}
            name="state"
            value={modalData?.state}
            required="required"
          />
          <span>State</span>
        </div>
        <div
          className="inputBox"
          style={{
            width: "93%",
          }}
        >
          <input
            type="text"
            onChange={usernameChange}
            name="district"
            value={modalData?.district}
            required="required"
          />
          <span>district</span>
        </div>
      </div>

      <div
        className="inputBox"
        style={{
          width: "93%",
        }}
      >
        <input
          type="text"
          onChange={usernameChange}
          name="address"
          value={modalData?.address}
          required="required"
        />
        <span>address</span>
      </div>

      <div className="form__pc__ac__card">
        <div
          className="inputBox"
          style={{
            width: "93%",
          }}
        >
          <input
            type="text"
            onChange={usernameChange}
            name="voteridnumber"
            value={modalData?.voteridnumber}
            required="required"
          />
          <span>voterid No</span>
        </div>
        <div
          className="inputBox"
          style={{
            width: "93%",
          }}
        >
          <input
            type="text"
            onChange={usernameChange}
            name="adharnumber"
            value={modalData?.adharnumber}
            required="required"
          />
          <span>adhar No</span>
        </div>
      </div>
      <div
        className="inputBox"
        style={{
          width: "93%",
        }}
      >
        <input
          type="text"
          onChange={usernameChange}
          name="phonepe"
          value={modalData?.phonepe}
          required="required"
        />
        <span>phonepe</span>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default EditProfile;
