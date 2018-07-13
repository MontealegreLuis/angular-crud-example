import {Component, OnInit} from '@angular/core';
import {BikesService} from "../bikes.service";
import {Bike} from "../bike";

@Component({
  selector: 'app-bikes',
  templateUrl: './bikes.component.html',
  styleUrls: ['./bikes.component.css']
})
export class BikesComponent implements OnInit {
  bikes: Bike[];

  constructor(private bikeService: BikesService) {
  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.bikeService.getBikes()
      .subscribe(bikes => this.bikes = bikes);
  }

}
