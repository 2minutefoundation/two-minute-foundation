import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { NodeCheckEventArgs, TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { DataSource } from '../../models/data-source.mode';
import { DashBoardData } from '../../models/dashboard-data.model';
import * as moment from 'moment';
import { animate, state, style, transition, trigger } from '@angular/animations';

const OPEN = 'OPEN';
const CLOSED = 'CLOSED';

@Component({
  selector: 'two-minute-foundation-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss'],
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
    ]),
    trigger('expandedState', [
      state(CLOSED, style({
        opacity: '0',
        overflow: 'hidden',
        height: '0px'
      })),
      transition(`${OPEN} => ${CLOSED}`, animate('200ms ease-out')),
      transition(`${CLOSED} => ${OPEN}`, animate('200ms ease-in')),
    ]),
    trigger('rotatedState', [
      state(CLOSED, style({ transform: 'rotate(0)' })),
      state(OPEN, style({ transform: 'rotate(180deg)' })),
      transition(`${OPEN} => ${CLOSED}`, animate('300ms ease-out')),
      transition(`${CLOSED} => ${OPEN}`, animate('300ms ease-in')),
    ])
  ]
})
export class FilterPanelComponent implements OnInit {
  faTimes = faTimes;
  @Input()  isOpen = OPEN;
  @Output() closeSide = new EventEmitter();
  constructor() { }

  _dashBoardData: DashBoardData;
  get dashBoardData(): DashBoardData {
    return this._dashBoardData;
  }
  @Input() set dashBoardData(value: DashBoardData) {
    if (value) {
      this._dashBoardData = value;
      this.field2 = { dataSource: value.dataSources, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' };
      this.field = { dataSource: value.litterTypes, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' };
    }
  };

  // @Output('selectionUpdated') selectionUpdated = new EventEmitter<any>();
  @Output() valueChange = new EventEmitter();


  @ViewChild('treeview') public tree: TreeViewComponent;
  @ViewChild('dataSources') public dataSources: TreeViewComponent;

  expandedState = OPEN;
  rotatedState = CLOSED;

  public data: string[] = ['All - Everywhere', 'UK Cornwall', 'UK Devon', 'United Kingdom', 'Australia', 'New Zealand'];
// maps the appropriate column to fields property
  public field: any; //  = { dataSource: this.countries, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' };

  public field2: any; //: Object = { dataSource: this.ds, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' };

// set the CheckBox to the TreeView
  public showCheckBox: boolean = true;
//set the checknodes to the TreeView
  public checkedNodes: string[] = ['2','6'];
  public nodeChecked(args): void{
    alert("The checked node's id is: "+this.tree.checkedNodes);

  }


  ngOnInit(): void {
  }

  setWeek() {
    this.dashBoardData.from = moment().add(-1, 'weeks').toDate();
    this.dashBoardData.to = moment().toDate();
  }

  setMonth() {
    this.dashBoardData.from = moment().add(-1, 'months').toDate();
    this.dashBoardData.to = moment().toDate();
  }

  setYear() {
    this.dashBoardData.from = moment().add(-1, 'years').toDate();
    this.dashBoardData.to = moment().toDate();
  }

  dataSourceChanged($event: NodeCheckEventArgs) {
    this.dashBoardData.dataSources.forEach((dataSource) => {
      // is this data source selected?
      const dataSourceSelected = this.dataSources.checkedNodes.find(a => parseInt(a, 10) == dataSource.id);
      dataSource.isChecked = dataSourceSelected ? true : false;
    });
  }

  closeMe() {
    this.closeSide.emit();
    // this.isOpen = this.isOpen === OPEN ? CLOSED : OPEN;
  }

  toggle() {
    this.isOpen = this.isOpen === OPEN ? CLOSED : OPEN;
  }
}
