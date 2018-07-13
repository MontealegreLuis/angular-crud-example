import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Bike} from '../bike';
import {ActivatedRoute} from '@angular/router';
import {BikesService} from '../bikes.service';

@Component({
    selector: 'app-bike-details',
    templateUrl: './bike-details.component.html',
    styleUrls: ['./bike-details.component.css']
})
export class BikeDetailsComponent implements OnInit {

    @Input() bike: Bike;

    constructor(
        private route: ActivatedRoute,
        private bikesService: BikesService,
        private location: Location
    ) {
    }

    ngOnInit(): void {
        this.getBike();
    }

    getBike(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.bikesService.getBike(id)
            .subscribe(bike => this.bike = bike);
    }

    goBack(): void {
        this.location.back();
    }
}
