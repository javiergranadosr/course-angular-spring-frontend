import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Client } from '../interfaces/client';
import { environment } from '../../environments/environment';
import Swal from 'sweetalert2';
import { ErrorResponse } from '../interfaces/error-response';
import { Router } from '@angular/router';
import { SuccessResponse } from '../interfaces/success-response';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private API_URL: string = environment.API_URL;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) {}

  public getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.API_URL}/clients`);
  }

  public createClient(client: Client): Observable<SuccessResponse> {
    return this.http
      .post<SuccessResponse>(`${this.API_URL}/clients`, client, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((err) => {
          if (err.status === 400) {
            return throwError(() => err.error.errors as string[]);
          }
          const responseErr: ErrorResponse = err.error;
          Swal.fire('Error in create', responseErr.message, 'error');
          return throwError(() => responseErr);
        })
      );
  }

  public getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.API_URL}/clients/${id}`).pipe(
      catchError(({ error }) => {
        const err: ErrorResponse = error;
        this.router.navigateByUrl('/clients');
        Swal.fire('Error in findById', err.message, 'error');
        return throwError(() => err);
      })
    );
  }

  public updateClient(client: Client, id: number): Observable<SuccessResponse> {
    return this.http
      .put<SuccessResponse>(`${this.API_URL}/clients/${id}`, client, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((err) => {
          if (err.status === 400) {
            return throwError(() => err.error.errors as string[]);
          }
          const responseErr: ErrorResponse = err.error;
          Swal.fire('Error in update', responseErr.message, 'error');
          return throwError(() => err);
        })
      );
  }

  public deleteClient(id: number): Observable<SuccessResponse> {
    return this.http
      .delete<SuccessResponse>(`${this.API_URL}/clients/${id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError(({ error }) => {
          const err: ErrorResponse = error;
          Swal.fire('Error in delete', err.message, 'error');
          return throwError(() => err);
        })
      );
  }
}
