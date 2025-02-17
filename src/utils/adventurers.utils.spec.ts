import { extractAdventurers, extractAdventurersCoordinates, findAdventurers, adventurers, Adventurer } from './adventurers.utils';

describe('Adventurers Utils', () => {
    const fileContent = `C - 3 - 4\nA - Lara - 1 - 1 - S - AADADAGGA\nA - John - 2 - 3 - N - AGGDASee#`;

    describe('extractAdventurers', () => {
        it('should extract adventurer lines from file content', () => {
            const result = extractAdventurers(fileContent);
            expect(result).toEqual([
                'A - Lara - 1 - 1 - S - AADADAGGA',
                'A - John - 2 - 3 - N - AGGDASee#'
            ]);
        });
    });

    describe('extractAdventurersCoordinates', () => {
        it('should extract adventurer coordinates from file content', () => {
            const result: Adventurer[] = extractAdventurersCoordinates(fileContent);
            expect(result).toEqual([
                { name: 'Lara', horizontal: 1, vertical: 1, orientation: 'S', movements: 'AADADAGGA' },
                { name: 'John', horizontal: 2, vertical: 3, orientation: 'N', movements: 'AGGDA' }
            ]);
        });

        it('should remove invalid movements from adventurer movements (See#) ', () => {
            const result: Adventurer[] = extractAdventurersCoordinates(fileContent);
            expect(result[1]).toEqual({ name: 'John', horizontal: 2, vertical: 3, orientation: 'N', movements: 'AGGDA' });
        });
    });

    describe('findAdventurers', () => {
        const { isAdventurer, adventurerName, adventurerOrientation, adventurerMovements } = findAdventurers(fileContent);

        it('should find if there is an adventurer at given coordinates', () => {
            expect(isAdventurer(1, 1)).toBe(true);
            expect(isAdventurer(3, 2)).toBe(true);
            expect(isAdventurer(0, 0)).toBe(false);
        });

        it('should return the name of the adventurer at given coordinates', () => {
            expect(adventurerName(1, 1)).toBe('Lara');
            expect(adventurerName(3, 2)).toBe('John');
            expect(adventurerName(0, 0)).toBeUndefined();
        });

        it('should return the orientation of the adventurer at given coordinates', () => {
            expect(adventurerOrientation(1, 1)).toBe('S');
            expect(adventurerOrientation(3, 2)).toBe('N');
            expect(adventurerOrientation(0, 0)).toBeUndefined();
        });

        it('should return the movements of the adventurer at given coordinates', () => {
            expect(adventurerMovements(1, 1)).toBe('AADADAGGA');
            expect(adventurerMovements(3, 2)).toBe('AGGDA');
            expect(adventurerMovements(0, 0)).toBeUndefined();
        });
    });

    describe('adventurers', () => {
        it('should return all adventurers with their coordinates', () => {
            const result: Adventurer[] = adventurers(fileContent);
            expect(result).toEqual([
                { name: 'Lara', horizontal: 1, vertical: 1, orientation: 'S', movements: 'AADADAGGA' },
                { name: 'John', horizontal: 2, vertical: 3, orientation: 'N', movements: 'AGGDA' }
            ]);
        });
    });
});