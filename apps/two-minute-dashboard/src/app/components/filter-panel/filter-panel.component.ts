import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { faTools } from '@fortawesome/free-solid-svg-icons';
import { NodeCheckEventArgs, TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { DataSource } from '../../models/data-source.mode';
import { DashBoardData } from '../../models/dashboard-data.model';
import * as moment from 'moment';

class EventEmitter<T> {
}

@Component({
  selector: 'two-minute-foundation-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent implements OnInit {
  faTools = faTools;
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
}
