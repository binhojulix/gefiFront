import { Injectable } from '@angular/core';
import { Pendencia} from '../models/Pendencia';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


const apiUrl = `${environment.apiUrl}/pendencias`;
@Injectable({
  providedIn: 'root'
})
export class PendenciaService {
  constructor(private http: HttpClient) { }

  //lista todos os Pendencias
  getPendencias(): Observable<Pendencia[]> {
    return this.http.get<Pendencia[]>(apiUrl)
      .pipe(
        tap(pendencias => console.log('leu os Pendencias')),
        catchError(this.handleError('getPendencias', []))
      );
  }



  getPendenciasDoUsuario(): Observable<Pendencia[]> {
    return this.http.get<Pendencia[]>(apiUrl)
      .pipe(
        tap(pendencias => console.log('leu as Pendencias')),
        catchError(this.handleError('getPendenciasDoUsuario', []))
      );
  }

  getPendenciasDaArea(): Observable<Pendencia[]> {
    return this.http.get<Pendencia[]>(apiUrl)
      .pipe(
        tap(pendencias => console.log('leu as Pendencias')),
        catchError(this.handleError('getPendenciaDaArea', []))
      );
  }

  getPendencia(id: number): Observable<Pendencia> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Pendencia>(url).pipe(
      tap(_ => console.log(`leu a Pendencia id=${id}`)),
      catchError(this.handleError<Pendencia>(`getPendencia id=${id}`))
    );
  }

  getPendenciaPorControleId(controle_id: Number): Observable<Pendencia> {
    const url = `${apiUrl}/controle/${controle_id}`;
    return this.http.get<Pendencia>(url).pipe(
      tap(_ => console.log(`leu a Pendencia id=${controle_id}`)),
      catchError(this.handleError<Pendencia>(`getPendenciaPorControleId controle_id=${controle_id}`))
    );
  }

  //adiciona um novo Pendencia
  addPendencia (pendencia:Pendencia): Observable<Pendencia> {
    return this.http.post<Pendencia>(apiUrl, pendencia, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((pendencia: Pendencia) => console.log(`adicionou a Pendencia`)),
      catchError(this.handleError<Pendencia>('addPendencia'))
    );
  }

  //atualiza um Pendencia
  updatePendencia(pendencia): Observable<any> {
    const url = `${apiUrl}/${pendencia.id}`;
    return this.http.patch(url, pendencia, httpOptions).pipe(
      tap(_ => console.log(`atualiza o Pendencia`)),
      catchError(this.handleError<any>('updatePendencia'))
    );
  }

  //deleta Pendencia
  deletePendencia (id): Observable<Pendencia> {
    const url = `${apiUrl}/delete/${id}`;
    return this.http.delete<Pendencia>(url, httpOptions).pipe(
      tap(_ => console.log(`remove Pendencia`)),
      catchError(this.handleError<Pendencia>('deletePendencia'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}