

const Button = ({handleClick,isActive}) => {
  return (
    <button
            onClick={(e) => handleClick(e)}
            className="bg-yellow-400 rounded-md shadow-md p-2 text-xl font-bold disabled:bg-yellow-200 disabled:text-gray-500 disabled:cursor-not-allowed dark:text-gray-800"
            disabled={isActive}
            
          >
            Check Wordles!
          </button>
  )
}

export default Button