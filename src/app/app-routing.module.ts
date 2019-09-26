import { RouterModule, Routes } from '@angular/router';

import { HeroComponent } from './pages/hero/hero.component';
import { HeroesComponent } from './pages/heroes/heroes.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {path: 'heroes', component: HeroesComponent},
  {path: 'hero/:id', component: HeroComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'heroes'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
