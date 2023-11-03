import React from "react";
import { ChampionCard } from "./ChampionCard";
import "../styles/GameBoard.css";

interface Champion {
  name: string;
  key: string;
  id: string;
}

interface Props {
  randomChampions: Champion[];
  onCardClick: (champion: Champion) => void;
  isFlipped: boolean;
}

export const GameBoard: React.FC<Props> = ({
  randomChampions,
  onCardClick,
  isFlipped,
}) => {
  return (
    <div className="gameboard glass">
      {randomChampions.map((champion) => (
        <ChampionCard
          champion={champion}
          onClick={() => onCardClick(champion)}
          isFlipped={isFlipped}
          key={champion.key}
        />
      ))}
    </div>
  );
};
