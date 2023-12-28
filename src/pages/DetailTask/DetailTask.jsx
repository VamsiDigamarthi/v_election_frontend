import React, { useEffect, useState } from "react";
import "./DetailTask.css";
import axios from "axios";

let headers = new Headers();
headers.append("Content-Type", "application/json");
headers.append("Accept", "application/json");

headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
headers.append("Access-Control-Allow-Credentials", "true");

headers.append("GET", "POST", "PUT", "DELETE", "OPTIONS");
const DetailTask = ({ userIdFromDetailsModal }) => {
  const [allTaskFromUser, setAllTaskFromUser] = useState([]);

  const API = axios.create({
    baseURL: "http://localhost:5002",
  });

  const fetchAllTask = () => {
    API.get(`/fetch-task/${userIdFromDetailsModal}`, {
      headers: headers,
    })
      .then((res) => {
        // console.log(res.data);
        setAllTaskFromUser(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchAllTask();
  }, []);

  //   console.log(allTaskFromUser);

  return (
    <div className="details__main__card">
      {allTaskFromUser.length > 0 ? (
        <>
          {allTaskFromUser.map((each, key) => (
            <div key={key} className="details__inner__loop">
              <span>{each.PS_name}</span>
              <span>{each.PS_No}</span>
              <span>{each.AC_name}</span>
              <span>{each.AC_No}</span>
              <span
                style={{
                  color:
                    each.action === "accepted"
                      ? "lightgreen"
                      : each.action === "rejected"
                      ? "lightcoral"
                      : "lightcyan",
                }}
              >
                {each.action}
              </span>
            </div>
          ))}
        </>
      ) : (
        <div>
          <h4>No Data Found</h4>
        </div>
      )}
    </div>
  );
};

export default DetailTask;
