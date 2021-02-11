import { Injectable } from '@angular/core';
import { Revisao} from '../models/revisao';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


const apiUrl = `${environment.apiUrl}/revisaos`;

@Injectable({
  providedIn: 'root'
})
export class RevisaoService {

  
  constructor(private http: HttpClient) { }

  //lista todos os revisaos
  getRevisoes(): Observable<Revisao[]> {
    return this.http.get<Revisao[]>(apiUrl)
      .pipe(
        tap(revisaos => console.log('leu As revisaos')),
        catchError(this.handleError('getrevisoes', []))
      );
  }

  //busca revisao por id
  getRevisao(id: number): Observable<Revisao> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Revisao>(url).pipe(
      tap(_ => console.log(`leu o revisao id=${id}`)),
      catchError(this.handleError<Revisao>(`getrevisao id=${id}`))
    );
  }

  //adiciona um novo revisao
  addRevisao (revisao): Observable<Revisao> {
    return this.http.post<Revisao>(apiUrl, revisao, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((revisao: Revisao) => console.log(`adicionou o produto com w/ id=${revisao.id}`)),
      catchError(this.handleError<Revisao>('addrevisao'))
    );
  }

  //atualiza um revisao
  updateRevisao(id, revisao): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, revisao, httpOptions).pipe(
      tap(_ => console.log(`atualiza o revisao com id=${id}`)),
      catchError(this.handleError<any>('updaterevisao'))
    );
  }

  //deleta revisao
  deleteRevisao (id): Observable<Revisao> {
    const url = `${apiUrl}/delete/${id}`;
    return this.http.delete<Revisao>(url, httpOptions).pipe(
      tap(_ => console.log(`remove o usuario com id=${id}`)),
      catchError(this.handleError<Revisao>('deleterevisao'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}