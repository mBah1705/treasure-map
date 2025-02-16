import { drawMap, mapNotFound } from './map.utils';

describe('drawMap', () => {
    it('should return "Map not found" if map values are not extracted', () => {
        const result = drawMap('invalid content');
        expect(result).toBe(mapNotFound);
    });

    it('should draw an empty map correctly', () => {
        const result = drawMap('C - 2 - 2');
        const expectedDrawing = '.              .              \n\n.              .              \n\n';
        expect(result).toBe(expectedDrawing);
    });

    it('should draw a map with mountains correctly', () => {
        const result = drawMap('C - 2 - 2' + '\n' + 'M - 1 - 0');
        const expectedDrawing = '.              M              \n\n.              .              \n\n';
        expect(result).toBe(expectedDrawing);
    });

    it('should draw a map with treasures correctly', () => {
        const result = drawMap('C - 2 - 2' + '\n' + 'T - 0 - 1 - 3');
        const expectedDrawing = '.              .              \n\nT(3)           .              \n\n';
        expect(result).toBe(expectedDrawing);
    });

    it('should draw a map with adventurers correctly', () => {
        const result = drawMap('C - 2 - 2' + '\n' + 'A - John - 0 - 0 - S - AAD');
        const expectedDrawing = 'A(John)        .              \n\n.              .              \n\n';
        expect(result).toBe(expectedDrawing);
    });

    it('should draw a map with mountains, treasures and adventurers correctly', () => {
        const result = drawMap('C - 2 - 2' + '\n' + 'M - 1 - 0' + '\n' + 'T - 0 - 1 - 3' + '\n' + 'A - John - 0 - 0 - S - AAD');
        const expectedDrawing = 'A(John)        M              \n\nT(3)           .              \n\n';
        expect(result).toBe(expectedDrawing);
    });

    it('should draw a map with only one mountain because several moutains in the file are located on the same spot', () => {
        const result = drawMap('C - 2 - 2' + '\n' + 'M - 1 - 0' + '\n' + 'M - 1 - 0');
        const expectedDrawing = '.              M              \n\n.              .              \n\n';
        expect(result).toBe(expectedDrawing);
    });

    it('should draw a map with only one treasure (the first one) because several treasures in the file are located on the same spot', () => {
        const result = drawMap('C - 2 - 2' + '\n' + 'T - 0 - 1 - 3' + '\n' + 'T - 0 - 1 - 5');
        const expectedDrawing = '.              .              \n\nT(3)           .              \n\n';
        expect(result).toBe(expectedDrawing);
    });

    it('should draw a map with only one adventurer because several adventurers in the file are located on the same spot', () => {
        const result = drawMap('C - 2 - 2' + '\n' + 'A - John - 0 - 0 - S - AAD' + '\n' + 'A - Jane - 0 - 0 - S - AAD');
        const expectedDrawing = 'A(John)        .              \n\n.              .              \n\n';
        expect(result).toBe(expectedDrawing);
    });

    it('should draw a map with the mountain, even when a treasure and an adventurer are located on the same spot', () => {
        const result = drawMap('C - 2 - 2' + '\n' + 'M - 0 - 0' + '\n' + 'T - 0 - 0 - 3' + '\n' + 'A - John - 0 - 0 - S - AAD');
        // Nootice the sapcing between the items
        const expectedDrawing = 'M              .              \n\n.              .              \n\n';
        expect(result).toBe(expectedDrawing);
    });
});