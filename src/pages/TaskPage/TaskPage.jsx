import React, { useEffect, useState } from "react";
import "./TaskPage.css";
import { useSelector } from "react-redux";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let headers = new Headers();
headers.append("Content-Type", "application/json");
headers.append("Accept", "application/json");

headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
headers.append("Access-Control-Allow-Credentials", "true");

headers.append("GET", "POST", "PUT", "DELETE", "OPTIONS");

const TaskPage = () => {
  const [taskForUser, setTaskForUser] = useState([]);

  const UUU = useSelector((state) => state.authReducer.authData);
  const API = axios.create({
    baseURL: "http://localhost:5002",
  });

  console.log(UUU);

  const fetchAllTask = () => {
    API.get(`/fetch-task/${UUU[0]?.id}`, {
      headers: headers,
    })
      .then((res) => {
        console.log(res.data);
        setTaskForUser(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchAllTask();
  }, []);

  const acceptedTask = () =>
    toast.success("task accepted suddesfully ..!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const rejectedTask = () =>
    toast.success("rejected task suddesfully ..!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const onAcceptedTask = (id) => {
    API.put(
      `/update-task/${id}`,
      { action: "accepted" },
      {
        headers: headers,
      }
    )
      .then((res) => {
        // console.log(res.data);
        fetchAllTask();
        acceptedTask();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onRejectedTask = (id) => {
    API.put(
      `/update-task/${id}`,
      { action: "rejected" },
      {
        headers: headers,
      }
    )
      .then((res) => {
        // console.log(res.data);
        fetchAllTask();
        rejectedTask();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="task__main__page">
      <h1>Manage Your Task Easy..</h1>
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
      {taskForUser.length > 0 ? (
        <div className="multi__task__loop__main">
          {taskForUser.map((each, key) => (
            <div key={key} className="multi__task__loop__card">
              <div className="ps_ac_name_card">
                <p>
                  PS Address <span>{each.PS_name}</span>
                </p>
                <p>
                  PS Number <span>{each.PS_No}</span>
                </p>
                <p>
                  Ac Name <span>{each.AC_name}</span>
                </p>
                <p>
                  Ac Number <span>{each.AC_No}</span>
                </p>
              </div>
              {each.action === "initiated" ? (
                <div className="multi__task__button__card">
                  <button onClick={() => onAcceptedTask(each?.id)}>
                    Accept
                  </button>
                  <button onClick={() => onRejectedTask(each?.id)}>
                    Reject
                  </button>
                </div>
              ) : (
                <div className="accept__or__rejected__card">
                  {each.action === "accepted" && (
                    <div className="upload__file__card">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "1rem",
                        }}
                      >
                        <input type="file" id="image" />
                        <label className="file__lable__task" htmlFor="image">
                          Installation Image
                        </label>
                        <img
                          className="upload__file__images"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyiDT-dnsxAVRxqmLMrcrfFDPEgxKfOxjU3Q&usqp=CAU"
                          alt=""
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "1rem",
                        }}
                      >
                        <input type="file" id="image" />
                        <label className="file__lable__task" htmlFor="image">
                          Installation certificate
                        </label>
                        <img
                          className="upload__file__images"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyiDT-dnsxAVRxqmLMrcrfFDPEgxKfOxjU3Q&usqp=CAU"
                          alt=""
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "1rem",
                        }}
                      >
                        <input type="file" id="image" />
                        <label className="file__lable__task" htmlFor="image">
                          Completed Certificate
                        </label>
                        <img
                          className="upload__file__images"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyiDT-dnsxAVRxqmLMrcrfFDPEgxKfOxjU3Q&usqp=CAU"
                          alt=""
                        />
                      </div>
                      <button className="upload__files__button__main">
                        Upload
                      </button>
                    </div>
                  )}
                  <div
                    style={{
                      // display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                      width: "100%",
                      marginTop: "20px",
                      display: each.action === "accepted" ? "none" : "block",
                    }}
                  >
                    <button>
                      You are <span>{each.action}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <h2>No Task Found</h2>
        </div>
      )}
    </div>
  );
};

export default TaskPage;
