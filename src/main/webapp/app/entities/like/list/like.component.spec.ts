import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { LikeService } from '../service/like.service';

import { LikeComponent } from './like.component';

describe('Like Management Component', () => {
  let comp: LikeComponent;
  let fixture: ComponentFixture<LikeComponent>;
  let service: LikeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [LikeComponent],
    })
      .overrideTemplate(LikeComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LikeComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(LikeService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.likes?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
