import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MapItem } from '../../models/map-item.model';
import { DashBoardData } from '../../models/dashboard-data.model';

const OPEN = 'OPEN';
const CLOSED = 'CLOSED';

// export var single = [
//   {
//     "name": "Germany",
//     "value": 8940000
//   },
//   {
//     "name": "USA",
//     "value": 5000000
//   },
//   {
//     "name": "France",
//     "value": 7200000
//   },
//   {
//     "name": "UK",
//     "value": 6200000
//   }
// ];

// export var single2 = [
//   {
//     "name": "Germany1",
//     "value": 8940000
//   },
//   {
//     "name": "USA1",
//     "value": 5000000
//   },
//   {
//     "name": "France1",
//     "value": 7200000
//   },
//   {
//     "name": "UK1",
//     "value": 6200000
//   }
// ];

@Component({
  selector: 'two-minute-foundation-detail-panel',
  templateUrl: './detail-panel.component.html',
  styleUrls: ['./detail-panel.component.scss'],
  animations: [
    trigger('slideInOut', [
      state(OPEN, style({
        overflow: 'hidden',
        width: '400px'
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
  @Output() isOpenChange = new EventEmitter<string>();
  @Input() selectedMapItem: MapItem;

  // single = [
  //   {
  //     "name": "Germany",
  //     "value": 8940000
  //   },
  //   {
  //     "name": "USA",
  //     "value": 5000000
  //   },
  //   {
  //     "name": "France",
  //     "value": 7200000
  //   },
  //   {
  //     "name": "UK",
  //     "value": 6200000
  //   }
  // ];

  _dashBoardData: DashBoardData;
  get dashBoardData(): DashBoardData {
    return this._dashBoardData;
  }

  @Input() set dashBoardData(value: DashBoardData) {
    // alert('dashBoardData: ' + JSON.stringify(value));
    if (value) {

      this.single = value.litterSummaryChartData;

      // this.single = [
      //   {
      //     "name": "Germany22",
      //     "value": 1940000
      //   },
      //   {
      //     "name": "USA22",
      //     "value": 2000000
      //   },
      //   {
      //     "name": "France22",
      //     "value": 5200000
      //   },
      //   {
      //     "name": "UK222",
      //     "value": 3200000
      //   }
      // ];
    }
  }

  single: any[];
  view: any[] = [390, 300];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  // colorScheme = {
  //   domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  // };

  constructor() {
    this.single = [
      // {
      //   "name": "Germany",
      //   "value": 8940000
      // },
      // {
      //   "name": "USA",
      //   "value": 5000000
      // },
      // {
      //   "name": "France",
      //   "value": 7200000
      // },
      // {
      //   "name": "UK23",
      //   "value": 6200000
      // }
    ];
    // Object.assign(this, { single });
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }




  ngOnInit(): void {
  }

  open() {
    alert('open me')
    this.isOpen = OPEN;
  }

  closeMe() {
    this.isOpen = CLOSED;
    this.isOpenChange.emit(this.isOpen);
  }
}
