import React from "react";
import { ChampionCard } from "./ChampionCard";

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
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
      {randomChampions.map((champion) => (
        <div key={champion.key}>
          <ChampionCard
            champion={champion}
            onClick={() => onCardClick(champion)}
            isFlipped={isFlipped}
          />
        </div>
      ))}
    </div>
  );
};
