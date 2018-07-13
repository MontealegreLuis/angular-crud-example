import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BikesComponent} from './bikes/bikes.component';
import {BikeDetailsComponent} from './bike-details/bike-details.component';

const routes: Routes = [
    {path: '', redirectTo: '/bikes', pathMatch: 'full'},
    {path: 'detail/:id', component: BikeDetailsComponent},
    {path: 'bikes', component: BikesComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
