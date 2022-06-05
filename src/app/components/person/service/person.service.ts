import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

export interface PersonProfile {
  title: string;
  preview_image_url: string;
  age: number;
}

@Injectable()
export class PersonService {
  constructor(private http: HttpClient) {}

  public getPersonProfile(): Observable<PersonProfile | null> {
    return this.http.get<PersonProfile | null>('http://localhost:3000/get-person-profile').pipe(catchError(() => of(null)));
  }

  public likePersonProfile(userId: number): Observable<boolean> {
    return this.http.post<boolean>('http://localhost:3000/like-person-profile', { user_id: userId }).pipe(catchError(() => of(false)));
  }
}
