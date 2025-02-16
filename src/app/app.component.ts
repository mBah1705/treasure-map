import { Component, inject, signal } from '@angular/core';
import { drawMap, mapNotFound } from '../utils/map.utils';
import { Adventurer, adventurers } from '../utils/adventurers.utils';
import { FinalConfigurationComponent } from "./final-configuration/final-configuration.component";
import { extractMap } from '../utils/map-coordinates.utils';
import { extractMountainsCoordinates } from '../utils/mountains.utils';
import { extractTreasuresCoordinates } from '../utils/treasure.utils';
import { FinalConfigurationService } from './final-configuration/final-configuration.service';

@Component({
  selector: 'app-root',
  imports: [FinalConfigurationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  map = signal<string>('');
  mapNotFound = mapNotFound;
  fileContent = signal<string>('');
  finalFileContent = signal<string>('');

  adventurers = signal<Adventurer[]>([]);

  finalConfigurationService = inject(FinalConfigurationService);

  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
        this.fileContent.set(e.target.result);
        this.map.set(drawMap(e.target.result));
        this.adventurers.set(adventurers(e.target.result));
    };

    reader.readAsText(file);
  }

  simulateAdventure() {
    const mapValues = extractMap(this.fileContent());
        const mountainsCoordinates = extractMountainsCoordinates(this.fileContent());
        const treasuresCoordinates = extractTreasuresCoordinates(this.fileContent());
        const extractAdventurersCoordinates = adventurers(this.fileContent());
    
        if (!mapValues) {
          return;
        }
    
        this.finalFileContent.set(
          this.finalConfigurationService.relocateAdventurers(mapValues, mountainsCoordinates, treasuresCoordinates, extractAdventurersCoordinates)
        );
  }
}
