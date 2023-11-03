import LeagueIcon from "../assets/League_Icon.png";
import "../styles/Navbar.css";
import { IconBrandGithub } from "@tabler/icons-react";

import React from "react";

interface Props {
  score: number;
  bestScore: number;
}

export const Navbar: React.FC<Props> = ({ score, bestScore }) => {
  return (
    <header>
      <nav className="nav">
        <div className="icon-credits">
          <img src={LeagueIcon} className="icon" />
          <div className="credits">
            Created by
            <a className="link" href="https://bio.link/viads" target="_blank">
              viads <IconBrandGithub />
            </a>
          </div>
        </div>
        <div className="scoreboard">
          <div className="current-score">Score: {score}</div>
          <div className="best-score">Best Score: {bestScore}</div>
        </div>
      </nav>
    </header>
  );
};
