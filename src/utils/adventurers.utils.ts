export type Adventurer = {
    name: string;
    horizontal: number;
    vertical: number;
    orientation: string;
    movements: string;
    treasures?: number;
}

const extractAdventurers = (fileContent: string) => fileContent.split('\n').filter((line: string) => line.startsWith('A -'));

const extractAdventurersCoordinates = (fileContent: string): Adventurer[] => {
    const adventurerLines = extractAdventurers(fileContent);

    return adventurerLines.map((line: string) => {
        const lineValues = line.split(' - ');
        
        const returnValue =  {
            name: lineValues[1],
            horizontal: parseInt(lineValues[2]),
            vertical: parseInt(lineValues[3]),
            orientation: lineValues[4],
            movements: lineValues[5].trim()
        }

        return returnValue;
    });
}

export const findAdventurers = (fileContent: string) => {
    const treasureCoordinates = extractAdventurersCoordinates(fileContent);
    
    const isAdventurer = (i: number, j: number) => treasureCoordinates.some((adventurer) => adventurer.horizontal === j && adventurer.vertical === i);
    const adventurerName = (i: number, j: number) => treasureCoordinates.find((adventurer) => adventurer.horizontal === j && adventurer.vertical === i)?.name;
    const adventurerOrientation = (i: number, j: number) => treasureCoordinates.find((adventurer) => adventurer.horizontal === j && adventurer.vertical === i)?.orientation;
    const adventurerMovements = (i: number, j: number) => treasureCoordinates.find((adventurer) => adventurer.horizontal === j && adventurer.vertical === i)?.movements;
    
    return { isAdventurer, adventurerName, adventurerOrientation, adventurerMovements };
}

export const adventurers = (fileContent: string) => extractAdventurersCoordinates(fileContent);