import "./App.css";
import { Footer } from "./assets/Footer";
import mk from "./assets/img/mk.jpg";
import kk from "./assets/img/kk.png";
import jax from "./assets/img/jax.png";
import cetrion from "./assets/img/cetrion.png";
import { useState, useEffect } from "react";

import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

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

const timer = () => {
  setTi;
};

function handleComparison(event) {
  compareToDB(event);
}

async function compareToDB(e) {
  //char
  const docRef = doc(getFirestore(), "characters", "jax"); //char
  const docSnap = await getDoc(docRef);
  const minX = await docSnap.data().minX;
  const maxX = await docSnap.data().maxX;
  const minY = await docSnap.data().minY;
  const maxY = await docSnap.data().maxY;

  if (e.pageX >= minX && e.pageX <= maxX && e.pageY >= minY && e.pageY <= maxY)
    console.log("you found jax");
}
function App() {
  const [coordinate, setCoordinates] = useState({ x: null, y: null });

  const boxPosition = { top: coordinate.y, left: coordinate.x };

  const setXY = (e) => {
    setCoordinates({ x: e.pageX, y: e.pageY });
  };

  return (
    <div className="App">
      <div className="hidden charWindow" style={boxPosition}>
        <p>Select the character</p>
        <div
          id="guess-box"
          onClick={(e) => {
            if (!e.target.classList.contains("char")) return;
            console.log(e.target.id);
            handleComparison(e);
            document.querySelector(".charWindow").classList.toggle("hidden");
          }}
        >
          <img src={kk} alt="kotalkhan" className="char" id="kk" />
          <img src={jax} alt="jax" className="char jax" id="jax" />
          <img src={cetrion} alt="cetrion" className="char" id="cetrion" />
        </div>
        <div className="charNameWindow">
          <div>Kotal Khan</div>
          <div>Jax</div>
          <div>Cetrion</div>
        </div>
      </div>
      <nav id="nav">
        <h1 id="title">Where's Waldo</h1>
        <div className="nav-chars">
          <img src={kk} alt="khan" className="nav-char" />
          <img src={jax} alt="jax" className="nav-char" />
          <img src={cetrion} alt="cetrion" className="nav-char" />
        </div>
      </nav>
      <img
        src={mk}
        id="image"
        onClick={(e) => {
          setXY(e);
          document.querySelector(".charWindow").classList.toggle("hidden");
        }}
      />
      <Footer />
    </div>
  );
}

export default App;
