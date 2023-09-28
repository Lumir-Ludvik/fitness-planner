import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PlanComponent } from "./plan/plan.component";
import { ActivityFormComponent } from "./activity-form/activity-form.component";
import { ListOfActivitiesComponent } from "./list-of-activities/list-of-activities.component";

const routes: Routes = [
  { path: "", redirectTo: "plan", pathMatch: "full" },
  { path: "plan", component: PlanComponent },
  { path: "activities", component: ListOfActivitiesComponent },
  { path: "activity-form", component: ActivityFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
