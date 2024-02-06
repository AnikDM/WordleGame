import { useEffect, useRef, useState } from "react";
import "./App.css";
import RowInput from "./components/RowInput";
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
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import HowToPlay from "./components/HowToPlay";

function App() {
  const word = useRef(generate({ minLength: 3, maxLength: 7 }));
  const [spinner, setSpinner] = useState(false);
  const [isHowToPlay, setIsHowToPlay] = useState(true);
  useEffect(() => setSpinner(true), []);
  setTimeout(() => {
    setSpinner(false);
  }, 500);
  const len = word.current.length;
  console.log(word.current);
  const inputRef = useRef([]);
  const [attempts, setAttempts] = useState(5);
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
    // console.log(inp.join(''))
    if (inp.join("") === word.current.toUpperCase()) {
      setText({ confetti: true, value: "Congrats! You Won" });
      setIsOpen(true);
    } else if (attempts === 0) {
      setIsOpen(true);
    } else {
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
          <div className=" bg-yellow-400 w-full h-28 shadow-md flex items-center justify-center fixed">
            <h1 className="text-5xl title">Wordle Game</h1>
          </div>
          <div className="mt-32"></div>
          {spinner ? <Spinner /> : ""}
          {isHowToPlay ? (
            <>
              <div className="my-5 input">
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
            </>
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
