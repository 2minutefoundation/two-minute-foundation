import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faBars, faChartBar, faMap } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'two-minute-foundation-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  faBars = faBars;
  faChartBar = faChartBar;
  faMap = faMap;

  @Output() toggleSide = new EventEmitter();
  @Output() toggleDetail = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  toggleSideBar() {
    this.toggleSide.emit();
  }

  toggleDetailBar() {
    this.toggleDetail.emit();
  }
}
