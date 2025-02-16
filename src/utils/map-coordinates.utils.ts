export type MapValues = {
  width: number;
  height: number;
}

const findMap = (fileContent: string) =>  fileContent.split('\n').find((line: string) => line.startsWith('C -'));

export const extractMap = (fileContent: string): MapValues | undefined => {
  const mapLine = findMap(fileContent);

  if (!mapLine) {
    return;
  }

  const mapLineValues = mapLine.split(' - ');
  return {
    width: parseInt(mapLineValues[1]),
    height: parseInt(mapLineValues[2])
  };
}