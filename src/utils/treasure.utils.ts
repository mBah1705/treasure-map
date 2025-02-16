export type TreasureCoordinates = {
    horizontal: number;
    vertical: number;
    quantity: number;
}

const extractTreasures = (fileContent: string) => fileContent.split('\n').filter((line: string) => line.startsWith('T -'));

export const extractTreasuresCoordinates = (fileContent: string): TreasureCoordinates[] => {
    const treasureLines = extractTreasures(fileContent);

    return treasureLines.map((line: string) => {
        const lineValues = line.split(' - ');
        return {
            horizontal: parseInt(lineValues[1]),
            vertical: parseInt(lineValues[2]),
            quantity: parseInt(lineValues[3])
        }
    });
}


export const findTreasure = (fileContent: string) => {
    const treasureCoordinates = extractTreasuresCoordinates(fileContent);
    const isTreasure = (i: number, j: number) => treasureCoordinates.some((treasure) => treasure.horizontal === j && treasure.vertical === i);
    const treasureQuantity = (i: number, j: number) => treasureCoordinates.find((treasure) => treasure.horizontal === j && treasure.vertical === i)?.quantity;
    return { isTreasure, treasureQuantity };
  }