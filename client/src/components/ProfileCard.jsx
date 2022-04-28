import React from "react";
import { useNavigate } from "react-router-dom";

function ProfileCard(props) {
  let navigate = useNavigate();
  return (
    <div>
      <h4>{props.name}</h4>
      <button
        onClick={() => {
          navigate(`/profile/${props.id}`);
        }}
      >
        View Profile
      </button>
    </div>
  );
}

export default ProfileCard;
