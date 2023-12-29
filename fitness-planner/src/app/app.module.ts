import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { ActivityFormComponent } from "./activity-form/activity-form.component";
import { PlanModule } from "./plan/plan.module";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ListOfActivitiesComponent } from "./list-of-activities/list-of-activities.component";
import { MatTableModule } from "@angular/material/table";
import { EditActivityModalComponent } from "./list-of-activities/edit-activity-modal/edit-activity-modal.component";
import { MatSortModule } from "@angular/material/sort";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { NgxsModule } from "@ngxs/store";
import { FitnessPlanState } from "./states/state/fitness-plan-state";
import { ApiModule } from "./api/api.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ActivityFormComponent,
    ListOfActivitiesComponent,
    EditActivityModalComponent
  ],
  imports: [
    ApiModule,
    NgxsModule.forRoot([FitnessPlanState]),
    BrowserModule,
    AppRoutingModule,
    PlanModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatButtonModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
