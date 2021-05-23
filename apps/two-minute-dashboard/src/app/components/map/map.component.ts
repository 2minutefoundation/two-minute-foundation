import { Component, Input, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from './../../marker.service';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { DashBoardData } from '../../models/dashboard-data.model';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'two-minute-foundation-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  _dashBoardData: DashBoardData;
  get dashBoardData(): DashBoardData {
    return this._dashBoardData;
  }
  @Input() set dashBoardData(value: DashBoardData) {
    // console.log('plot points',value.mapItems);

    let LeafIcon = L.Icon.extend({
      options: {
        iconSize:     [38, 95],
        shadowSize:   [50, 64],
        iconAnchor:   [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor:  [-3, -76]
      }
    });

    let greenIcon = new LeafIcon({
      iconUrl: 'http://leafletjs.com/examples/custom-icons/leaf-green.png',
      shadowUrl: 'http://leafletjs.com/examples/custom-icons/leaf-shadow.png'
    })

    if (value && value.mapItems) {
      this._dashBoardData = value;
      this._dashBoardData.mapItems.forEach((mapItem) => {
        // console.log('adding pin at ', [mapItem.latitude, mapItem.longitude])
        // const marker = L.marker([mapItem.latitude, mapItem.longitude], {icon: greenIcon});
        const marker = L.marker([mapItem.latitude, mapItem.longitude]
        );

        marker.addTo(this.map);
      });
    }

  }
  // @Input() dashBoardData: DashBoardData;

  private map;
  @ViewChild('sidebar') sidebar: SidebarComponent;
  public showBackdrop: boolean = true;
  public type: string = 'Push';
  public width: string ='280px';
  public closeOnDocumentClick: boolean = true;
  enableGestures = true;
  sidebarOpen = true;

  constructor(private markerService: MarkerService) { }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  public onCreated(args: any) {
    this.sidebar.element.style.visibility = '';
  }
  closeClick(): void {
    this.sidebar.hide();
  };

  toggleClick():void{
    this.sidebar.show();
  }

  ngOnInit(): void {
    this.initMap();

   //  this.markerService.makeCapitalMarkers(this.map);
  }

}
