import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { TvShowComponent } from './tv-show/tv-show.component';
import { MoviesComponent } from './movies/movies.component';
import { NewComponent } from './new/new.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'home', component: MainComponent},
  {path: 'tv-show', component: TvShowComponent},
  {path: 'movies', component: MoviesComponent},
  {path: 'new', component: NewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
