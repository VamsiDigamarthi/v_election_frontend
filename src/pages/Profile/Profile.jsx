import React, { useState } from "react";
import "./Profile.css";
import { motion } from "framer-motion";
import EditProfile from "../EditProfile/EditProfile";
import { ImCross } from "react-icons/im";
import { useSelector } from "react-redux";

const deleteDropIn = {
  hidden: {
    // y: "-100vh",
    opacity: 0.5,
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.5,
  },
};

export const Profile = () => {
  const UUU = useSelector((state) => state.authReducer.authData);
  const [editModalState, setEditModalState] = useState(false);

  const onEditModalCrossClick = () => {
    setEditModalState(false);
  };

  return (
    <div className="profile__main">
      <div
        className="profile__main__card"
        style={{
          filter: editModalState && "blur(8px)",
        }}
      >
        <div className="profile__left__card">
          <div className="profile__name__edit__button__card">
            <h2>{UUU[0]?.name}</h2>
            <button onClick={() => setEditModalState(true)}>
              Edit Profile
            </button>
          </div>
          <span>{UUU[0]?.phone}</span>
          <span>{UUU[0]?.email}</span>
          <span>{UUU[0]?.address}</span>

          <p>
            State - <span>{UUU[0]?.state}</span>
          </p>
          <p>
            {" "}
            District - <span>{UUU[0]?.district}</span>
          </p>
          <p>
            {" "}
            assembly - <span>{UUU[0]?.assembly}</span>
          </p>

          <p>
            PhonePe - <span>{UUU[0]?.phonepe}</span>
          </p>
          <p>
            VoterID <span>{UUU[0]?.voteridnumber}</span>
          </p>
          <p>
            Adhar No <span>{UUU[0]?.adharnumber}</span>
          </p>
        </div>

        <div className="profile__right__card">
          <img src={UUU[0]?.voteridurl} alt="" />
          <img src={UUU[0]?.adharidurl} alt="" />
        </div>
      </div>
      {editModalState && (
        <motion.div
          variants={deleteDropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="edit_modal_card"
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <span>Edit User Details</span>
            <ImCross onClick={onEditModalCrossClick} />
          </div>
          <EditProfile setEditModalState={setEditModalState} />
        </motion.div>
      )}
    </div>
  );
};
