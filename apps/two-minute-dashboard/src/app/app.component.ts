import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { DashboardService } from './services/dashboard.service';
import { DashBoardData } from './models/dashboard-data.model';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { MapComponent } from './components/map/map.component';
import { DetailPanelComponent } from './components/detail-panel/detail-panel.component';
import { FilterPanelComponent } from './components/filter-panel/filter-panel.component';


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


  detailPanelState = CLOSED;
  filterPanelState = OPEN;


  constructor(private dashboardService: DashboardService) {


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

  pinClicked($event: any) {
    this.detailPanelState = OPEN;
  }

  toggleSideBar() {
    this.filterPanelState = this.filterPanelState == CLOSED ? OPEN : CLOSED;
  }

  closeSide() {
    this.filterPanelState = CLOSED;
  }
}
