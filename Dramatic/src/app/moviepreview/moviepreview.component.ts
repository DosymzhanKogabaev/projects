import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-moviepreview',
  templateUrl: './moviepreview.component.html',
  styleUrls: ['./moviepreview.component.css']
})
export class MoviepreviewComponent {
  @Input() movie: any;
}
