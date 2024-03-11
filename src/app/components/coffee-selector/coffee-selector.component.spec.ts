import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeSelectorComponent } from './coffee-selector.component';

describe('CoffeeSelectorComponent', () => {
  let component: CoffeeSelectorComponent;
  let fixture: ComponentFixture<CoffeeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoffeeSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoffeeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
