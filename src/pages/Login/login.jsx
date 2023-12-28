import React, { useState } from "react";
import "./Login.css";
import { FaPhoneAlt } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch } from "react-redux";
// import {
//   getAuth,
//   RecaptchaVerifier,
//   signInWithPhoneNumber,
// } from "firebase/auth";

// import toast, { Toaster } from "react-hot-toast";

import OtpInput from "otp-input-react";

import { PiShieldWarningLight } from "react-icons/pi";
// import { auth } from "../../firebse";
import { useNavigate } from "react-router-dom";
import { LogIns } from "../../action/AuthAction";
// import { getAuth } from "firebase/auth";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");

  // console.log(phoneNumber);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = () => {
    const sss = { phone: phoneNumber };
    console.log(sss);
    dispatch(LogIns(sss, navigate));
  };

  return (
    <div className="login__main__card">
      {/* <Toaster /> */}
      <div className="login__card">
        <span>Welcome To</span>
        {/* <span>Cams Project</span> */}
        {otp === "" ? (
          <>
            <div className="phone-icon-div">
              <FaPhoneAlt size={30} color="#0cab41" />
            </div>
            <span>Verify your phone number</span>
            <PhoneInput
              country={"in"}
              value={phoneNumber}
              className="phone-number"
              onChange={(phone) => setPhoneNumber(phone)}
            />
            <button
              style={{
                width: "200px",
              }}
              onClick={handleSubmit}
            >
              Send Code Via SMS
            </button>
          </>
        ) : (
          <>
            <div className="phone-icon-div">
              <PiShieldWarningLight size={30} color="#0cab41" />
            </div>
            <span>Enter your OTP</span>
            <OtpInput
              value={otp}
              onChange={setOtp}
              OTPLength={6}
              otpType="number"
              disable={false}
              autoFocus
              className="otp-container"
            ></OtpInput>
            <button>Submit the Code</button>
          </>
        )}

        {/* otp */}
      </div>
    </div>
  );
};

export default Login;
