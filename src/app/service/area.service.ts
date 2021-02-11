import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';
import {Area} from '../models/area';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = `${environment.apiUrl}/areas`;



@Injectable({
  providedIn: 'root'
})
export class AreaService {
  constructor(private http: HttpClient) { }


  //lista areas
  getAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(apiUrl)
      .pipe(
        tap(areas => console.log('leu os Areas')),
        catchError(this.handleError('getAreas', []))
      );
  }

  //busca area Por Id
  getArea(id: number): Observable<Area> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Area>(url).pipe(
      tap(_ => console.log(`leu o Area id=${id}`)),
      catchError(this.handleError<Area>(`getArea id=${id}`))
    );
  }

  //adiciona Area
  addArea (Area): Observable<Area> {
    return this.http.post<Area>(apiUrl, Area, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((Area: Area) => console.log(`adicionou o Area com w/ id=${Area.id}`)),
      catchError(this.handleError<Area>('addArea'))
    );
  }

  //atualiza Area
  updateArea(id, Area): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.patch<Area>(url, Area, httpOptions).pipe(
      tap((Area: Area) => console.log(`atualiza o equipamento com id=${id}`)),
      catchError(this.handleError<any>('updateArea'))
    );
  }

  //deleta Area
  deleteArea (id): Observable<Area> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Area>(url, httpOptions).pipe(
      tap(_ => console.log(`remove o Area com id=${id}`)),
      catchError(this.handleError<Area>('deleteArea'))
    );
  }

   
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
  
  
