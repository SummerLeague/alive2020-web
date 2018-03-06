import React from "react";

const Profile = (props) => {
  const { story } = props;

  return (
    <video loop="loop" autoplay="autoplay">
      <source src={ story.mp4Source } type="video/mp4"/>
      <source src={ story.webmSource } type="video/webm"/>
    </video>
  );
};

export default Profile;
