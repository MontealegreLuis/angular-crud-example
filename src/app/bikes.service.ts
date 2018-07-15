import {Injectable} from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {Bike} from './bike';
import {of} from 'rxjs/internal/observable/of';

@Injectable({
    providedIn: 'root'
})
export class BikesService {

    private bikesUrl = 'http://localhost:8000/bikes.php';
    private bikeUrl = 'http://localhost:8000/bike.php';
    private addBikeUrl = 'http://localhost:8000/add-bike.php';

    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(private http: HttpClient) {
    }

    getBikes(): Observable<Bike[]> {
        return this.http.get<Bike[]>(this.bikesUrl, {headers: this.headers})
            .pipe(catchError(this.handleError('getBikes', [])));
    }

    getBike(id: number): Observable<Bike> {
        return this.http.get<Bike>(`${this.bikeUrl}?id=${id}`, {headers: this.headers})
            .pipe(catchError(this.handleError('getBike', null)));
    }

    addBike(bike: Bike): Observable<Bike> {
        return this.http.post(this.addBikeUrl, bike, {headers: this.headers})
            .pipe(catchError(this.handleError('addBike', null)));
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.log(operation, error);
            return of(result as T);
        };
    }
}
