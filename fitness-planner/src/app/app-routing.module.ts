import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PlanComponent } from "./plan/plan.component";
import { ActivitiesComponent } from "./activities/activities.component";
import { NewActivityComponent } from "./new-activity/new-activity.component";

const routes: Routes = [
  { path: "", redirectTo: "plan", pathMatch: "full" },
  { path: "plan", component: PlanComponent },
  { path: "activities", component: ActivitiesComponent },
  { path: "new-activity", component: NewActivityComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
