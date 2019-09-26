import { HeroModel } from '../models/hero.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://fir-heroes-52088.firebaseio.com';

  constructor(private httpClient: HttpClient) { }

  createHero(hero: HeroModel) {
    return this.httpClient.post(`${this.url}/heroes.json`, hero).pipe(
      map( (resp: any) => {
        hero.id = resp.name;
        return hero;
      })
    );
  }

  updateHero(hero: HeroModel) {
    const tempHero = {
      ...hero
    };
    delete tempHero.id;
    return this.httpClient.put(`${this.url}/heroes/${hero.id}.json`, tempHero);
  }

  getHeroes() {
    return this.httpClient.get(`${this.url}/heroes.json`).pipe(
      map(
        // (resp ) => {
        // console.log('!!!', resp);
        // this.createHeroesArray(resp);
        this.createHeroesArray
        )
      );
  }

  private createHeroesArray( heroesObj: object) {
    const heroes: HeroModel[] = [];

    if ( heroesObj === null) { return []; }

    Object.keys(heroesObj).forEach(key => {
      const hero: HeroModel = heroesObj[key];
      hero.id = key;
      console.log(hero);
      heroes.push(hero);
    });
    console.log(heroes);
    return heroes;
  }

  getHeroById(id: string) {
    return this.httpClient.get(`${this.url}/heroes/${id}.json`);
  }

  deleteHero(id: string) {
    return this.httpClient.delete(`${this.url}/heroes/${id}.json`);

  }
}
