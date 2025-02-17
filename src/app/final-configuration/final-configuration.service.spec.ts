import { TestBed } from '@angular/core/testing';

import { FinalConfigurationService } from './final-configuration.service';

describe('FinalConfigurationService', () => {
  let service: FinalConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinalConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should relocate adventurers', () => {
    const mapValues = { height: 3, width: 3 };
    const mountainsCoordinates = [{ vertical: 1, horizontal: 1 }];
    const treasuresCoordinates = [{ vertical: 2, horizontal: 2, quantity: 1 }];
    const adventurersCoordinates = [{ name: 'Lara', vertical: 0, horizontal: 0, orientation: 'S', movements: 'A' }];

    const result = service.relocateAdventurers(mapValues, mountainsCoordinates, treasuresCoordinates, adventurersCoordinates);

    expect(result).toBeDefined();

    expect(result.includes('A - Lara - 0 - 1 - S - 0')).toBeTruthy();
  });

  it('should rotate adventurer to the right', () => {
    const mapValues = { height: 3, width: 3 };
    const mountainsCoordinates = [{ vertical: 1, horizontal: 1 }];
    const treasuresCoordinates = [{ vertical: 2, horizontal: 2, quantity: 1 }];
    const adventurersCoordinates = [{ name: 'Lara', vertical: 0, horizontal: 0, orientation: 'S', movements: 'D' }];

    const result = service.relocateAdventurers(mapValues, mountainsCoordinates, treasuresCoordinates, adventurersCoordinates);

    // Lara should be facing West
    expect(result.includes('A - Lara - 0 - 0 - O - 0')).toBeTruthy();
  });

  it('should rotate adventurer to the left', () => {
    const mapValues = { height: 3, width: 3 };
    const mountainsCoordinates = [{ vertical: 1, horizontal: 1 }];
    const treasuresCoordinates = [{ vertical: 2, horizontal: 2, quantity: 1 }];
    const adventurersCoordinates = [{ name: 'Lara', vertical: 0, horizontal: 0, orientation: 'S', movements: 'G' }];

    const result = service.relocateAdventurers(mapValues, mountainsCoordinates, treasuresCoordinates, adventurersCoordinates);

    // Lara should be facing East
    expect(result.includes('A - Lara - 0 - 0 - E - 0')).toBeTruthy();
  });

  it('should not move adventurer if there is a mountain in front', () => {
    const mapValues = { height: 3, width: 3 };
    const mountainsCoordinates = [{ vertical: 1, horizontal: 1 }];
    const treasuresCoordinates = [{ vertical: 2, horizontal: 2, quantity: 1 }];
    const adventurersCoordinates = [{ name: 'Lara', vertical: 1, horizontal: 0, orientation: 'E', movements: 'A' }];

    const result = service.relocateAdventurers(mapValues, mountainsCoordinates, treasuresCoordinates, adventurersCoordinates);

    // Lara should not move
    expect(result.includes('A - Lara - 0 - 1 - E - 0')).toBeTruthy();
  });

  it('should not move adventurer because another adventurer is already in that position', () => {
    const mapValues = { height: 3, width: 3 };
    const mountainsCoordinates = [{ vertical: 1, horizontal: 1 }];
    const treasuresCoordinates = [{ vertical: 2, horizontal: 2, quantity: 1 }];
    const adventurersCoordinates = [
      { name: 'Lara', vertical: 0, horizontal: 0, orientation: 'E', movements: 'A' },
      { name: 'John', vertical: 0, horizontal: 2, orientation: 'O', movements: 'A' }
    ];

    const result = service.relocateAdventurers(mapValues, mountainsCoordinates, treasuresCoordinates, adventurersCoordinates);

    // Lara should move
    expect(result.includes('A - Lara - 1 - 0 - E - 0')).toBeTruthy();
    
    // John should not move
    expect(result.includes('A - John - 2 - 0 - O - 0')).toBeTruthy();
  });

  it('when the adventurer finds a treasure, he should pick it up', () => {
    const mapValues = { height: 3, width: 3 };
    const mountainsCoordinates = [{ vertical: 1, horizontal: 1 }];
    const treasuresCoordinates = [{ vertical: 1, horizontal: 0, quantity: 1 }];
    const adventurersCoordinates = [{ name: 'Lara', vertical: 1, horizontal: 0, orientation: 'E', movements: 'A' }];

    const result = service.relocateAdventurers(mapValues, mountainsCoordinates, treasuresCoordinates, adventurersCoordinates);

    // Lara should pick up the treasure
    expect(result.includes('A - Lara - 0 - 1 - E - 1')).toBeTruthy();
  });

  it('should not pick up the treasure if there is no treasure in that position', () => {
    const mapValues = { height: 3, width: 3 };
    const mountainsCoordinates = [{ vertical: 1, horizontal: 1 }];
    const treasuresCoordinates = [{ vertical: 1, horizontal: 0, quantity: 1 }];
    const adventurersCoordinates = [{ name: 'Lara', vertical: 1, horizontal: 1, orientation: 'E', movements: 'A' }];

    const result = service.relocateAdventurers(mapValues, mountainsCoordinates, treasuresCoordinates, adventurersCoordinates);

    // Lara should not pick up the treasure
    expect(result.includes('A - Lara - 2 - 1 - E - 0')).toBeTruthy();
  });

  it('should not pick up the treasure if the quantity is 0', () => {
    const mapValues = { height: 3, width: 3 };
    const mountainsCoordinates = [{ vertical: 1, horizontal: 1 }];
    const treasuresCoordinates = [{ vertical: 1, horizontal: 0, quantity: 0 }];
    const adventurersCoordinates = [{ name: 'Lara', vertical: 1, horizontal: 0, orientation: 'E', movements: 'A' }];

    const result = service.relocateAdventurers(mapValues, mountainsCoordinates, treasuresCoordinates, adventurersCoordinates);
    
    // Lara should not pick up the treasure
    expect(result.includes('A - Lara - 0 - 1 - E - 0')).toBeTruthy();
  });

  it('should not pick up a treasure when there is none left in that position', () => {
    const mapValues = { height: 3, width: 3 };
    const mountainsCoordinates = [{ vertical: 1, horizontal: 1 }];
    const treasuresCoordinates = [{ vertical: 1, horizontal: 0, quantity: 1 }];
    const adventurersCoordinates = [
      { name: 'Lara', vertical: 0, horizontal: 0, orientation: 'S', movements: 'AADDA' },
    ];

    const result = service.relocateAdventurers(mapValues, mountainsCoordinates, treasuresCoordinates, adventurersCoordinates);
    
    // Lara should pick up only one treasure evne though she passes through the same position twice
    expect(result.includes('A - Lara - 0 - 1 - N - 1')).toBeTruthy();
  });

  it('the next adventurer should not pick up any treasure because the previous adventurer already picked it up', () => {
    const mapValues = { height: 3, width: 3 };
    const mountainsCoordinates = [{ vertical: 1, horizontal: 1 }];
    const treasuresCoordinates = [{ vertical: 1, horizontal: 0, quantity: 1 }];
    const adventurersCoordinates = [
      { name: 'Lara', vertical: 0, horizontal: 0, orientation: 'S', movements: 'AA' },
      { name: 'John', vertical: 0, horizontal: 1, orientation: 'O', movements: 'AGA' },
    ];

    const result = service.relocateAdventurers(mapValues, mountainsCoordinates, treasuresCoordinates, adventurersCoordinates);
    
    // Lara should pick up the treasure
    expect(result.includes('A - Lara - 0 - 2 - S - 1')).toBeTruthy();

    // John should not pick up the treasure
    expect(result.includes('A - John - 0 - 1 - S - 0')).toBeTruthy();

    // NOTE: there should be no longer a mention of a treasure in the map
    expect(result.includes('T -')).toBeFalsy();
  });

});
