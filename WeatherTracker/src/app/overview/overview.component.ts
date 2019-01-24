import { Router } from '@angular/router';
import { AuthentificationService } from './../services/authentification.service';
import { Component, OnInit } from '@angular/core';
import {WeatherService} from '../services/weather.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  image: string;
  location = {
    city:  'london',
    code: 'uk'
  };
  weather: any;
  value: any;
  counter: any;
  temp: any;
  maxTemp: any;
  minTemp: any;
  citycode: any;
  views: any;


  constructor(private authentificationService: AuthentificationService, private router: Router, private weatherService: WeatherService) { }

  ngOnInit() {
    this.value = localStorage.getItem('location');

    if (this.value != null) {
        this.location = JSON.parse(this.value);
    } else {
      this.location = {
        city: 'london',
        code: 'uk'
      };
    }
    this.counter = localStorage.getItem('counter');
    // console.log(this.counter);

    this.weatherService.getWeather(this.location.city, this.location.code).subscribe(
    data => {
      this.weather = data;
      this.temp = (this.weather.list[0].main.temp - 273.15).toString().substring(0, 4);
      this.maxTemp = (this.weather.list[0].main.temp_max - 273.15).toString().substring(0, 4);
      this.minTemp = (this.weather.list[0].main.temp_min - 273.15).toString().substring(0, 4);
    }
    );
  }

  getCounter() {
    this.weatherService.getCount(this.citycode).subscribe( data => {
      console.log(this.citycode);
      console.log(data);
      this.views = data;
      /*if (this.views) {
        this.views = 0;
      }*/
    });
  }

  navigateLogin() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
