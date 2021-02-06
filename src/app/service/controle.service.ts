import { Injectable } from '@angular/core';
import {Controle} from '../models/controle';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


const apiUrl = `${environment.apiUrl}/controles`;

@Injectable({
  providedIn: 'root'
})
export class ControleService {

  
  constructor(private http: HttpClient) { }

  
  getControles(): Observable<Controle[]> {
    return this.http.get<Controle[]>(apiUrl)
      .pipe(
        tap(controles => console.log('leu os Controles')),
        catchError(this.handleError('getControles', []))
      );
  }

  getControle(id: number): Observable<Controle> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Controle>(url).pipe(
      tap(_ => console.log(`leu o Controle id=${id}`)),
      catchError(this.handleError<Controle>(`getControle id=${id}`))
    );
  }

  addControle (Controle): Observable<Controle> {
    return this.http.post<Controle>(apiUrl, Controle, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((Controle: Controle) => console.log(`adicionou o produto com w/ id=${Controle.id}`)),
      catchError(this.handleError<Controle>('addControle'))
    );
  }

  updateControle(id, Controle): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, Controle, httpOptions).pipe(
      tap(_ => console.log(`atualiza o Controle com id=${id}`)),
      catchError(this.handleError<any>('updateControle'))
    );
  }

  deleteControle (id): Observable<Controle> {
    const url = `${apiUrl}/delete/${id}`;

    return this.http.delete<Controle>(url, httpOptions).pipe(
      tap(_ => console.log(`remove o usuario com id=${id}`)),
      catchError(this.handleError<Controle>('deleteControle'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}