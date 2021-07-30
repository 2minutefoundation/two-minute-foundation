import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { DashboardService } from './services/dashboard.service';
import { DashBoardData } from './models/dashboard-data.model';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { MapComponent } from './components/map/map.component';
import { DetailPanelComponent } from './components/detail-panel/detail-panel.component';
import { FilterPanelComponent } from './components/filter-panel/filter-panel.component';
import { MapItem } from './models/map-item.model';
import { LatLong } from './models/latlong.model';


const OPEN = 'OPEN';
const CLOSED = 'CLOSED';


@Component({
  selector: 'two-minute-foundation-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  public dashboardData: DashBoardData;

  @ViewChild('mapComponent') mapComponent: MapComponent;
  // @ViewChild('filterPanel') filterPanel: FilterPanelComponent;
  @ViewChild('detailComponent') detailComponent: DetailPanelComponent;


  detailPanelState = OPEN;
  filterPanelState = OPEN;
  selectedMapItem: MapItem;


  constructor(private dashboardService: DashboardService, private ref: ChangeDetectorRef) {


  }

  ngAfterViewInit(): void {

  //   alert('about to load');
    this.loadMapData();


  }


  loadMapData() {
    this.dashboardService.get().subscribe((ddm: DashBoardData) => {
      this.dashboardData = ddm;
    });
  }

  filterUpdates() {

    this.dashboardData.mapItems = [];
    this.dashboardService.post(this.dashboardData).subscribe((ddm: DashBoardData) => {
      this.dashboardData = ddm;
    });
  }

  pinClicked(mapItem: MapItem) {
    this.detailPanelState = OPEN;
    this.selectedMapItem = mapItem;
  }

  toggleSideBar() {
    this.filterPanelState = this.filterPanelState == CLOSED ? OPEN : CLOSED;
  }

  closeSide() {
    this.filterPanelState = CLOSED;
  }

  toggleDetailBar() {
    this.detailPanelState = this.detailPanelState == CLOSED ? OPEN : CLOSED;
  }

  detailChanged() {
    this.detailPanelState = CLOSED;
  }

  areaSelected($event: LatLong[], isCustomSelection = false) {
    this.dashboardData.selectionPolygon = $event;
    this.filterUpdates();
  }

  clearSelectedArea() {
    this.dashboardData.selectionPolygon = [];

    this.mapComponent.clearShapes();

    this.filterUpdates();
  }
}
