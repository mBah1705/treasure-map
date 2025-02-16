import { Adventurer, findAdventurers } from "./adventurers.utils";
import { extractMap, MapValues } from "./map-coordinates.utils";
import { findMountains, MountainsCoordinates } from "./mountains.utils";
import { findTreasure, TreasureCoordinates } from "./treasure.utils";

export const drawMap = (fileContent: string) => {
  const mapValues = extractMap(fileContent);

  if (!mapValues) {
    return mapNotFound;
  }
  
  const isMountain = findMountains(fileContent);
  
  const { isTreasure, treasureQuantity } = findTreasure(fileContent);

  const { isAdventurer, adventurerName } = findAdventurers(fileContent);
  
  
  let drawing = '';
  
  for (let i = 0; i < mapValues.height; i++) {
    for (let j = 0; j < mapValues.width; j++) {
      let item = '';
      if (!isMountain(i, j) && !isTreasure(i, j) && !isAdventurer(i, j)) {
        item = '. ';
      } else if (isMountain(i, j)) {
        item = 'M ';
      } else if (isTreasure(i, j)) {
        item = `T(${treasureQuantity(i, j)}) `;
      } else if (isAdventurer(i, j)) {
        item = `A(${adventurerName(i, j)}) `;
      } 

      // To space the items correctly, max length of item is 15 though
      const spacingLeft = 15 - item.length;

      drawing += item + ' '.repeat(spacingLeft);
    }
    drawing += '\n';
    drawing += '\n';
  }
  

  return drawing;    
}

export const mapNotFound = 'Map not found';

