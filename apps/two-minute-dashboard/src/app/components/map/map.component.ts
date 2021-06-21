import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from './../../marker.service';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { DashBoardData } from '../../models/dashboard-data.model';

import { circle, icon, latLng, marker, Marker, polygon, tileLayer } from 'leaflet';
import { MapItem } from '../../models/map-item.model';


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

  @Output() pinClicked = new EventEmitter<boolean>();
// Open Street Map definitions
  // Open Street Map definitions
  LAYER_OSM = tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Open Street Map'
  });

  // Values to bind to Leaflet Directive
  options = {
    layers: [this.LAYER_OSM],
    zoom: 6,
    center: latLng(51, -2.5)
  };

  // layersControl = {
  //   baseLayers: {
  //     'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
  //     'Open Cycle Map': tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
  //   },
  //   overlays: {
  //     'Big Circle': circle([ 46.95, -122 ], { radius: 5000 }),
  //     'Big Square': polygon([[ 46.8, -121.55 ], [ 46.9, -121.55 ], [ 46.9, -121.7 ], [ 46.8, -121.7 ]]),
  //     'ddfd': this.markers)
  //   }
  // }

  markers: Marker[] = [];

  // markersLayer = new L.LayerGroup();
  _dashBoardData: DashBoardData;
  get dashBoardData(): DashBoardData {
    return this._dashBoardData;
  }

  @Input() set dashBoardData(value: DashBoardData) {

    // this.layersControl.overlays.ddfd =  marker([ 46.879966, -121.726909 ], marker([ 46.879966, -121.726909 ]);


    if (value) {
      this.markers = [];

      value.mapItems.forEach((point) => {
        this.addMarker(point);
      })
    }


    // this.addMarker();
    // this.addMarker();
    // this.addMarker();


    // // console.log('plot points',value.mapItems);
    //
    // alert('set dashboard data');
    // // if (L.markersLayer) {
    //   // L.markersLayer.markers.clean();
    //   // this.markersLayer.markers.pop();
    //   console.log('+++markers', L.marker.markersLayer);
    //   // this.markersLayer.m
    //
    // // }
    //
    //
    // let StationIcon = L.Icon.extend({
    //   options: {
    //     iconSize:     [20, 30],
    //     shadowSize:   [20, 30],
    //     iconAnchor:   [10, 15],
    //     shadowAnchor: [0, 0],
    //     popupAnchor:  [0, 0]
    //   }
    // });
    //
    // let beachCleanIcon = new StationIcon({
    //   iconUrl: '/assets/images/pins/beach-clean.svg',
    //   // shadowUrl: 'http://leafletjs.com/examples/custom-icons/leaf-shadow.png'
    // })
    //
    // let streetCleanIcon = new StationIcon({
    //   iconUrl: '/assets/images/pins/street-clean.svg',
    //   // shadowUrl: 'http://leafletjs.com/examples/custom-icons/leaf-shadow.png'
    // })
    //
    // let litterPickIcon = new StationIcon({
    //   iconUrl: '/assets/images/pins/litter-pick.svg',
    //   // shadowUrl: 'http://leafletjs.com/examples/custom-icons/leaf-shadow.png'
    // })
    //
    // let checkInIcon = new StationIcon({
    //   iconUrl: '/assets/images/pins/maps-black.png',
    //   // shadowUrl: 'http://leafletjs.com/examples/custom-icons/maps-black.png'
    // })
    //
    //
    // if (value && value.mapItems) {
    //   this._dashBoardData = value;
    //   this._dashBoardData.mapItems.forEach((mapItem) => {
    //     // console.log('adding pin at ', [mapItem.latitude, mapItem.longitude])
    //     let marker: any;
    //     if (mapItem.itemType == '0') {
    //       marker = L.marker([mapItem.latitude, mapItem.longitude], {icon: beachCleanIcon});
    //     }
    //
    //     if (mapItem.itemType == '1') {
    //       marker = L.marker([mapItem.latitude, mapItem.longitude], {icon: litterPickIcon});
    //     }
    //
    //     if (mapItem.itemType == '2') {
    //       marker = L.marker([mapItem.latitude, mapItem.longitude], {icon: streetCleanIcon});
    //     }
    //
    //     if (mapItem.itemType == 'checkin') {
    //       marker = L.marker([mapItem.latitude, mapItem.longitude], {icon: checkInIcon});
    //     }
    //     // const marker = L.marker([mapItem.latitude, mapItem.longitude]
    //
    //
    //     marker.addTo(this.map);
    //   });
    // }

  }

  // @Input() dashBoardData: DashBoardData;

  private map;
  @ViewChild('sidebar') sidebar: SidebarComponent;
  public showBackdrop: boolean = true;
  public type: string = 'Push';
  public width: string = '280px';
  public closeOnDocumentClick: boolean = true;
  enableGestures = true;
  sidebarOpen = true;

  constructor(private markerService: MarkerService) {
  }

  private initMap(): void {
    // this.map = L.map('map', {
    //   center: [ 52.8282, -3 ],
    //   zoom: 3
    // });
    //
    // const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   maxZoom: 18,
    //   minZoom: 3,
    //   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    // });
    //
    // tiles.addTo(this.map);
  }

  public onCreated(args: any) {
    this.sidebar.element.style.visibility = '';
  }

  closeClick(): void {
    this.sidebar.hide();
  };

  toggleClick(): void {
    this.sidebar.show();
  }


  addMarker(mapItem: MapItem) {

    // board
    const newMarker = marker(
      [mapItem.latitude, mapItem.longitude],
      {
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: mapItem.icon
        })
      }
    );
    newMarker.on('click', () => {
      this.pinClicked.emit()
      // alert('clicked')
    })
    this.markers.push(newMarker);

    /// marker = L.marker([mapItem.latitude, mapItem.longitude], {icon: beachCleanIcon});
    // }

    // if (mapItem.itemType == '1') {
    //   const newMarker = marker(
    //     [ mapItem.latitude, mapItem.longitude ],
    //     {
    //       icon: icon({
    //         iconSize: [ 25, 41 ],
    //         iconAnchor: [ 13, 41 ],
    //         iconUrl: mapItem.icon
    //       })
    //     }
    //   );
    //   this.markers.push(newMarker);
    //   // marker = L.marker([mapItem.latitude, mapItem.longitude], {icon: litterPickIcon});
    // }
    //
    // if (mapItem.itemType == '2') {
    //   const newMarker = marker(
    //     [ mapItem.latitude, mapItem.longitude ],
    //     {
    //       icon: icon({
    //         iconSize: [ 25, 41 ],
    //         iconAnchor: [ 13, 41 ],
    //         iconUrl: mapItem.icon
    //       })
    //     }
    //   );
    //   this.markers.push(newMarker);
    //   // marker = L.marker([mapItem.latitude, mapItem.longitude], {icon: streetCleanIcon});
    // }

    // if (mapItem.itemType == 'checkin') {
    //   const newMarker = marker(
    //     [ mapItem.latitude, mapItem.longitude ],
    //     {
    //       icon: icon({
    //         iconSize: [ 25, 41 ],
    //         iconAnchor: [ 13, 41 ],
    //         iconUrl: mapItem.icon
    //       })
    //     }
    //   );
    //   this.markers.push(newMarker);
    // marker = L.marker([mapItem.latitude, mapItem.longitude], {icon: checkInIcon});
  //}


  // const newMarker = marker(
  //   [ mapItem.latitude, mapItem.longitude ],
  //   {
  //     icon: icon({
  //       iconSize: [ 25, 41 ],
  //       iconAnchor: [ 13, 41 ],
  //       iconUrl: '/assets/images/pins/maps-black.svg',
  //       // iconRetinaUrl: '/assets/images/pins/maps-black.svg',
  //       // shadowUrl: '/assets/images/pins/maps-black.svg'
  //     })
  //   }
  // );
  // this.markers.push(newMarker);

  }

  ngOnInit(): void {
    this.initMap();

   //  this.markerService.makeCapitalMarkers(this.map);
  }

}
