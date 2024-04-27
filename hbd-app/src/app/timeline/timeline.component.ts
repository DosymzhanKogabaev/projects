import { Component } from '@angular/core';
import { Card, cards } from '../timeline-card/cards'
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent {
  cards = cards
  scrollDown() {
    document.getElementById("cards-list")?.scrollIntoView({behavior:'smooth'});
  }
  scrollUp() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
}
