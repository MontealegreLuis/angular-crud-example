import {Injectable} from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {catchError} from "rxjs/operators";
import {Observable} from "rxjs/internal/Observable";
import {Bike} from './bike'
import {of} from "rxjs/internal/observable/of";

@Injectable({
  providedIn: 'root'
})
export class BikesService {

  constructor(private http: HttpClient) {
  }

  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  private bikesUrl = 'http://localhost:8000/bikes.php';

  getBikes(): Observable<Bike[]> {
    return this.http.get<Bike[]>(this.bikesUrl, {headers: this.headers})
      .pipe(catchError(this.handleError('getBikes', [])))
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(operation, error);
      return of(result as T);
    };
  }
}
