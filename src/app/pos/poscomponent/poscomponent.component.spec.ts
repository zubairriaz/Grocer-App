import { ComponentFixture, TestBed, async } from '@angular/core/testing'

import { PoscomponentComponent } from './poscomponent.component'

describe('PoscomponentComponent', () => {
  let component: PoscomponentComponent
  let fixture: ComponentFixture<PoscomponentComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PoscomponentComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(PoscomponentComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
