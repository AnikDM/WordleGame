
const Alphabets = ({inputRef}) => {
  const alphabets = "abcdefghijklmnopqrstuvwxyz";
  const alphabetsArr = alphabets.split("");
  return (
    <div className="flex w-full justify-center">
      <div className="flex mt-5 flex-wrap w-1/2 max-sm:w-full justify-center">
        {alphabetsArr.map((item, index) => {
          return (
            <h1
              ref={(inp) => (inputRef.current[item] = inp)}
              className=" rounded-md text-xl max-sm:text-md font-bold w-16 h-16 max-sm:w-12 max-sm:h-12 flex justify-center items-center m-1 border border-slate-700 text-center"
              key={index}
            >
              {item}
            </h1>
          );
        })}
      </div>
    </div>
  );
};

export default Alphabets;
