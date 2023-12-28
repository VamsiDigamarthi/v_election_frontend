import React, { useState } from "react";
import "./Header.css";

import { Drawer } from "antd";

import { GiHamburgerMenu } from "react-icons/gi";
const Header = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="header__main__card">
      <h2>Welcome </h2>
      <GiHamburgerMenu />
    </div>
  );
};

export default Header;
