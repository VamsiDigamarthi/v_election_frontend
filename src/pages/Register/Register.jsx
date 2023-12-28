import React, { useEffect, useState } from "react";
import "./Register.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebse";
import { v4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import { stateWiseData } from "../../data/statewisedata";
let headers = new Headers();
headers.append("Content-Type", "application/json");
headers.append("Accept", "application/json");

headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
headers.append("Access-Control-Allow-Credentials", "true");

headers.append("GET", "POST", "PUT", "DELETE", "OPTIONS");

export const Register = () => {
  const [voterIdImg, setVoterIdImg] = useState("");

  const [voterIdUrl, setVoterIdUrl] = useState(null);

  const [adharIdImg, setAdharIdImg] = useState("");

  const [adharIdUrl, setAdharIdUrl] = useState(null);

  const [phone, setPhone] = useState(null);

  const [stateWiseDistState, setStateWiseDistState] = useState([]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    state: "",
    dist: "",
    assembly: "",
    address: "",
    phonepe: "",
    voteridnumber: "",
    adharnumber: "",
  });

  const usernameChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // console.log(user.state);

  //
  // distict state change

  useEffect(() => {
    if (user.state !== "") {
      console.log("state change");
      const newDist = stateWiseData.filter((each) => each.state === user.state);
      setStateWiseDistState(newDist[0].dist);
    }
  }, [user.state]);

  // this effect using voterId url
  useEffect(() => {
    if (voterIdImg !== "") {
      const imageRef = ref(storage, `images/${voterIdImg.name + v4()}`);

      uploadBytes(imageRef, voterIdImg).then((snaphsot) => {
        getDownloadURL(snaphsot.ref).then((url) => {
          // console.log(url);
          setVoterIdUrl(url);
        });
      });
    }
  }, [voterIdImg]);

  useEffect(() => {
    if (adharIdImg !== "") {
      const imageRef = ref(storage, `images/${adharIdImg.name + v4()}`);

      uploadBytes(imageRef, adharIdImg).then((snaphsot) => {
        getDownloadURL(snaphsot.ref).then((url) => {
          // console.log(url);
          setAdharIdUrl(url);
        });
      });
    }
  }, [adharIdImg]);

  const registorSucces = () =>
    toast.success("edit cam details suddesfully ..!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const registerUser = (e) => {
    e.preventDefault();
    let newUser = {
      ...user,
      phone: phone,
      votUrl: voterIdUrl,
      adhrUrl: adharIdUrl,
    };
    // console.log(newUser);
    const API = axios.create({
      baseURL: "http://localhost:5002",
    });
    API.post("/register", newUser, {
      headers: headers,
    })
      .then((res) => {
        console.log(res.data);
        setUser({
          name: "",
          email: "",
          state: "",
          dist: "",
          assembly: "",
          address: "",
          phonepe: "",
          voteridnumber: "",
          adharnumber: "",
        });
        setPhone(null);
        setVoterIdUrl(null);
        setAdharIdUrl(null);
        // registorSucces();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const vv = { ...user, phone: phone };

  console.log(vv);

  return (
    <div className="registor__main__card">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="registor__card">
        <h3>Register</h3>
        <form onSubmit={registerUser}>
          <div className="phone__number__card__new">
            <input
              onChange={usernameChange}
              name="name"
              type="text"
              placeholder="name as per adhar id"
              style={{
                width: "92%",
              }}
              value={user.name}
            />
            {/* <input
              onChange={usernameChange}
              name="phone"
              type="text"
              placeholder="phone"
            /> */}
            <div>
              <PhoneInput
                country={"in"}
                value={phone}
                className="phone-number-reg"
                // name="phone"
                // onChange={usernameChange}
                containerClass="new__phone"
                onChange={(phone) => setPhone(phone)}
              />
            </div>
          </div>

          <div className="register__state__card">
            {/* <input
              onChange={usernameChange}
              name="state"
              type="text"
              placeholder="state"
              value={user.state}
            /> */}
            <select name="state" onChange={usernameChange}>
              <option disabled hidden selected>
                State
              </option>
              {stateWiseData.map((each, key) => (
                <option value={each.state} key={key}>
                  {each.state}
                </option>
              ))}
            </select>
            <select name="dist" onChange={usernameChange}>
              <option disabled hidden selected>
                District
              </option>
              {stateWiseDistState?.map((each, key) => (
                <option value={each.name} key={key}>
                  {each.name}
                </option>
              ))}
            </select>
            {/* <input
              onChange={usernameChange}
              name="dist"
              type="text"
              placeholder="dist"
              value={user.dist}
            /> */}
          </div>
          <div>
            <input
              onChange={usernameChange}
              name="email"
              type="text"
              placeholder="email"
              value={user.email}
            />
            <input
              onChange={usernameChange}
              name="assembly"
              type="text"
              placeholder="assembly"
              value={user.assembly}
            />
          </div>

          <div>
            <input
              name="voteridnumber"
              type="text"
              placeholder="voter ID number"
              onChange={usernameChange}
              value={user.voteridnumber}
            />
            <input
              onChange={usernameChange}
              name="adharnumber"
              type="text"
              placeholder="Adhar Number"
              value={user.adharnumber}
            />
          </div>
          <textarea
            name="address"
            rows="4"
            placeholder="Address Polling Station"
            onChange={usernameChange}
            value={user.address}
          ></textarea>
          <input
            style={{
              padding: "0px",
            }}
            type="file"
            placeholder="voter ID Pic"
            onChange={(e) => setVoterIdImg(e.target.files[0])}
          />
          {voterIdUrl && (
            <section>
              <img src={voterIdUrl} alt="" />
            </section>
          )}
          <input
            style={{
              padding: "0px",
            }}
            type="file"
            placeholder="voter ID Pic"
            title="Choose a video please"
            onChange={(e) => setAdharIdImg(e.target.files[0])}
          />
          {adharIdUrl && (
            <section>
              <img src={adharIdUrl} alt="" />
            </section>
          )}
          <input
            onChange={usernameChange}
            name="phonepe"
            type="text"
            placeholder="Phonepe Number"
          />
          <button type="submit">Submit</button>
          <span>
            Do you have an account <Link to="/login">Login</Link>
          </span>
        </form>
      </div>
    </div>
  );
};
