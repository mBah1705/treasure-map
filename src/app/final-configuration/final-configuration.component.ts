import { ChangeDetectionStrategy, Component, inject, input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { drawMap, mapNotFound } from '../../utils/map.utils';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-final-configuration',
  imports: [],
  templateUrl: './final-configuration.component.html',
  styleUrl: './final-configuration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinalConfigurationComponent implements OnChanges {
  fileContent = input.required<string>();
  map = signal<string>('');
  mapNotFound = mapNotFound;
  fileUrl: unknown;

  sanitizer = inject(DomSanitizer);
  
  
  ngOnChanges(changes: SimpleChanges): void {
    this.map.set(drawMap(this.fileContent()));
    console.log(this.fileContent());
    const blob = new Blob([this.fileContent()], { type: 'text/plain' });
    this.fileUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
  }
}
