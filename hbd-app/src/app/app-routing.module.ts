import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimelineComponent } from './timeline/timeline.component';
import { GalleryComponent } from './gallery/gallery.component';
import { MainComponent } from './main/main.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ForYouComponent } from './for-you/for-you.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'homepage', component: MainComponent},
  {path: 'timeline', component: TimelineComponent},
  {path: 'gallery', component: GalleryComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'for-you', component: ForYouComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
