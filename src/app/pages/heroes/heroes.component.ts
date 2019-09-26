import { Component, OnInit } from '@angular/core';

import { HeroModel } from '../../models/hero.model';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroModel[];
  loading = false;

  constructor(private heroesService: HeroesService) { }

  ngOnInit() {
    this.getHeroes();
  }

  private getHeroes() {
    this.loading = true;
    this.heroesService.getHeroes().subscribe( (res: HeroModel[]) => {
      this.heroes = res;
      this.loading = false;
      console.log('from component', res);
    });
  }

  public deleteHero(hero: HeroModel) {
    Swal.fire({
      title: 'Está seguro?',
      text: 'Eliminando Información de ' + hero.name,
      type: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      allowOutsideClick: false
    }).then( resp => {
      if (resp.value) {
        Swal.fire({
          title: 'Espere',
          text: 'Eliminando Información',
          type: 'info',
          allowOutsideClick: false
        });
        Swal.showLoading();
        let message: string;

        this.heroesService.deleteHero(hero.id).subscribe( resp => {
          message = 'Se ha eliminado el registro con éxito';
          this.setNotification(message);
          this.getHeroes();
          console.log(resp);
        }, err => {
          message = 'algo salió mal al intentar eliminar el registro';
          this.setNotification(message);
          console.log(err);
        });
      }
    });
  }

  private setNotification(message: string) {
    Swal.fire({
      title: 'Eliminando',
      text: message,
      type: 'success'
    });
  }

}
