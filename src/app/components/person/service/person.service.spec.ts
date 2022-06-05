import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PersonProfile, PersonService } from './person.service';

describe('PersonService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: PersonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PersonService],
    }).compileComponents();
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new PersonService(httpClientSpy);
  });

  it(' - service should be created', () => {
    expect(service).toBeTruthy();
  });

  it(' - api get-person-profile: should return data', (done: DoneFn) => {
    const expected: PersonProfile | null = { title: 'test_title', age: 21, preview_image_url: 'test_url' };

    httpClientSpy.get.and.returnValue(of(expected));

    service.getPersonProfile().subscribe({
      next: (profile: PersonProfile | null) => {
        expect(profile).toEqual(expected);
        done();
      },
      error: done.fail,
    });

    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });

  it(' - api get-person-profile: should throw error', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(null));

    service.getPersonProfile().subscribe({
      next: (profile: PersonProfile | null) => {
        expect(profile).toEqual(null);
        done();
      },
      error: done.fail,
    });
  });

  it(' - api like-person-profile: should return data', (done: DoneFn) => {
    const expected: boolean = false;

    httpClientSpy.post.and.returnValue(of(expected));

    service.likePersonProfile(Math.floor(Math.random() * 10)).subscribe({
      next: (state: boolean) => {
        expect(typeof state === 'boolean').toEqual(true);
        done();
      },
      error: done.fail,
    });
  });

  it(' - api like-person-profile: should throw error', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(of(false));

    service.likePersonProfile(Math.floor(Math.random() * 10)).subscribe({
      next: (state: boolean | null) => {
        expect(state).toEqual(false);
        done();
      },
      error: done.fail,
    });
  });
});
