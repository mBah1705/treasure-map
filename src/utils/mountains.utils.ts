export type MountainsCoordinates = {
  horizontal: number;
  vertical: number;
}

const extractMountains = (fileContent: string) => fileContent.split('\n').filter((line: string) => line.startsWith('M -'));

export const extractMountainsCoordinates = (fileContent: string): MountainsCoordinates[] => {
  const mountainLines = extractMountains(fileContent);

  return mountainLines.map((line: string) => {
    const lineValues = line.split(' - ');
    return {
      horizontal: parseInt(lineValues[1]),
      vertical: parseInt(lineValues[2])
    }
  });
};


export const findMountains = (fileContent: string) => {
  const mountainsCoordinates = extractMountainsCoordinates(fileContent);
  const isMountain = (i: number, j: number) => mountainsCoordinates.some((mountain) => mountain.horizontal === j && mountain.vertical === i);
  return isMountain;
}