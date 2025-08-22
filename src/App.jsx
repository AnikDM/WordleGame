import { useEffect, useRef, useState } from "react";
import "./App.css";
import RowInput from "./components/RowInput";
import RowFixed from "./components/RowFixed";
import { inputContext } from "./context/inputContext";
import Alphabets from "./components/Alphabets";
import Button from "./components/Button";
import { generate } from "random-words";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import { Box, Modal, Snackbar, Typography } from "@mui/material";
import Spinner from "./components/Spinner";
import Footer from "./components/Footer";
import HowToPlay from "./components/HowToPlay";
import { BrowserRouter } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import HowToPlay from "./components/HowToPlay";

function App() {
  const word = useRef(generate({ minLength: 3, maxLength: 7 }));
  const [spinner, setSpinner] = useState(false);
  const [isHowToPlay, setIsHowToPlay] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => setSpinner(true), []);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter" && isActive) {
        // handleClick();
      }
    };
    // Attach event listener to the document
    document.addEventListener("keydown", handleKeyDown);
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [darkMode]);
  setTimeout(() => {
    setSpinner(false);
  }, 500);
  const len = word.current.length;
  useEffect(() => {
    console.log(word.current);
  }, []);
  const inputRef = useRef([]);
  const [attempts, setAttempts] = useState(5);
  const [solvedWords, setsolvedWords] = useState([]);
  const [inp, setInp] = useState(new Array(len).fill(""));
  const [isActive, setIsActive] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState({ open: false, message: "No Hint!" });
  let incAlbhabets = [];
  let incAlbhabets2 = [];
  const [text, setText] = useState({
    confetti: false,
    value: `Alas! You lose. The word was "${word.current}"`,
  });

  const { width, height } = useWindowSize();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "15px",
    bgcolor: "background.paper",
    textAlign: "center",
    boxShadow: 24,
    p: 4,
  };
  // console.log(inputRef);
  function handleClick() {
    setIsActive(true);
    if (attempts === 3) {
      setToast({
        open: true,
        message: "You have only 3 attempts remaining!",
      });
    }
    if (inp.join("") === word.current.toUpperCase()) {
      setText({ confetti: true, value: "Congrats! You Won" });
      setIsOpen(true);
    } else if (attempts === 0) {
      setIsOpen(true);
    } else {
      setsolvedWords((prev) => [...prev, inp.join("")]);
      incAlbhabets = inp.filter((item) => {
        if (!word.current.toUpperCase().includes(item)) return item;
      });
      incAlbhabets2 = inp.filter((item) =>
        word.current.toUpperCase().includes(item)
      );
      // console.log(incAlbhabets);
      // console.log(incAlbhabets2);
      setInp(new Array(len).fill(""));
      setAttempts(attempts - 1);
      incAlbhabets2.forEach((item) => {
        inputRef.current[item.toLowerCase()].classList.add("bg-green-600");
      });
      incAlbhabets.forEach((item) => {
        inputRef.current[item.toLowerCase()].classList.add("bg-red-600");
      });
    }
  }
  function handleClose() {
    setIsOpen(false);
    window.location.reload();
  }
  return (
    <inputContext.Provider value={{ inp, setInp }}>
      <BrowserRouter>
        {text.confetti ? <Confetti width={width} height={height} /> : ""}
        <Snackbar
          open={toast.open}
          onClose={() =>
            setToast({
              open: false,
              message: "You have only 3 attempts remaining!",
            })
          }
          autoHideDuration={2000}
          message={toast.message}
        />
        <Modal
          open={isOpen}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {text.value}
            </Typography>
            <button
              className=" bg-yellow-400 p-2 rounded-md mt-2 font-bold"
              onClick={handleClose}
            >
              Play Again
            </button>
          </Box>
        </Modal>
        <div className="app overflow-y-auto">
          <div className=" bg-yellow-400 w-full h-28 shadow-md flex items-center justify-center dark:text-gray-800 fixed top-0">
            <h1 className="text-5xl title">Wordle Game</h1>
            <div className="text-xl absolute right-24 rounded-full p-1 gap-3 flex">
              <div className="me-12 flex gap-10 font-bold">
                <span>Points: 0</span>
                <span>Attempts: {attempts + 1} left</span>
              </div>
              <button onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? (
                  <LightModeIcon fontSize="large" />
                ) : (
                  <DarkModeIcon fontSize="large" />
                )}
              </button>
            </div>
          </div>
          {spinner ? <Spinner /> : ""}
          {isHowToPlay ? (
            <div className="dark:bg-gray-800 mt-32">
              <div className="input block">
                {solvedWords.map((item) => (
                  <RowFixed
                    key={item}
                    solvedWord={item}
                    actualWord={word.current}
                  />
                ))}
                <RowInput len={len} setIsActive={setIsActive} />
              </div>
              <div className="">
                <Button handleClick={handleClick} isActive={isActive} />
                <Alphabets inputRef={inputRef} />
                <div className="mt-5">
                  <p className="font-bold text-xl">
                    Attempts: {attempts + 1} left
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <HowToPlay setIsHowToPlay={setIsHowToPlay} />
          )}
        </div>
        <Footer setIsHowToPlay={setIsHowToPlay} />
      </BrowserRouter>
    </inputContext.Provider>
  );
}

export default App;
