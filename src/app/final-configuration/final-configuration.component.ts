import { ChangeDetectionStrategy, Component, input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-final-configuration',
  imports: [],
  templateUrl: './final-configuration.component.html',
  styleUrl: './final-configuration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinalConfigurationComponent implements OnChanges {
  fileContent = input.required<string>();

  ngOnChanges(changes: SimpleChanges): void {
      console.log(this.fileContent());
  }
}
