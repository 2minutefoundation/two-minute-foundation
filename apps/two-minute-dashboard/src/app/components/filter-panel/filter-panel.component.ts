import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { faTools } from '@fortawesome/free-solid-svg-icons';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { DataSource } from '../../models/data-source.mode';
import { DashBoardData } from '../../models/dashboard-data.model';
import * as moment from 'moment';
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
      console.log('cats', value.dataSources);
      this._dashBoardData = value;
      this.field2 = { dataSource: value.dataSources, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' };
    }
  };


  @ViewChild('treeview') public tree: TreeViewComponent;
  @ViewChild('dataSources') public dataSources: TreeViewComponent;

// defined the array of data
  public countries: Object[] = [
    { id: 1, name: 'Drinking', hasChild: true, expanded: false },
    { id: 2, pid: 1, name: 'Drinks Bottles', isChecked: true },
    { id: 3, pid: 1, name: 'Bottle Tops/Lids' },
    { id: 4, pid: 1, name: 'Glass' },
    { id: 6, pid: 1, name: 'Other Bottles', isChecked: true },

    { id: 7, name: 'Consumables', hasChild: true },
    { id: 8, pid: 7, name: 'Drinking Pouch' },
    { id: 9, pid: 7, name: 'Coffee Cups' },
    { id: 10, pid: 7, name: 'Plastic Straws / Cutlery' },
    { id: 11, pid: 7, name: 'Coffee Lids' },
    { id: 12, pid: 7, name: 'Crisp / Sweet Packet' },
    { id: 13, pid: 7, name: 'Plastic Bag' },
    { id: 14, pid: 7, name: 'Food Container' },
    { id: 15, pid: 7, name: 'Tetra Pack' },
    { id: 16, pid: 7, name: 'Glow Sticks' },

    { id: 17, name: 'Fishing', hasChild: true },
    { id: 18, pid: 17, name: 'Fishing Net' },
    { id: 19, pid: 17, name: 'Net Pieces' },
    { id: 20, pid: 17, name: 'Fishing Line' },
    { id: 21, pid: 17, name: 'Rope' },
    { id: 22, pid: 17, name: 'Buoys/Ropes' },
    { id: 23, pid: 17, name: 'Gloves' },
    { id: 24, pid: 17, name: 'Fishing Gear (pot / crate / box)' },


    { id: 25, name: 'Metal', hasChild: true },
    { id: 26, pid: 25, name: 'Metal All' },

    { id: 27, name: 'Personal Hygiene', hasChild: true },
    { id: 28, pid: 27, name: 'Applicators' },
    { id: 29, pid: 27, name: 'Q-Tips/Cotton Buds' },
    { id: 30, pid: 27, name: 'Toothbrush/Razor/Comb/Pen' },
    { id: 31, pid: 27, name: 'Wet Wipes/Pads' },

    { id: 32, name: 'General Materials', hasChild: true },
    { id: 33, pid: 32, name: 'Polystyrene' },
    { id: 34, pid: 32, name: 'Hard Plastic Pieces' },
    { id: 35, pid: 32, name: 'Micro Plastics' },
    { id: 36, pid: 32, name: 'Nurdle' },
    { id: 37, pid: 32, name: 'Rubber' },
    { id: 38, pid: 32, name: 'Foam' },

    { id: 39, name: 'General', hasChild: true },
    { id: 40, pid: 39, name: 'Strap Webbing' },
    { id: 41, pid: 39, name: 'Shotgun Cartridge/Webbing' },
    { id: 42, pid: 39, name: 'Clothing' },
    { id: 43, pid: 39, name: 'Footwear' },
    { id: 44, pid: 39, name: 'Cigarette Lighter' },
    { id: 45, pid: 39, name: 'Cigarette Butts' },
    { id: 46, pid: 39, name: 'Nitrous Oxide Canister' },
    { id: 47, pid: 39, name: 'Facemask' },
    { id: 48, pid: 39, name: 'Sharps/Needles' },
    { id: 49, pid: 39, name: 'Other Plastic Pieces' },
    { id: 50, pid: 39, name: 'PPE Gloves' },

    { id: 51, name: 'Recreational', hasChild: true },
    { id: 52, pid: 51, name: 'Balloons' },
    { id: 53, pid: 51, name: 'Beach Toys' },
    { id: 54, pid: 51, name: 'Balls' },
    { id: 55, pid: 51, name: 'Marine Goods' },
    { id: 56, pid: 51, name: 'BBQ' },



  ];




  public data: string[] = ['All - Everywhere', 'UK Cornwall', 'UK Devon', 'United Kingdom', 'Australia', 'New Zealand'];
// maps the appropriate column to fields property
  public field: Object = { dataSource: this.countries, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' };

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
}
