import React from "react";
import { getChampionImage } from "../utils";
import BackCardImg from "../assets/Back_Card.jpg";
import "../styles/card.css";

interface Champion {
  name: string;
  key: string;
  id: string;
}

interface Props {
  champion: Champion;
  onClick: () => void;
  isFlipped: boolean;
}

export const ChampionCard: React.FC<Props> = ({
  champion,
  onClick,
  isFlipped,
}) => {
  return (
    <div className="card" onClick={onClick}>
      <div className={`card-front ${isFlipped ? "flipped" : ""}`}>
        <img src={getChampionImage(champion.key)} className="card-front-img" />
        <div className="card-name-container">
          <span className="card-name">{champion.name}</span>
        </div>
      </div>
      <img
        src={BackCardImg}
        className={`card-back ${isFlipped ? "flipped" : ""}`}
      />
    </div>
  );
};
