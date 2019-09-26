import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { HeroModel } from '../../models/hero.model';
import { HeroesService } from '../../services/heroes.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  hero = new HeroModel();

  constructor(private heroesService: HeroesService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
              }

  ngOnInit() {

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== 'new') {
      this.heroesService.getHeroById(id).subscribe( (resp: HeroModel) => {
        this.hero = resp;
        this.hero.id = id;
        console.log(resp);
      });
    }
    console.log(id);
  }

  save(form: NgForm) {
    if (form.invalid) {
      console.log('formulario no válido');
      return; }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando Información',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let petition: Observable<any>;
    let message: string;
    if (this.hero.id) {
      petition = this.heroesService.updateHero(this.hero);
      message = 'Se actualizó correctamente';
    } else {
      petition = this.heroesService.createHero(this.hero);
      message = 'Se creó el héroe correctamente';
    }

    petition.subscribe(res => {
      Swal.fire({
        title: this.hero.name,
        text: message,
        type: 'success'
      });
      this.router.navigateByUrl('/heroes');

    }, err => {
      console.log(err);
    });
  }

}
