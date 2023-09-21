import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { PlanComponent } from "./plan/plan.component";
import { RouterModule, Routes } from "@angular/router";
import { NewActivityComponent } from "./new-activity/new-activity.component";
import { ActivitiesComponent } from "./activities/activities.component";
import { ModuleComponent } from "./plan/module/module.component";
import {
  DndDraggableDirective,
  DndDropzoneDirective,
  DndHandleDirective
} from "ngx-drag-drop";

const appRoutes: Routes = [
  { path: "plan", component: PlanComponent },
  { path: "activities", component: ActivitiesComponent },
  { path: "new-activity", component: NewActivityComponent }
];

//TODO: separate into modules
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PlanComponent,
    NewActivityComponent,
    ActivitiesComponent,
    ModuleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    DndDropzoneDirective,
    DndDraggableDirective,
    DndHandleDirective
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
