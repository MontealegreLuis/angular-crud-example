import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BikesComponent} from './bikes/bikes.component';
import {BikeDetailsComponent} from './bike-details/bike-details.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddBikeComponent } from './add-bike/add-bike.component';

@NgModule({
    declarations: [
        AppComponent,
        BikesComponent,
        BikeDetailsComponent,
        AddBikeComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
