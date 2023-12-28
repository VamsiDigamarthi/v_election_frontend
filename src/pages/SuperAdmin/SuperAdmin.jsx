import React, { useEffect, useState } from "react";
import "./SuperAdmin.css";
import axios from "axios";
import { FaPlusCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiSolidDetail } from "react-icons/bi";
import { TbListDetails } from "react-icons/tb";

import DetailTask from "../DetailTask/DetailTask";
import Payment from "../Payment/Payment";

let headers = new Headers();
headers.append("Content-Type", "application/json");
headers.append("Accept", "application/json");

headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
headers.append("Access-Control-Allow-Credentials", "true");

headers.append("GET", "POST", "PUT", "DELETE", "OPTIONS");
//
//
//
const SuperAdmin = () => {
  const [userData, setUserData] = useState([]);

  const [nameFilter, setNameFilter] = useState("");

  const [taskModalOpenState, setTaskModalOpenState] = useState(false);

  const [userIdFromModal, setUserIdFromModal] = useState(null);

  const [textAreaData, setTextAreaData] = useState("");

  const [detailsTaskOpenModal, setDetailsTaskOpenModal] = useState(false);

  const [userIdFromDetailsModal, setUserIdFromDetailsModal] = useState(null);

  const [paymentModalState, setPaymentModalState] = useState(false);

  const [paymentIdState, setPaymentIdState] = useState({});

  const [psAcTaskAdded, setPsAcTaskAdded] = useState({
    psname: "",
    acname: "",
    psnumber: "",
    acnumber: "",
  });

  const usernameChange = (e) => {
    setPsAcTaskAdded({ ...psAcTaskAdded, [e.target.name]: e.target.value });
  };

  const allFetchDataTable = () => {
    const API = axios.create({
      baseURL: "http://localhost:5002",
    });
    API.get("/score-user", {
      headers: headers,
    })
      .then((res) => {
        // console.log(res.data);
        setUserData(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    allFetchDataTable();
  }, []);

  const onSearchBasedOnPcNo = (e) => {
    setNameFilter(e.target.value);
  };

  //   console.log(nameFilter);

  const onTaskModalOpen = (data) => {
    setTaskModalOpenState(true);
    // console.log(data);
    setUserIdFromModal(data);
  };

  // const onChangeTextArea = (e) => {
  //   setTextAreaData(e.target.value);
  // };

  const editTost = () =>
    toast.success("task added suddesfully ..!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const onSubmitTaskToUser = (e) => {
    e.preventDefault();
    const API = axios.create({
      baseURL: "http://localhost:5002",
    });
    API.post(
      "/add-task-user",
      { ...psAcTaskAdded, id: userIdFromModal },
      {
        headers: headers,
      }
    )
      .then((res) => {
        console.log(res.data);
        editTost();
        setTaskModalOpenState(false);
        setPsAcTaskAdded({
          psname: "",
          acname: "",
          psnumber: "",
          acnumber: "",
        });
        setUserIdFromModal(null);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onDetailsTeaskFun = (id) => {
    setDetailsTaskOpenModal(true);
    setUserIdFromDetailsModal(id);
  };

  //
  // filter data based on score
  //

  const onFilterDataBasedOnScore = (e) => {
    // console.log(e.target.value);
    const API = axios.create({
      baseURL: "http://localhost:5002",
    });
    API.post(
      "/score-user-based-on-score",
      { score: e.target.value },
      {
        headers: headers,
      }
    )
      .then((res) => {
        // console.log(res.data);
        setUserData(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onClearAllFilter = (e) => {
    allFetchDataTable();
  };

  const onPaymentModalFun = (id, phonepe) => {
    setPaymentModalState(true);
    setPaymentIdState({ id, phonepe });
  };

  // console.log(userData);

  return (
    <div className="super_admin">
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

      <div
        className="super_admin__main"
        style={{
          filter:
            (taskModalOpenState || detailsTaskOpenModal || paymentModalState) &&
            "blur(7px)",
        }}
      >
        <div className="table__filter__ui">
          <div className="filter__sort__main__card">
            <select onChange={onFilterDataBasedOnScore}>
              <option disabled hidden selected>
                Filter By Score
              </option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
            <button onClick={onClearAllFilter}>Clear All</button>
          </div>
          <div>
            <input
              type="text"
              placeholder="Name"
              onChange={onSearchBasedOnPcNo}
            />
            <button>Submit</button>
          </div>
        </div>
        {userData.length > 0 ? (
          <div className="table__main__card">
            <div className="table__header__card">
              <span>State</span>
              <span>District Name</span>
              <span>Name</span>
              <span>Phone</span>
              <span>Score</span>
              <span>Action</span>
            </div>
            <div className="table__body__card">
              {userData
                .filter((each) =>
                  nameFilter === ""
                    ? each
                    : each.name.toLowerCase().includes(nameFilter)
                )
                .map((each, key) => (
                  <div key={key}>
                    <span>{each.state}</span>
                    <span>{each.district}</span>
                    <span>{each.name}</span>
                    <span>{each.phone}</span>
                    <span>{each.score}</span>
                    <span
                      style={{
                        display: "flex",
                        gap: "1rem",
                        justifyContent: "flex-start",
                        cursor: "pointer",
                      }}
                    >
                      <FaPlusCircle
                        onClick={() => onTaskModalOpen(each?.id)}
                        size={20}
                      />

                      <BiSolidDetail
                        onClick={() => onDetailsTeaskFun(each?.id)}
                        size={20}
                      />
                      <TbListDetails
                        onClick={() =>
                          onPaymentModalFun(each?.id, each?.phonepe)
                        }
                        size={20}
                      />
                    </span>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div className="table__notdata__card">
            <h2>No data found</h2>
          </div>
        )}
      </div>
      {taskModalOpenState && (
        <div className="add__task__to__user__card">
          <div>
            <span>Add Task</span>
            <ImCross onClick={() => setTaskModalOpenState(false)} />
          </div>
          <form onSubmit={onSubmitTaskToUser}>
            <input
              onChange={usernameChange}
              placeholder="PS_Name"
              type="text"
              name="psname"
              value={psAcTaskAdded.psname}
            />
            <input
              onChange={usernameChange}
              placeholder="PS_Number"
              type="text"
              name="psnumber"
              value={psAcTaskAdded.psnumber}
            />
            <input
              onChange={usernameChange}
              placeholder="AC_Name"
              type="text"
              name="acname"
              value={psAcTaskAdded.acname}
            />
            <input
              onChange={usernameChange}
              placeholder="AC_Number"
              type="text"
              name="acnumber"
              value={psAcTaskAdded.acnumber}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      {/* details modal */}
      {detailsTaskOpenModal && (
        <div className="details__task__to__user__card">
          <div>
            <span>Details Task</span>
            <ImCross onClick={() => setDetailsTaskOpenModal(false)} />
          </div>
          <DetailTask userIdFromDetailsModal={userIdFromDetailsModal} />
        </div>
      )}
      {paymentModalState && (
        <div className="add__task__to__user__card">
          <div>
            <span>Payment Details</span>
            <ImCross onClick={() => setPaymentModalState(false)} />
          </div>
          <Payment paymentIdState={paymentIdState} />
        </div>
      )}
    </div>
  );
};

export default SuperAdmin;
