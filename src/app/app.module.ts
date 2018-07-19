import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BikesComponent} from './bikes/bikes.component';
import {BikeDetailsComponent} from './bike-details/bike-details.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddBikeComponent} from './add-bike/add-bike.component';
import {JwtModule} from '@auth0/angular-jwt';
import { LoginComponent } from './login/login.component';
import {AuthService} from './auth.service';
import {AuthGuard} from './auth.guard';

export function tokenGetter() {
    return localStorage.getItem('access_token');
}

@NgModule({
    declarations: [
        AppComponent,
        BikesComponent,
        BikeDetailsComponent,
        AddBikeComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        AppRoutingModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: ['localhost:8000'],
                blacklistedRoutes: ['localhost:8000/login.php']
            }
        })
    ],
    providers: [
        AuthService,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
