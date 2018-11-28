import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { City } from '../model/city';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  cities: AngularFirestoreCollection;
  private city: AngularFirestoreDocument;

  constructor(private db: AngularFirestore) {
    this.cities = this.db.collection('cities');
  }

  addCity(city: City) {
    this.cities.add(JSON.parse(JSON.stringify(city)));
  }

  async getAll() {
    const cities: City[] = [];

    await this.cities.ref.get().then((snap) => {
      snap.forEach(doc => {
          const city = new City();
          city.code = doc.data().code;
          city.name = doc.data().name;
          city.count = doc.data().count;
          city.id = doc.id;
          cities.push(city);
      });
    });
    // console.log(cities);
    return cities;
  }

  updateCity(id, update: City) {
    this.city = this.db.doc<any>(`cities/${id}`);
    this.city.update(JSON.parse(JSON.stringify(update)));
  }

}
