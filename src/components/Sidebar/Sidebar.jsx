import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { SiPowerautomate } from "react-icons/si";
import { IoHome } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import { LiaSuperpowers } from "react-icons/lia";
import { Link, useLocation } from "react-router-dom";
import { RiLogoutCircleLine } from "react-icons/ri";
import { logout } from "../../action/AuthAction";
import { useDispatch } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { MdQuiz } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
export const Sidebar = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const pathValue = location.pathname;

  // const [sideBarOpenState, setSideBarOpenState] = useState(false);

  const handleLogOut = () => {
    dispatch(logout());
  };

  // const onSideBarOpenFun = () => {
  //   setSideBarOpenState(true);
  // };

  // const onSideBarCloseFun = () => {
  //   setSideBarOpenState(false);
  // };

  return (
    <div
      className="sidebar__main"
      style={{
        padding: pathValue === "/login" && "0px",
      }}
    >
      {/* <div className="side__main__icon">
        {!sideBarOpenState ? (
          <GiHamburgerMenu onClick={onSideBarOpenFun} size={20} />
        ) : (
          <ImCross onClick={onSideBarCloseFun} size={20} />
        )}
      </div> */}
      {pathValue !== "/login" && pathValue !== "/register" && (
        <section
          className="sidebar__left__side"
          style={{
            width: window.innerWidth < "768" ? "1%" : "2%",
          }}
        >
          <SiPowerautomate
            size={window.innerWidth < "768" ? 15 : 25}
            color="#ff6f00"
          />
          <Link to="/">
            <IoHome size={window.innerWidth < "768" ? 10 : 20} color="white" />
          </Link>
          <Link to="/super-admin">
            <MdAdminPanelSettings
              size={window.innerWidth < "768" ? 10 : 20}
              color="white"
            />
          </Link>
          <Link to="/admin">
            <LiaSuperpowers
              size={window.innerWidth < "768" ? 10 : 20}
              color="white"
            />
          </Link>
          <Link to="/profile">
            <CgProfile
              size={window.innerWidth < "768" ? 10 : 20}
              color="white"
            />
          </Link>
          <Link to="/quize">
            <MdQuiz size={window.innerWidth < "768" ? 10 : 20} color="white" />
          </Link>
          <Link to="/task">
            <FaTasks size={window.innerWidth < "768" ? 10 : 20} color="white" />
          </Link>
          <div className="side_bar_logout_icon" onClick={handleLogOut}>
            <RiLogoutCircleLine size={window.innerWidth < "768" ? 10 : 20} />
          </div>
        </section>
      )}

      <main className="sidebar__right__side">{children}</main>
    </div>
  );
};
