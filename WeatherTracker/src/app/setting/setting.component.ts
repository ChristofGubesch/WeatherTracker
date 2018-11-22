import { DatabaseService } from './../services/database.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Router} from '@angular/router';
import { City } from '../model/city';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  city: string;
  code: string;
  cities: City[];

  constructor(private router: Router, private db: DatabaseService) { }

  ngOnInit() {
  }

  async saveForm() {
    const location = {
      city: this.city,
      state: this.code
    };

    localStorage.setItem('location', JSON.stringify(location));
    await this.db.getAll().then(data => {
      this.cities = data.filter(x => x.code === this.code);
    });
    // console.log(this.cities);
    // console.log(this.code);
    // const arr: City[] = this.cities.filter(x => x.code === this.code);
    const arr = this.cities;

    // console.log('array length: ', arr.length);
    // console.log(arr);

    if (arr.length === 0) {
      const c: City = new City();
      c.code = this.code;
      c.name = this.city;
      c.count = 1;
      localStorage.setItem('counter', JSON.stringify(c.count));
      // console.log('add city');
      this.db.addCity(c);
    } else {
      const c: City = arr[0];
      // console.log(c.id);
      c.count++;
      localStorage.setItem('counter', JSON.stringify(c.count));
      this.db.updateCity(c.id, c);
    }
    this.router.navigate(['home']);
  }
}
