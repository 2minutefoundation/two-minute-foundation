import { DataSource } from './data-source.mode';
import { LitterType } from './litter-type.model';
import { MapItem } from './map-item.model';
import { NamedLocation } from './named-location.model';
import { SummaryChartItem } from './summary-chart-item.model';
import { LatLong } from './latlong.model';
import { LatLngBounds } from 'leaflet';

export class DashBoardData {
  dataSources: DataSource[];
  from: Date;
  to: Date;
  litterTypes: LitterType[];
  namedLocations: NamedLocation[];
  mapItems: MapItem[];
  litterSummaryChartData: SummaryChartItem[];
  locationSuppliedChartData: SummaryChartItem[];
  selectionPolygon: Array<LatLong> = [];
  bounds: LatLngBounds;
  noLocationCheckinCount: number;
  withLocationCheckinCount: number;
}
