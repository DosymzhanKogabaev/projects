import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-timeline-card',
  templateUrl: './timeline-card.component.html',
  styleUrls: ['./timeline-card.component.css']
})
export class TimelineCardComponent {
  @Input() card: any;
}
