import { Injectable } from '@angular/core';
import { MapValues } from '../../utils/map-coordinates.utils';
import { MountainsCoordinates } from '../../utils/mountains.utils';
import { TreasureCoordinates } from '../../utils/treasure.utils';
import { Adventurer } from '../../utils/adventurers.utils';

type Rotation = 'D' | 'G';

@Injectable({
  providedIn: 'root'
})
export class FinalConfigurationService {

  relocateAdventurers(
    mapValues: MapValues, 
    mountainsCoordinates: MountainsCoordinates[], 
    treasuresCoordinates: TreasureCoordinates[], 
    adventurersCoordinates: Adventurer[]) {

    const maxMouvements = computeMaxMovements(adventurersCoordinates);
    adventurersCoordinates.forEach((adventurer) => adventurer.treasures = 0);

      for (let i = 0; i < maxMouvements; i++) {
        for (const adventurer of adventurersCoordinates) {

        if (adventurer.movements) {
            if (adventurer.movements[i] === 'A') {

              const adventurerOldPosition = { vertical: adventurer.vertical, horizontal: adventurer.horizontal };
              moveAdventurer(adventurer, mapValues);
              
              for (const mountain of mountainsCoordinates) {

                // If the adventurer is on a mountain, he will return to its previous position
                if (adventurer.vertical === mountain.vertical && adventurer.horizontal === mountain.horizontal) {
                  adventurer.vertical = adventurerOldPosition.vertical;
                  adventurer.horizontal = adventurerOldPosition.horizontal;
                }
              }
              
              for (const treasure of treasuresCoordinates) {
                if (adventurer.vertical === treasure.vertical && adventurer.horizontal === treasure.horizontal) {
                  treasure.quantity--;
                  if(adventurer.treasures !== undefined) {
                    adventurer.treasures++;
                  }
                }
              }
  
            } else if (adventurer.movements[i] === 'D' || adventurer.movements[i] === 'G') {
              rotateAdventurer(adventurer, adventurer.movements[i] as Rotation);
            }
          }

          console.log(adventurer);
        }
      }

      let fileContent = redrawMap(mapValues, mountainsCoordinates, treasuresCoordinates, adventurersCoordinates);

      return fileContent;
    }
  }


const moveAdventurer = (adventurer: Adventurer, mapValues: MapValues) => {
  if (adventurer.orientation === 'N') {
    moveVerticallyOrReturn(adventurer.vertical - 1, adventurer, mapValues);

  } else if (adventurer.orientation === 'S') {
    moveVerticallyOrReturn(adventurer.vertical + 1, adventurer, mapValues);

  } else if (adventurer.orientation === 'E') {
    moveHorizontallyOrReturn(adventurer.horizontal + 1, adventurer, mapValues);

  } else if (adventurer.orientation === 'O') {
    moveHorizontallyOrReturn(adventurer.horizontal - 1, adventurer, mapValues);

  }
}

const moveVerticallyOrReturn = (nextVertical: number, adventurer: Adventurer, mapValues: MapValues) => {
  if(nextVertical < 0 || nextVertical >= mapValues.height) {
    return;
  }

  moveToNextPosition(nextVertical, adventurer.horizontal, adventurer);
}

const moveHorizontallyOrReturn = (nextHorizontal: number, adventurer: Adventurer, mapValues: MapValues) => {
  if(nextHorizontal < 0 || nextHorizontal >= mapValues.width) {
    return;
  }

  moveToNextPosition(adventurer.vertical, nextHorizontal, adventurer);
}

const moveToNextPosition = (nextVertical: number, nextHorizontal: number, adventurer: Adventurer) => {
  adventurer.vertical = nextVertical;
  adventurer.horizontal = nextHorizontal;
}

const rotateAdventurer = (adventurer: Adventurer, movement: Rotation) => {
  if (adventurer.orientation === 'N') {
    if (movement === 'D') {
      adventurer.orientation = 'E';
    } else if (movement === 'G') {
      adventurer.orientation = 'O';
    }
  } else if (adventurer.orientation === 'S') {
    if (movement === 'D') {
      adventurer.orientation = 'O';
    } else if (movement === 'G') {
      adventurer.orientation = 'E';
    }
  } else if (adventurer.orientation === 'E') {
    if (movement === 'D') {
      adventurer.orientation = 'S';
    } else if (movement === 'G') {
      adventurer.orientation = 'N';
    }
  } else if (adventurer.orientation === 'O') {
    if (movement === 'D') {
      adventurer.orientation = 'N';
    } else if (movement === 'G') {
      adventurer.orientation = 'S';
    }
  }
}

const computeMaxMovements =(adventurersCoordinates: Adventurer[]) => {
  let maxMovements = 0;
  for (const adventurer of adventurersCoordinates) {
    if (adventurer.movements) {
      maxMovements = adventurer.movements.length > maxMovements ? adventurer.movements.length : maxMovements;
    }
  }

  return maxMovements;
}

const redrawMap = (mapValues: MapValues, mountainsCoordinates: MountainsCoordinates[], treasuresCoordinates: TreasureCoordinates[], adventurersCoordinates: Adventurer[]) => {
  let fileContent = 'C - ' + mapValues.width + ' - ' + mapValues.height + '\n';
  const mountains = mountainsCoordinates.map((mountain) => 'M - ' + mountain.horizontal + ' - ' + mountain.vertical + '\n').join('');
  fileContent += mountains + '\n';

  const treasures = treasuresCoordinates.map((treasure) => 'T - ' + treasure.horizontal + ' - ' + treasure.vertical + ' - ' + treasure.quantity + '\n').join('');
  fileContent += treasures + '\n';

  const adventurers = adventurersCoordinates.map((adventurer) => 'A - ' + adventurer.name + ' - ' + adventurer.horizontal + ' - ' + adventurer.vertical + ' - ' + adventurer.orientation + ' - ' + adventurer.movements + '\n').join('');
  fileContent += adventurers;
  return fileContent;
}



