import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferirEquipamentoComponent } from './transferir-equipamento.component';

describe('TransferirEquipamentoComponent', () => {
  let component: TransferirEquipamentoComponent;
  let fixture: ComponentFixture<TransferirEquipamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferirEquipamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferirEquipamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
