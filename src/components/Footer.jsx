import { Link } from "react-router-dom";
import LightbulbIcon from '@mui/icons-material/Lightbulb';

const Footer = ({ setIsHowToPlay }) => {
  return (
    <footer className="bg-white shadow absolute bottom-0 w-full dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024 Anik Das Mondal
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <Link onClick={() => setIsHowToPlay(false)}><LightbulbIcon/> How to play</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
