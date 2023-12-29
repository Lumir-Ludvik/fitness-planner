import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModuleApiService } from "./services/module.api.service";
import { CalendarApiService } from "./services/calendar.api.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [ModuleApiService, CalendarApiService]
})
export class ApiModule {}
