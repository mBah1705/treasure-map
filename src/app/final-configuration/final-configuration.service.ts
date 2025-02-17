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

    // Calculate the maximum number of movements for all adventurers to iterate over, as they are alternating
    const maxMouvements = computeMaxMovements(adventurersCoordinates);

    // Set the treasures for each adventurer to 0, as they will be incremented when they find a treasure
    adventurersCoordinates.forEach((adventurer) => adventurer.treasures = 0);

      for (let i = 0; i < maxMouvements; i++) {
        for (const [index, adventurer] of adventurersCoordinates.entries()) {

        if (adventurer.movements) {
            if (adventurer.movements[i] === 'A') {

              const adventurerOldPosition = { vertical: adventurer.vertical, horizontal: adventurer.horizontal };
              advanceAdventurer(adventurer, mapValues);

              // Calculating the previous adventurer position
              const previousAdventurerPosition = index > 0 ? 
              { vertical: adventurersCoordinates[index -1].vertical, horizontal: adventurersCoordinates[index -1].horizontal } : 
              null;
              
              // If the adventurer is on the same position as the previous adventurer, he will return to his old position
              if(previousAdventurerPosition?.vertical === adventurer.vertical && previousAdventurerPosition?.horizontal === adventurer.horizontal) {
                adventurer.vertical = adventurerOldPosition.vertical;
                adventurer.horizontal = adventurerOldPosition.horizontal;
              }
              
              for (const mountain of mountainsCoordinates) {

                // If the adventurer is on a mountain, he will return to his old position
                if (adventurer.vertical === mountain.vertical && adventurer.horizontal === mountain.horizontal) {
                  adventurer.vertical = adventurerOldPosition.vertical;
                  adventurer.horizontal = adventurerOldPosition.horizontal;
                }
              }
              
              for (const treasure of treasuresCoordinates) {
                if (adventurer.vertical === treasure.vertical && adventurer.horizontal === treasure.horizontal) {
                  if (treasure.quantity > 0) {
                    treasure.quantity--;
                    
                    if(adventurer.treasures !== undefined) {
                      adventurer.treasures++;
                    }
                  }
                }
              }
  
            } else if (adventurer.movements[i] === 'D' || adventurer.movements[i] === 'G') {
              rotateAdventurer(adventurer, adventurer.movements[i] as Rotation);
            }
          }
        }
      }

      return redrawMap(mapValues, mountainsCoordinates, treasuresCoordinates, adventurersCoordinates);
    }
  }


const advanceAdventurer = (adventurer: Adventurer, mapValues: MapValues) => {
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
  let fileContent = '# {C comme Carte} - {Nb. de case en largeur} - {Nb. de case en hauteur}\n';
  fileContent += 'C - ' + mapValues.width + ' - ' + mapValues.height + '\n' + '\n';

  fileContent += '# {M comme Montagne} - {Axe horizontal} - {Axe vertical}\n';
  const mountains = mountainsCoordinates.map((mountain) => 'M - ' + mountain.horizontal + ' - ' + mountain.vertical + '\n').join('');
  fileContent += mountains + '\n';

  fileContent += '# {T comme Trésor} - {Axe horizontal} - {Axe vertical} - {Nb. de trésors restants}\n';
  const treasures = treasuresCoordinates.map((treasure) => {
    if(treasure.quantity === 0) {
      return;
    }
    
    return ('T - ' + treasure.horizontal + ' - ' + treasure.vertical + ' - ' + treasure.quantity  + '\n')
  }).join('');


  fileContent += treasures + '\n';
  
  fileContent += '# {A comme Aventurier} - {Nom de l’aventurier} - {Axe horizontal} - {Axe vertical} - {Orientation} - {Nb. trésors ramassés}\n';
  const adventurers = adventurersCoordinates.map(
    (adventurer) => 'A - ' + adventurer.name + ' - ' + adventurer.horizontal + ' - ' + 
    adventurer.vertical + ' - ' + adventurer.orientation + ' - ' + (adventurer.treasures ? adventurer.treasures : '0') + '\n').join('');
  fileContent += adventurers;
  return fileContent;
}



