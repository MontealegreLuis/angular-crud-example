import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BikesService} from '../bikes.service';
import {first} from 'rxjs/operators';
import {Bike} from '../bike';
import {AuthService} from '../auth.service';

@Component({
    selector: 'app-bike-details',
    templateUrl: './bike-details.component.html',
    styleUrls: ['./bike-details.component.css']
})
export class BikeDetailsComponent implements OnInit {

    bike: Bike;
    editForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private bikesService: BikesService,
        private location: Location,
        private auth: AuthService
    ) {
    }

    ngOnInit(): void {
        this.editForm = this.formBuilder.group({
            id: [],
            model: ['', Validators.required],
            manufacturer: ['', Validators.required]
        });
        this.getBike();
    }

    getBike(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.bikesService.getBike(id)
            .subscribe(bike => {
                this.bike = bike;
                this.editForm.setValue(bike);
            });
    }

    deleteBike(): void {
        this.bikesService.deleteBike(this.bike.id)
            .subscribe(
                data => {
                    this.router.navigate(['bikes']);
                },
                error => {
                    console.error(error);
                });
    }

    onSubmit() {
        this.bikesService.updateBike(this.editForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['bikes']);
                },
                error => {
                    console.error(error);
                });
    }

    goBack(): void {
        this.location.back();
    }
}
