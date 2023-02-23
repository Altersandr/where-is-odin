import "./App.css";
import { Footer } from "./assets/Footer";
import mk from "./assets/img/mk.jpg";
import kk from "./assets/img/kk.png";
import jax from "./assets/img/jax.png";
import cetrion from "./assets/img/cetrion.png";
import { useState } from "react";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  orderBy,
  onSnapshot,
  limit,
  query,
  doc,
  updateDoc,
  setDoc,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCS6p8dm2R__jkoWfyyqIk6Rw-sWSDQIG0",
  authDomain: "where-s-waldo-mk-edition.firebaseapp.com",
  projectId: "where-s-waldo-mk-edition",
  storageBucket: "where-s-waldo-mk-edition.appspot.com",
  messagingSenderId: "836438839889",
  appId: "1:836438839889:web:5a6f74c465d80333b95e70",
  measurementId: "G-PDJEP83CJW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function compareToDB(e) {
  const recentClick = query(
    collection(getFirestore(), "coordinates"),
    orderBy("timestamp", "desc"),
    limit(1)
  );
  // console.log(recentClick);
  onSnapshot(recentClick, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      const coordinate = change.doc.data();
      // console.log(coordinate);
    });
  });
}

async function saveCoordinates(coordinates) {
  try {
    await addDoc(collection(db, "coordinates"), {
      x: coordinates.x,
      y: coordinates.y,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error adding the coordinates to the Database", error);
  }
}

function App() {
  const [coordinate, setCoordinates] = useState({ x: null, y: null });

  const boxPosition = { top: coordinate.y, left: coordinate.x };

  const setXY = (e) => {
    // console.log(e);
    setCoordinates({ x: e.pageX, y: e.pageY });
  };

  return (
    <div
      className="App"
      onMouseMove={(e) => {
        setXY(e);
      }}
      onClick={() => {
        document.querySelector(".charWindow").classList.toggle("hidden");
      }}
    >
      <div className="hidden charWindow" style={boxPosition}>
        <p>Select the character</p>
        <div id="guess-box">
        <img src={kk} alt="kotalkhan" />
        <img src={jax} alt="jax" className="jax"/>
        <img src={cetrion} alt="cetrion" />
        </div>
        <div className="charNameWindow">
          <div>Kotal Khan</div>
          <div>Jax</div>
          <div>Cetrion</div>
        </div>
        
      </div>
      <nav id="nav">
        <h1>Where's Waldo</h1>
        <p>{coordinate.x}</p>
        <p>{coordinate.y}</p>
        <h1>MK Edition</h1>
      </nav>
      <img
        src={mk}
        id="image"
        onClick={() => {
          saveCoordinates(coordinate);
          compareToDB();
        }}
      />
      <Footer />
    </div>
  );
}

export default App;
