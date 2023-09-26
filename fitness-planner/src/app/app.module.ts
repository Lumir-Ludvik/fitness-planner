import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { NewActivityComponent } from "./new-activity/new-activity.component";
import { ActivitiesComponent } from "./activities/activities.component";
import { ModuleService } from "./plan/services/module.service";
import { PlanModule } from "./plan/plan.module";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NewActivityComponent,
    ActivitiesComponent
  ],
  imports: [BrowserModule, AppRoutingModule, PlanModule, ReactiveFormsModule, BrowserAnimationsModule],
  providers: [ModuleService],
  bootstrap: [AppComponent]
})
export class AppModule {}
