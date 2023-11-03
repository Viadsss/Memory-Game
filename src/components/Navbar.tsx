import LeagueIcon from "../assets/League_Icon.png";
import "../styles/Navbar.css";
import { IconBrandGithub } from "@tabler/icons-react";

export const Navbar = () => {
  return (
    <header>
      <nav className="nav">
        <img src={LeagueIcon} className="icon" />
        <div className="credits">
          Created by
          <a className="link" href="https://bio.link/viads" target="_blank">
            viads <IconBrandGithub />
          </a>
        </div>
      </nav>
    </header>
  );
};
