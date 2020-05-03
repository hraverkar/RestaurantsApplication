import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import { throwError, Subject } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public URL = '../../assets/data.json';
  constructor(private httpClient: HttpClient) {}

  getRestroAllData() {
    return this.httpClient
      .get<any>(this.URL, { params: new HttpParams({}), observe: 'response' })
      .pipe(
        retry(3),
        catchError(this.handleError),
        tap((res) => {})
      );
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknow error!;';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error :${error.error.message}`;
    } else {
      errorMessage = `Error : ${error.status} \nMessage :${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
