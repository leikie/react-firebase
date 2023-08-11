import React, { useState } from "react";
const Profile = () => {
  const [image, setImage] = useState(null);

  // progress
  const [percent, setPercent] = useState(0);

  return (
    <section>
      <h3>Profile</h3>
      <input
        type="file"
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
      />
      <button>Upload</button>
      <p>{percent} "% done"</p>

      <div>
        <img src={user.photoURL} alt="" />
        <h3>Hi, #12082023 - user@baledemia.id</h3>
        <a href="#">Logout</a>
        <p>
          <a href="#">Delete Account</a>
        </p>
      </div>
    </section>
  );
};

export default Profile;
