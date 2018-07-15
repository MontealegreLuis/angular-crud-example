import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {BikesService} from '../bikes.service';

@Component({
    selector: 'app-add-bike',
    templateUrl: './add-bike.component.html',
    styleUrls: ['./add-bike.component.css']
})
export class AddBikeComponent implements OnInit {

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private bikesService: BikesService
    ) {
    }

    addForm: FormGroup;

    ngOnInit() {
        this.addForm = this.formBuilder.group({
            id: [],
            model: ['', Validators.required],
            manufacturer: ['', Validators.required],
        });

    }

    onSubmit() {
        this.bikesService.addBike(this.addForm.value)
            .subscribe(data => {
                this.router.navigate(['bikes']);
            });
    }
}
