import { Component } from "@angular/core";
import { DndDropEvent } from "ngx-drag-drop";
import { Days, Module } from "./types";
import { originalOrder } from "../../utils/sort-utils";

@Component({
  selector: "app-plan",
  templateUrl: "./plan.component.html",
  styleUrls: ["./plan.component.scss"]
})
export class PlanComponent {
  CalendarData: Record<Days, Module[]> = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
  };

  onDrop({ data }: DndDropEvent, dayKey: string) {
    this.CalendarData[dayKey as Days].push(data);
  }

  protected readonly Object = Object;
  protected readonly originalOrder = originalOrder;
}
