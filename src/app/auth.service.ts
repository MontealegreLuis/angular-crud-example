import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class AuthService {
    loginUrl = 'http://localhost:8000/login.php';

    constructor(private http: HttpClient) {
    }

    login(username: string, password: string): Observable<boolean> {
        return this.http.post<{ token: string }>(
            this.loginUrl,
            {username: username, password: password}
            )
            .pipe(
                map(result => {
                    localStorage.setItem('access_token', result.token);
                    return true;
                })
            );
    }

    logout() {
        localStorage.removeItem('access_token');
    }

    public get loggedIn(): boolean {
        return (localStorage.getItem('access_token') !== null);
    }
}
