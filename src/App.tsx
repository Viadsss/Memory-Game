import { useEffect, useState } from "react";

interface Champion {
  name: string;
  key: string;
  id: string;
}

const CHAMPIONS_ENDPOINT =
  "http://ddragon.leagueoflegends.com/cdn/13.21.1/data/en_US/champion.json";

export default function App() {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div style={{display: "flex", flexWrap: "wrap", gap:"1rem"}}>
            {champions.map((champion) => (
              <div key={champion.key}>
                <h2>{champion.name}</h2>
                <img
                  src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`} // 0 is for Default Skin
                  width={192}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
