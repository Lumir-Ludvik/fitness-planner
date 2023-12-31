import { Component, Signal } from "@angular/core";
import { Module } from "../models/plan/types";
import { EditActivityModalComponent } from "./edit-activity-modal/edit-activity-modal.component";
import { MatDialog } from "@angular/material/dialog";
import { DeleteModule } from "../states/actions/fitness-plan-state-actions";
import { ModuleStoreService } from "../plan/services/module.store.service";
import { Store } from "@ngxs/store";
import { Guid } from "guid-typescript";

@Component({
  selector: "app-list-of-activities",
  templateUrl: "./list-of-activities.component.html",
  styleUrls: ["./list-of-activities.component.scss"]
})
export class ListOfActivitiesComponent {
  public tableData: Signal<Module[]>;
  displayedColumns = ["name", "detail", "filename", "actions"];

  constructor(
    private readonly store: Store,
    private readonly moduleStoreService: ModuleStoreService,
    private readonly editModal: MatDialog
  ) {
    this.tableData = this.moduleStoreService.getAll();
  }

  public editModule(id: Guid) {
    this.editModal.open(EditActivityModalComponent, {
      data: this.tableData().find(module => module.id === id)
    });
  }

  public deleteModule(id: Guid) {
    this.store.dispatch(new DeleteModule(id));
  }
}
