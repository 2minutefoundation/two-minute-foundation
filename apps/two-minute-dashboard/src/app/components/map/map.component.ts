import { AfterViewInit, Component, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from './../../marker.service';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { DashBoardData } from '../../models/dashboard-data.model';
import 'leaflet-draw';
import {
  Browser,
  circle,
  featureGroup,
  FeatureGroup,
  icon, LatLng,
  latLng,
  LeafletMouseEvent,
  marker,
  Marker, Polygon,
  polygon,
  tileLayer
} from 'leaflet';

import { MapItem } from '../../models/map-item.model';
import win = Browser.win;
import { HttpClient } from '@angular/common/http';
import { LatLong } from '../../models/latlong.model';



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
export class MapComponent implements OnInit, AfterViewInit {

  // map: L.Map;
  json;
  theMap: L.Map; // = L.map('map');

  public drawnItems = new L.FeatureGroup();
  private drawControl;
  private features = {
    base: new L.FeatureGroup(),
    layers: new L.FeatureGroup()
  };

  drawOptions = {

    draw: {
      polyline: true,
      polygon: false,
      circle: false,
      rectangle: false,
      marker: false,
      circlemarker: false
    }
  };

  // drawItems: FeatureGroup = featureGroup();
  // drawnItems: any;



  @Output() pinClicked = new EventEmitter<MapItem>();

  @Output() areaSelected = new EventEmitter<LatLong[]>();

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
  polygon: Polygon;

  // markersLayer = new L.LayerGroup();
  _dashBoardData: DashBoardData;
  private polyLayer: any;
  get dashBoardData(): DashBoardData {
    return this._dashBoardData;
  }

  @Input() set dashBoardData(value: DashBoardData) {
    if (value) {
      this._dashBoardData = value;
      this.markers = [];

      value.mapItems.forEach((point) => {
        this.addMarker(point);
      })

      this.theMap.fitBounds(this.dashBoardData.bounds, { animate: true });
    }
  }

  // @Input() dashBoardData: DashBoardData;

  // private map;
  @ViewChild('sidebar') sidebar: SidebarComponent;

  enableGestures = true;
  sidebarOpen = true;

  onMapReady(map: L.Map) {
    this.theMap = map;

    // this.http.get("assets/departements.json").subscribe((json: any) => {
    //   console.log(json);
    //   this.json = json;
    //   L.geoJSON(this.json).addTo(map);
    // });
  }

  ngAfterViewInit(): void {
   // alert(0);
    this.initMap();
  //  alert(1);
    this.initDraw();
   // alert(2);
    this.drawPolygon();
  //  alert(3);
  }




  constructor(private markerService: MarkerService, private zone: NgZone, private http: HttpClient) {
    window.setTimeout(() => {
      this.theMap = L.map('map');
      alert('map initialised')
    }, 1000)
  }



  private initMap(): void {

    // this.map.addLayer(this.features.base);
    //
    // this.map.addLayer(this.polygon);

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
      this.zone.run(() => this.onMarkerClick(mapItem))
    }).bindPopup(`<strong>${mapItem.title}<strong><img style='width: 100%; min-width: 300px;margin-top:6px;${mapItem.imageUrl ? '' : 'display: none;'}' src='${mapItem.imageUrl}'><p>${mapItem.description}</p>`);


    this.markers.push(newMarker);




    const newPoly = polygon([]);
    this.polygon = newPoly;


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







    // this.map.on('click', (a: any) => {
    //   this.zone.run(() => this.test(a))
    //   self = this;
    // });
// const self = this;
//     window.setTimeout(() => {
//       self.map.map.on('click', function(e) {
//         alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
//       });
//     }, 1000)
//
//    //  this.markerService.makeCapitalMarkers(this.map);
  }



  initDraw() {
    // this.drawItems is a L.FeatureGroup(), used to store polygon
    //this.map.addLayer(this.drawnItems);
    // this.drawControl = new L.Control.Draw({
    //   // Hide the drawn toolbar, because my project does not need to be drawn manually
    //   // draw: false,
    //   edit: {
    //     featureGroup: this.drawnItems,
    //     remove: false,
    //   }
    // });

    // hide edit handlers tip
    // L.drawLocal.edit.handlers.edit.tooltip.text = null;
    // L.drawLocal.edit.handlers.edit.tooltip.subtext = null;
    this.theMap.addControl(this.drawControl);
  }

  private onMarkerClick(mapItem: MapItem) {
    this.pinClicked.emit(mapItem);
  }

  test($event: LeafletMouseEvent) {
    // alert(JSON.stringify($event.latlng));
  }


  onDrawReady(e: any) {
// alert('ssss')
  }

  drawDone(e: any) {

    // this.drawControl = new L.Control.Draw({
    //   // Hide the drawn toolbar, because my project does not need to be drawn manually
    //
    //   edit: {
    //     featureGroup: this.drawnItems,
    //     remove: false,
    //   }
    // });

    // this.polyLayer = e;
console.log('draw', e);


    if (e.layerType === 'polyline') {

      console.log('aaa', e.layer._latlngs);


      this.areaSelected.emit(e.layer._latlngs);



      // this.dashBoardData.selectionPolygon = e.layer._latlngs.push(e.layer._latlngs[0]);

      // var map = L.Wrld.map("map", "your_api_key_here", {
      //   center: [37.7900, -122.401],
      //   zoom: 15
      // });

      // remove previous
      if (this.polyLayer) {
        this.theMap.removeLayer(this.polyLayer);
      }


      // var polygonPoints = [
      //   [37.786617, -122.404654],
      //   [37.797843, -122.407057],
      //   [37.798962, -122.398260],
      //   [37.794299, -122.395234]];
      this.polyLayer = L.polygon(e.layer._latlngs).addTo(this.theMap);


      // let layer = L.polygon([e.layer._latlngs], {
      //   weight: 1,
      //   color: '#3366ff',
      //   opacity: 1,
      //   fillColor: '#3366ff',
      //   fillOpacity: 1,
      // });



      // this.map.addLayer(layer);



      // let editableLayers = L.featureGroup().addTo(this.map.layers[0]);
      // let drawControl = new L.Control.Draw({
      //   edit: {
      //     featureGroup: editableLayers
      //   }
      // });

      // L.polygon(e.layer.editing.latlngs).addTo(this.map.getLayers()[0]);
      // console.log('drawdone', e.layer.editing.latlngs);
    }
    // var poly = e.;
    // var latlngs = poly.getLatLngs(); // here the polygon latlngs

    // const type = (e as any).layerType,
    //   layer = (e as any).layer
    //
    //
    //
    // if (type === 'polygon') {
    //   // here you got the polygon coordinates
    //   const polygonCoordinates = layer._latlngs;
    //   console.log(polygonCoordinates);
    // }
   //  let a = 1;
   // alert(JSON.stringify($event.type));
   //  alert(JSON.stringify($event.target));
  }

  drawPolygon(){
    // let map = L.Wrld.map("map", "your_api_key_here", {
    //   center: [37.7900, -122.401],
    //   zoom: 15
    // });

    // let polygonPoints = [
    //   [37.786617, -122.404654],
    //   [37.797843, -122.407057],
    //   [37.798962, -122.398260],
    //   [37.794299, -122.395234]];
    // let poly = L.polygon(polygonPoints).addTo(this.map);


    // alert(1);
    // let layer = L.polygon([[50, -3], [51, -4], [51, 2], [50, -1]], {
    //   weight: 1,
    //   color: '#3366ff',
    //   opacity: 1,
    //   fillColor: '#3366ff',
    //   fillOpacity: 1,
    // });
    // alert(2);
    // this.drawnItems.addLayer(layer);
    // alert(3)
  }

  zoomTest() {
    console.log(this.theMap);

    /// let group = new L.featureGroup([marker1, marker2, marker3]);

    this.theMap.fitBounds(this.dashBoardData.bounds);

    // let bounds = L.LatLngBounds;
    // bounds
    // let a = this.theMap.setMaxBounds(bounds);
    // console.log('aaaaaa', a);

   // console.log(this.dashBoardData.getBounds());

    // this.theMap.(new LatLng(53,-3), 10);
  }

  clearShapes() {
    // this.theMap.removeLayer(L.lat)
    this.theMap.removeLayer(this.polyLayer);
  }
}
