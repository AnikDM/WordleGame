import { useContext, useEffect, useRef } from "react";
import { inputContext } from "../context/inputContext";

const RowFixed = ({ solvedWord,actualWord }) => {
  const inp=solvedWord.split("")
  const inputRefs = useRef([]);

  useEffect(() => {
    inp.forEach((char, index) => {
      const inputEl = inputRefs.current[index];
      if (!inputEl) return;

      inputEl.classList.remove("bg-green-500", "bg-yellow-400", "bg-gray-300");

      if ((actualWord.toUpperCase().split(""))[index] === char) {
        inputEl.classList.add("bg-green-500","dark:bg-green-500", "text-white");
      } else if (actualWord.toUpperCase().includes(char)) {
        inputEl.classList.add("bg-yellow-400","dark:bg-yellow-400", "text-white");
      } else {
        inputEl.classList.add("bg-gray-300","dark:bg-gray-700");
      }
    });
  }, []);

  return (
    <div className="my-2 flex justify-center">
      {inp.map((value, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          value={value}
          readOnly
          className="w-20 h-20 max-sm:w-16 max-sm:h-16 text-3xl max-sm:text-2xl border border-gray-800 rounded-md mx-1 text-center dark:bg-gray-800 dark:border-white"
        />
      ))}
    </div>
  );
};

export default RowFixed;
