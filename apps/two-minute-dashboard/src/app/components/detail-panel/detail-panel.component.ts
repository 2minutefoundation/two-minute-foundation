import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { animate, state, style, transition, trigger } from '@angular/animations';

const OPEN = 'OPEN';
const CLOSED = 'CLOSED';

@Component({
  selector: 'two-minute-foundation-detail-panel',
  templateUrl: './detail-panel.component.html',
  styleUrls: ['./detail-panel.component.scss'],
  animations: [
    trigger('slideInOut', [
      state(OPEN, style({
        overflow: 'hidden',
        width: '300px'
      })),
      state(CLOSED, style({
        opacity: '0',
        overflow: 'hidden',
        width: '0px'
      })),
      transition(`CLOSED => OPEN`, animate('400ms ease-in-out')),
      transition(`OPEN => CLOSED`, animate('400ms ease-in-out'))
    ])
  ]
})
export class DetailPanelComponent implements OnInit {
  faTimes = faTimes;
  @Input() isOpen = OPEN;
  // @Output() isOpenChange = new EventEmitter<string>()
  constructor() { }

  ngOnInit(): void {
  }

  open() {
    alert('open me')
    this.isOpen = OPEN;
  }

  closeMe() {
    this.isOpen = CLOSED;
    // this.isOpenChange.emit(this.isOpen);
  }
}
