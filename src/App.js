import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Sidebar } from "./components/Sidebar/Sidebar";

// import { Login } from "./pages/Login/Login";
import { useSelector } from "react-redux";

// import axios from "axios";
import { Register } from "./pages/Register/Register";

import Login from "./pages/Login/login";
import { Home } from "./pages/Home/Home";
import { Profile } from "./pages/Profile/Profile";
import Quize from "./pages/Quize/Quize";
import TaskPage from "./pages/TaskPage/TaskPage";
import SuperAdmin from "./pages/SuperAdmin/SuperAdmin";
import Admin from "./pages/Admin/Admin";

let headers = new Headers();
headers.append("Content-Type", "application/json");
headers.append("Accept", "application/json");

headers.append("Access-Control-Allow-Origin", "*");
headers.append("Access-Control-Allow-Credentials", "true");

headers.append("GET", "POST", "PUT", "DELETE", "OPTIONS");

function App() {
  const UUU = useSelector((state) => state.authReducer.authData);

  return (
    <div className="App">
      <Router>
        <Sidebar>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/"
              element={UUU ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={UUU ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="/quize"
              element={UUU ? <Quize /> : <Navigate to="/login" />}
            />
            <Route
              path="/task"
              element={UUU ? <TaskPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/super-admin"
              element={UUU ? <SuperAdmin /> : <Navigate to="/login" />}
            />
            <Route
              path="/admin"
              element={UUU ? <Admin /> : <Navigate to="/login" />}
            />

            {/* <Route
              path="/admin"
              element={
                UUU ? (
                  UUU[0].role === "admin" ? (
                    <Admin
                      getALlCamsDataFun={getALlCamsDataFun}
                      apiAllCamsDataFromAppCom={apiAllCamsDataFromAppCom}
                    />
                  ) : (
                    <NotAccess />
                  )
                ) : (
                  <Navigate to="/login" />
                )
              }
            /> */}
            {/* <Route
              path="/super-admin"
              element={
                UUU ? (
                  UUU[0].role === "super-admin" ? (
                    <SuperAdmin
                      apiAllCamsDataFromAppCom={apiAllCamsDataFromAppCom}
                    />
                  ) : (
                    <NotAccess />
                  )
                ) : (
                  <Navigate to="/login" />
                )
              }
            /> */}
          </Routes>
        </Sidebar>
      </Router>
    </div>
  );
}

export default App;
