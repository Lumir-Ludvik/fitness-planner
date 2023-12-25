import { Component, OnDestroy, OnInit } from "@angular/core";
import { Module } from "../models/plan/types";
import { EditActivityModalComponent } from "./edit-activity-modal/edit-activity-modal.component";
import { MatDialog } from "@angular/material/dialog";
import { Select, Store } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";
import { FitnessPlanState } from "../states/state/fitness-plan-state";
import { DeleteModule } from "../states/actions/fitness-plan-state-actions";

@Component({
  selector: "app-list-of-activities",
  templateUrl: "./list-of-activities.component.html",
  styleUrls: ["./list-of-activities.component.scss"]
})
export class ListOfActivitiesComponent implements OnInit, OnDestroy {
  public tableData: Module[] = [];
  displayedColumns = ["name", "detail", "filename", "actions"];

  @Select(FitnessPlanState.getModules)
  private modules$: Observable<Module[]>;
  private subscriptionModules: Subscription | null = null;

  constructor(
    private store: Store,
    private editModal: MatDialog
  ) {
    // effect(() => {
    //   this.tableData = [...this.moduleService.getModules()];
    // });
  }

  public ngOnInit() {
    this.subscriptionModules =
      this.modules$?.subscribe({
        next: modules => (this.tableData = modules),
        error: err => console.error(err)
      }) ?? null;
  }

  public ngOnDestroy() {
    this.subscriptionModules?.unsubscribe();
  }

  public editModule(id: number) {
    this.editModal.open(EditActivityModalComponent, {
      data: this.tableData.find(module => module.id === id)
    });
  }

  public deleteModule(id: number) {
    this.store.dispatch(new DeleteModule(id));
  }
}
