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

  //lista todos os controles
  getControles(): Observable<Controle[]> {
    return this.http.get<Controle[]>(apiUrl)
      .pipe(
        tap(controles => console.log('leu os Controles')),
        catchError(this.handleError('getControles', []))
      );
  }

  getControlesDoUsuario(): Observable<Controle[]> {
    return this.http.get<Controle[]>(apiUrl)
      .pipe(
        tap(controles => console.log('leu os Controles')),
        catchError(this.handleError('getControlesDoUsuario', []))
      );
  }


  getControlesDaArea(): Observable<Controle[]> {
    return this.http.get<Controle[]>(apiUrl)
      .pipe(
        tap(controles => console.log('leu os Controles')),
        catchError(this.handleError('getControlesDaArea', []))
      );
  }

  getControle(id: number): Observable<Controle> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Controle>(url).pipe(
      tap(_ => console.log(`leu o Controle id=${id}`)),
      catchError(this.handleError<Controle>(`getControle id=${id}`))
    );
  }

  //adiciona um novo controle
  addControle (controle): Observable<Controle> {
    return this.http.post<Controle>(apiUrl, controle, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((controle: Controle) => console.log(`adicionou o produto com w/ id=${controle.id}`)),
      catchError(this.handleError<Controle>('addControle'))
    );
  }

  //atualiza um controle
  updateControle(controle): Observable<any> {
    const url = `${apiUrl}/${controle.id}`;
    return this.http.put(url, controle, httpOptions).pipe(
      tap(_ => console.log(`atualiza o Controle com id=${controle.id}`)),
      catchError(this.handleError<any>('updateControle'))
    );
  }

  //deleta controle
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