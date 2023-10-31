import { useEffect, useState } from "react";

interface Champion {
  name: string;
  key: string;
}

const ENDPOINT =
  "http://ddragon.leagueoflegends.com/cdn/13.21.1/data/en_US/champion.json";

export default function App() {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  console.log(champions);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(ENDPOINT);
        const data = await response.json();
        const championsData: { [key: string]: Champion } = data.data;
        const championsAndKeys: Champion[] = Object.values(championsData).map(
          champion => ({
            key: champion.key,
            name: champion.name,
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


  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <ul>
            {champions.map(champion => (
              <li key={champion.key}>{champion.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
