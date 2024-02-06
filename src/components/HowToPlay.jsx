const HowToPlay = ({ setIsHowToPlay }) => {
  return (
    <div className="text-left p-9">
      <ul className=" list-disc">
        <li>
          <strong>Guess the Word:</strong> Start by guessing a n-letter word.
          Enter your guess into the provided input field.
        </li>
        <li>
          <strong>Receive Feedback:</strong> After each guess, youll receive
          immediate feedback:
          <ul className=" list-decimal ms-3">
            <li><span className="text-green-700 font-bold">Green boxes</span> indicate correct letters in the correct position.</li>
            <li><span className="text-red-700 font-bold">Red boxes</span> indicate correct letters but in the wrong position.</li>
            <li><span className="text-slate-500 font-bold">White boxes</span> indicate letters not present in the secret word.</li>
          </ul>
        </li>
        <li>
          <strong>Make Strategic Guesses:</strong> Use the feedback to deduce
          the secret word. Guess wisely within the six attempts allowed.
        </li>
        <li>
          <strong>Win or Lose:</strong> If you guess the word within six
          attempts, you win! If not, the game ends, but you can always try again.
        </li>
      </ul>
      <div className="text-center mt-5">
        <button
          onClick={() => setIsHowToPlay(true)}
          className=" bg-yellow-500 p-3 rounded-md font-bold text-2xl hover:bg-yellow-600"
        >
          Lets Play
        </button>
      </div>
    </div>
  );
};

export default HowToPlay;
