import { useEffect, useState } from "react";
import { getRandomChampions } from "./utils";
import { GameBoard } from "./components/GameBoard";
import { Navbar } from "./components/Navbar";
import "./styles/App.css";

interface Champion {
  name: string;
  key: string;
  id: string;
}

const CHAMPIONS_ENDPOINT =
  "http://ddragon.leagueoflegends.com/cdn/13.21.1/data/en_US/champion.json";

export default function Prac() {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [selectedChampions, setSelectedChampions] = useState<Champion[]>([]);
  const [randomChampions, setRandomChampions] = useState<Champion[]>([]);
  const [totalCards, setTotalCards] = useState(3);
  const [selectedCards, setSelectedCards] = useState(1);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(CHAMPIONS_ENDPOINT);
        const data = await response.json();
        const championsData: { [key: string]: Champion } = data.data;
        const championsAndKeys: Champion[] = Object.values(championsData).map(
          (champion) => ({
            key: champion.key,
            name: champion.name,
            id: champion.id,
          })
        );
        setChampions(championsAndKeys);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching: ", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleRandomChampions = () => {
      const randomChampions = getRandomChampions(
        champions,
        selectedChampions,
        totalCards,
        selectedCards
      );
      setRandomChampions(randomChampions);
    };

    handleRandomChampions();
  }, [champions, selectedChampions, totalCards, selectedCards]);

  const handleChampionClick = (champion: Champion) => {
    !selectedChampions.some(
      (selectedChampion) => selectedChampion.key === champion.key
    )
      ? handleWin(champion)
      : handleLose();
  };

  const handleWin = (champion: Champion) => {
    setIsFlipped(true);
    setScore(score + 1);

    setTimeout(() => {
      setSelectedChampions([...selectedChampions, champion]);
      changeDifficulty(score);
    }, 750);

    setTimeout(() => {
      setIsFlipped(false);
    }, 1500);
  };

  const handleLose = () => {
    // Set the states to its Initial Value
    if (score > bestScore) setBestScore(score);
    alert("You Lose!");
    setScore(0);
    setSelectedChampions([]);
    setRandomChampions([]);
    setTotalCards(3);
    setSelectedCards(1);
  };

  const changeDifficulty = (score: number) => {
    switch (score) {
      case 5:
        setTotalCards(4);
        break;
      case 7:
        setSelectedCards(2);
        break;
      case 10:
        setTotalCards(5);
        break;
      case 15:
        setSelectedCards(3);
        break;
      case 20:
        setTotalCards(6);
        break;
      case 25:
        setSelectedCards(4);
        break;
      default:
        break;
    }
  };

  return (
    <div className="main">
      <Navbar score={score} bestScore={bestScore} />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <GameBoard
          randomChampions={randomChampions}
          onCardClick={handleChampionClick}
          isFlipped={isFlipped}
        />
      )}
    </div>
  );
}
