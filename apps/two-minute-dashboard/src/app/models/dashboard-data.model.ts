import { DataSource } from './data-source.mode';
import { LitterType } from './litter-type.model';
import { MapItem } from './map-item.model';
import { NamedLocation } from './named-location.model';

export class DashBoardData {
  dataSources: DataSource[];
  from: Date;
  to: Date;
  litterTypes: LitterType[];
  namedLocations: NamedLocation[];
  mapItems: MapItem[];
}
