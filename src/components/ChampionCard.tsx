import React from "react";
import { getChampionImage } from "../utils";
import BackCardImg from "../assets/Back_Card.jpg";
import "../stylings/card.css";

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
      <img
        src={getChampionImage(champion.key)}
        className={`card-front ${isFlipped ? "flipped" : ""}`}
      />
      <img
        src={BackCardImg}
        className={`card-back ${isFlipped ? "flipped" : ""}`}
      />
    </div>
  );
};
