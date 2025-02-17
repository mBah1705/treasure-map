import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should return if mapValues is not defined', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.simulateAdventure();
    expect(app.finalFileContent()).toBe('');
  });

  it('should set the finalFileContent signal with the result of the relocateAdventurers method', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.fileContent.set('C - 3 - 4\nM - 1 - 0\nM - 2 - 1\nT - 0 - 3 - 2\nT - 1 - 3 - 3\nA - Lara - 1 - 1 - S - AADADAGGA');
    app.simulateAdventure();
    expect(app.finalFileContent()).toBe(`# {C comme Carte} - {Nb. de case en largeur} - {Nb. de case en hauteur}\nC - 3 - 4\n\n# {M comme Montagne} - {Axe horizontal} - {Axe vertical}\nM - 1 - 0\nM - 2 - 1\n\n# {T comme Trésor} - {Axe horizontal} - {Axe vertical} - {Nb. de trésors restants}\nT - 1 - 3 - 2\n\n# {A comme Aventurier} - {Nom de l’aventurier} - {Axe horizontal} - {Axe vertical} - {Orientation} - {Nb. trésors ramassés}\nA - Lara - 0 - 3 - S - 3\n`);
  });

  it('should call the finalConfigurationService.relocateAdventurers method', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.fileContent.set('C - 3 - 4\nM - 1 - 0\nM - 2 - 1\nT - 0 - 3 - 2\nT - 1 - 3 - 3\nA - Lara - 1 - 1 - S - AADADAGGA');
    
    spyOn(app.finalConfigurationService, 'relocateAdventurers').and.returnValue('fake');
    
    app.simulateAdventure();

    expect(app.finalConfigurationService.relocateAdventurers).toHaveBeenCalled();
  });
});
