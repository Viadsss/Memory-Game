interface Champion {
  name: string;
  key: string;
  id: string;
}

export const getRandomChampions = (
  allChampions: Champion[],
  selectedChampions: Champion[],
  count: number,
  selectedCards: number
): Champion[] => {
  if (allChampions.length === 0) {
    return [];
  }

  const randomChampions: Champion[] = [];
  const usedKeys: Set<string> = new Set();

  // Add selected champions based on selectedCards parameter
  for (let i = 0; i < Math.min(selectedCards, selectedChampions.length); i++) {
    const randomIndex = Math.floor(Math.random() * selectedChampions.length);
    const selectedChampion = selectedChampions[randomIndex];
    if (!usedKeys.has(selectedChampion.key)) {
      randomChampions.push(selectedChampion);
      usedKeys.add(selectedChampion.key);
    }
  }

  // Add random champions without duplicates
  while (randomChampions.length < count) {
    const randomIndex = Math.floor(Math.random() * allChampions.length);
    const selectedRandomChampion = allChampions[randomIndex];

    // Check if the champion is not already selected
    if (!usedKeys.has(selectedRandomChampion.key)) {
      randomChampions.push(selectedRandomChampion);
      usedKeys.add(selectedRandomChampion.key);
    }
  }

  // Shuffle the Random Champions
  for (let i = randomChampions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = randomChampions[i];
    randomChampions[i] = randomChampions[j];
    randomChampions[j] = temp;
  }

  return randomChampions;
};

export const getChampionImage = (key: string): string => {
  // 000 is for deafault skin
  const imageSrc = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-tiles/${key}/${key}000.jpg`;
  return imageSrc;
};
