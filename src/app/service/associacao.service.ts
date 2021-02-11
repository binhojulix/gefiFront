import { Injectable } from '@angular/core';
import { Associacao} from '../models/associacao';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


const apiUrl = `${environment.apiUrl}/associacoess`;

@Injectable({
  providedIn: 'root'
})
export class AssociacaoService {

  
  constructor(private http: HttpClient) { }

  //lista todos os Associacoes
  getAssociacoes(): Observable<Associacao[]> {
    return this.http.get<Associacao[]>(apiUrl)
      .pipe(
        tap(associacoes => console.log('leu as associacoes')),
        catchError(this.handleError('getAssociacoes', []))
      );
  }

  //busca Associacao por id
  getAssociacao(id: number): Observable<Associacao> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Associacao>(url).pipe(
      tap(_ => console.log(`leu o Associacao id=${id}`)),
      catchError(this.handleError<Associacao>(`getAssociacao id=${id}`))
    );
  }

  //adiciona um novo Associacao
  addAssociacao (associacao): Observable<Associacao> {
    return this.http.post<Associacao>(apiUrl, associacao, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((associacao: Associacao) => console.log(`adicionado`)),
      catchError(this.handleError<Associacao>('addAssociacao'))
    );
  }

  //atualiza um Associacao
  updateAssociacao(associacao): Observable<any> {
    const url = `${apiUrl}/${associacao.id}`;
    return this.http.put(url, associacao, httpOptions).pipe(
      tap(_ => console.log(`atualizado`)),
      catchError(this.handleError<any>('updateAssociacao'))
    );
  }

  //deleta Associacao
  deleteAssociacao (id): Observable<Associacao> {
    const url = `${apiUrl}/delete/${id}`;
    return this.http.delete<Associacao>(url, httpOptions).pipe(
      tap(_ => console.log(`removido`)),
      catchError(this.handleError<Associacao>('deleteAssociacao'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}