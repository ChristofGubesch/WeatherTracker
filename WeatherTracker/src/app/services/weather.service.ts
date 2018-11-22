import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class WeatherService {

  apiKey = 'c06d47f387a2d748c9a2f47bf0352524';

  url = 'http://api.openweathermap.org/data/2.5/forecast?q=';
  constructor(public http: HttpClient) {
  }

  getWeather(city, code) {
    return this.http.get(this.url + city + ',' + code + '&APPID=' + this.apiKey);
  }

}
