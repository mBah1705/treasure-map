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
});
