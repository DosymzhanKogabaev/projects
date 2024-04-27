import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopbarComponent } from './topbar/topbar.component';
import { TimelineComponent } from './timeline/timeline.component';
import { GalleryComponent } from './gallery/gallery.component';
import { MainComponent } from './main/main.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ForYouComponent } from './for-you/for-you.component';
import { TimelineCardComponent } from './timeline-card/timeline-card.component';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    TimelineComponent,
    GalleryComponent,
    MainComponent,
    AboutUsComponent,
    ForYouComponent,
    TimelineCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
