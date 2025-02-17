import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalConfigurationComponent } from './final-configuration.component';
import { FinalConfigurationService } from './final-configuration.service';

describe('FinalConfigurationComponent', () => {
  let component: FinalConfigurationComponent;
  let fixture: ComponentFixture<FinalConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalConfigurationComponent],
      providers: [FinalConfigurationService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalConfigurationComponent);
    fixture.componentRef.setInput('fileContent', 'test');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the map on changes to "Map not found" because there is no map', () => {
    expect(component.map()).toBe('Map not found');
  });

  it('should set the fileUrl on changes to a blob URL', () => {
    expect(component.fileUrl).toBeDefined();
  });
});
