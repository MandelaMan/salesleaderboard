import React from "react";

const ProfilePic = ({ picture }) => {
  var bg = {
    backgroundImage: `url(${process.env.PUBLIC_URL + `/faces/${picture}.jpg`})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return <div className="profile" style={bg}></div>;
};

export default ProfilePic;
