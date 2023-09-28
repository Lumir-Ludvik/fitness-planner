import { Component, effect } from "@angular/core";
import { ModuleService } from "../plan/services/module.service";
import { Module } from "../plan/types";
import { EditActivityModalComponent } from "./edit-activity-modal/edit-activity-modal.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-list-of-activities",
  templateUrl: "./list-of-activities.component.html",
  styleUrls: ["./list-of-activities.component.scss"]
})
export class ListOfActivitiesComponent {
  public tableData: Module[] = [];
  displayedColumns = ["name", "detail", "filename", "actions"];
  constructor(
    private moduleService: ModuleService,
    private editModal: MatDialog
  ) {
    effect(() => {
      this.tableData = [...this.moduleService.getModules()];
    });
  }

  public editModule(id: number) {
    this.editModal.open(EditActivityModalComponent, {
      data: this.tableData.find(module => module.id === id)
    });
  }

  public deleteModule(id: number) {
    this.moduleService.deleteModule(id);
  }
}
