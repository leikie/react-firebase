import React, { useContext, useEffect, useRef, useState } from "react";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  signOut,
} from "firebase/auth";
import { Navigate, useNavigate, redirect } from "react-router-dom";
import { AuthContext } from "../auth-context";
import { auth, db, storage } from "../config/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { deleteUser } from "firebase/auth";

const Profile = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [user, setUser] = useState({});
  // progress
  const [percent, setPercent] = useState(0);
  const { currentUser } = useContext(AuthContext);
  const imageRef = useRef(null);

  const deleteAccount = async (e) => {
    e.preventDefault();
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      "qwerty"
    );

    const result = await reauthenticateWithCredential(
      auth.currentUser,
      credential
    );

    await deleteUser(result.user)
      .then(async () => {
        // User deleted.
        const userDoc = doc(db, "users", user.id);
        await deleteDoc(userDoc);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const userCollectionRef = collection(db, "users");
  const getUser = async () => {
    const q = query(userCollectionRef, where("uid", "==", currentUser.uid));
    const querySnapshot = await getDocs(q);
    let temp = {};

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      temp = { ...doc.data(), id: doc.id };
    });

    setUser(temp);
  };

  useEffect(() => {
    user && getUser();
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/login");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  if (!currentUser) {
    return <Navigate replace to="/login" />;
  }

  const handleUpload = () => {
    if (image == null) return;

    const storageRef = ref(storage, `/images/${image.name}`);
    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          try {
            const docRef = doc(collection(db, "users"), user.id);

            // where("uid", "==", currentUser.uid
            updateDoc(docRef, {
              photoURL: url,
            })
              .then((docRef) => {
                console.log("Entire Document has been updated successfully");
                getUser();
                imageRef.current.value = null;
                setPercent(0);
              })
              .catch((error) => {
                console.log(error);
              });
          } catch (e) {
            console.log(e.message);
          }
        });
      }
    );
  };

  return (
    <section>
      <h3>Profile</h3>
      <input
        type="file"
        ref={imageRef}
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
      />
      <button disabled={percent !== 0 && percent < 100} onClick={handleUpload}>
        Upload
      </button>
      <p>{percent} "% done"</p>

      <div>
        <img src={user.photoURL} alt="" />
        <h3>
          Hi, {user.uid} - {user.email}
        </h3>
        <a href="#" onClick={handleLogout}>
          Logout
        </a>
        <p>
          <a href="#" onClick={deleteAccount}>
            Delete Account
          </a>
        </p>
      </div>
    </section>
  );
};

export default Profile;
