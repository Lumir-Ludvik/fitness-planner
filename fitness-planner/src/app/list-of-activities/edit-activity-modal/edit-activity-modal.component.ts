import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Module } from "../../models/plan/types";

@Component({
  selector: "app-edit-activity-modal",
  templateUrl: "./edit-activity-modal.component.html",
  styleUrls: ["./edit-activity-modal.component.scss"]
})
export class EditActivityModalComponent {
  public wasSuccessful = false;

  constructor(@Inject(MAT_DIALOG_DATA) public module: Module) {}

  public onSubmitted(result: boolean) {
    this.wasSuccessful = result;
  }
}
