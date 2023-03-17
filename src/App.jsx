import "./App.css";
import { Footer } from "./assets/Footer";
import mk from "./assets/img/mk.jpg";
import kk from "./assets/img/kk.png";
import jax from "./assets/img/jax.png";
import cetrion from "./assets/img/cetrion.png";
import { useState, useEffect} from "react";
import Timer from "./assets/Timer";

import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

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

async function compareToDB(e, char) {
  //char
  const docRef = doc(getFirestore(), "characters", char); //char
  const docSnap = await getDoc(docRef);
  const minX = await docSnap.data().minX;
  const maxX = await docSnap.data().maxX;
  const minY = await docSnap.data().minY;
  const maxY = await docSnap.data().maxY;

  if (e.x >= minX && e.x <= maxX && e.y >= minY && e.y <= maxY) {
    document.querySelectorAll(`.${char}`).classList.add("found");
  }
}

const toggleHidden = ()=>{
  document.querySelector(".nav-chars-list").classList.toggle("hidden")
}

function App() {
  // const [counter, setCounter] = useState(0);

  const [coordinate, setCoordinates] = useState({ x: null, y: null });

  const boxPosition = { top: coordinate.y, left: coordinate.x };

  const setXY = (e) => {
    setCoordinates({ x: e.pageX, y: e.pageY });
  };



  useEffect(()=>{
    (async ()=>{
      await setDoc(doc(getFirestore(), "timer", "start"), {start: new Date().toTimeString().slice(0, 8)})
    })()

    
  },[])

  return (
    <div className="App">
      <div className="hidden charWindow" style={boxPosition}>
        <p>Select the character</p>
        <div
          id="guess-box"
          onClick={(e) => {
            if (!e.target.classList.contains("char")) return;
            compareToDB(coordinate, e.target.id);
            document.querySelector(".charWindow").classList.toggle("hidden");
          }}
        >
          <img src={kk} alt="shaokahn" className="char" id="kk" />
          <img src={jax} alt="jax" className="char" id="jax" />
          <img src={cetrion} alt="cetrion" className="char" id="cetrion" />
        </div>
        <div className="charNameWindow">
          <div>Shao Kahn</div>
          <div>Jax</div>
          <div>Cetrion</div>
        </div>
      </div>
      <nav id="nav">
        <div id="timer">
          <Timer />
        </div>
        <h1 id="title">Where's Waldo</h1>
        
        <div className="nav-chars">
          <div className="find" onMouseEnter={toggleHidden} onMouseLeave={toggleHidden}>?</div>
          <div className="hidden nav-chars-list">
          <img src={kk} alt="kahn" className="nav-char kk" />
          <img src={jax} alt="jax" className="nav-char jax" />
          <img src={cetrion} alt="cetrion" className="nav-char cetrion" />
          </div>
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
