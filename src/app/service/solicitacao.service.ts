import { Injectable } from '@angular/core';
import { Solicitacao} from '../models/solicitacao';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


const apiUrl = `${environment.apiUrl}/solicitacoes`;

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {

 
  constructor(private http: HttpClient) { }

  //lista todos os Solicitacaos
  getSolicitacoes(): Observable<Solicitacao[]> {
    return this.http.get<Solicitacao[]>(apiUrl)
      .pipe(
        tap(solicitacoes => console.log('leu os Solicitacoes')),
        catchError(this.handleError('getSolicitacoes', []))
      );
  }

  getSolicitacoesByControle(id_controle:Number): Observable<Solicitacao[]> {
    return this.http.get<Solicitacao[]>(apiUrl)
      .pipe(
        tap(solicitacoes => console.log('leu os Solicitacoes')),
        catchError(this.handleError('getSolicitacoes', []))
      );
  }


  getSolicitacaosDoUsuario(): Observable<Solicitacao[]> {
    return this.http.get<Solicitacao[]>(apiUrl)
      .pipe(
        tap(solicitacoes => console.log('leu as Solicitacoes')),
        catchError(this.handleError('getSolicitacaosDoUsuario', []))
      );
  }

  getSolicitacaosDaArea(): Observable<Solicitacao[]> {
    return this.http.get<Solicitacao[]>(apiUrl)
      .pipe(
        tap(solicitacoes => console.log('leu as Solicitacoes')),
        catchError(this.handleError('getSolicitacaoDaArea', []))
      );
  }

  getSolicitacao(id: number): Observable<Solicitacao> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Solicitacao>(url).pipe(
      tap(_ => console.log(`leu a Solicitacao id=${id}`)),
      catchError(this.handleError<Solicitacao>(`getSolicitacao id=${id}`))
    );
  }

  //adiciona um novo Solicitacao
  addSolicitacao (Solicitacao): Observable<Solicitacao> {
    return this.http.post<Solicitacao>(apiUrl, Solicitacao, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((Solicitacao: Solicitacao) => console.log(`adicionou a solicitacao`)),
      catchError(this.handleError<Solicitacao>('addSolicitacao'))
    );
  }

  //atualiza um Solicitacao
  updateSolicitacao(Solicitacao): Observable<any> {
    const url = `${apiUrl}/${Solicitacao.id}`;
    return this.http.put(url, Solicitacao, httpOptions).pipe(
      tap(_ => console.log(`atualiza o Solicitacao`)),
      catchError(this.handleError<any>('updateSolicitacao'))
    );
  }

  //deleta Solicitacao
  deleteSolicitacao (id): Observable<Solicitacao> {
    const url = `${apiUrl}/delete/${id}`;
    return this.http.delete<Solicitacao>(url, httpOptions).pipe(
      tap(_ => console.log(`remove solicitacao`)),
      catchError(this.handleError<Solicitacao>('deleteSolicitacao'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}