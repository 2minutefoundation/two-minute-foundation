import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MarkerService } from './marker.service';
import { FilterPanelComponent } from './components/filter-panel/filter-panel.component';
import { MapComponent } from './components/map/map.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AccordionModule, TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { DetailPanelComponent } from './components/detail-panel/detail-panel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, FilterPanelComponent, MapComponent, NavigationComponent, DetailPanelComponent],
  imports: [BrowserModule, HttpClientModule, AccordionModule, AccordionModule, FontAwesomeModule, CheckBoxModule, DatePickerModule, ButtonModule, TreeViewModule, DropDownListModule, LeafletModule, BrowserAnimationsModule ],
  providers: [MarkerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
