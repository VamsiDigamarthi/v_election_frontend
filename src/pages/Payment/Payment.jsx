import React from "react";
import "./Payment.css";
const Payment = ({ paymentIdState }) => {
  //   console.log(paymentIdState);
  return (
    <div className="payment__main__card">
      <div className="payment__kitreturn_card">
        <span>Kit Return</span>
        <span>True</span>
      </div>
      <div className="payment__kitreturn_card">
        <span>PhonePe Number</span>
        <span>{paymentIdState.phonepe}</span>
      </div>
      <div className="payment__kitreturn_card">
        <span>Total Payment</span>
        <span>1200/-</span>
      </div>
    </div>
  );
};

export default Payment;
