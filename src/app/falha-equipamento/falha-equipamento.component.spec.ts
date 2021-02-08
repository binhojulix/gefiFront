import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FalhaEquipamentoComponent } from './falha-equipamento.component';

describe('FalhaEquipamentoComponent', () => {
  let component: FalhaEquipamentoComponent;
  let fixture: ComponentFixture<FalhaEquipamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FalhaEquipamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FalhaEquipamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
