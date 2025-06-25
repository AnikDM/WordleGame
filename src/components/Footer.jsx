import { Link } from "react-router-dom";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
const Footer = ({ setIsHowToPlay }) => {
  return (
    <footer className="bg-gray-800 shadow fixed bottom-0 w-full dark:bg-yellow-400">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-400 sm:text-center dark:text-gray-800">
          © 2024 Anik Das Mondal
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-400 dark:text-gray-800 sm:mt-0">
          <li>
            <Link onClick={() => setIsHowToPlay(false)}><LightbulbIcon/> How to play</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
