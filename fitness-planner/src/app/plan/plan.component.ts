import { Component, effect } from "@angular/core";
import { DndDropEvent } from "ngx-drag-drop";
import { CalendarDataType, Days } from "./types";
import { originalOrder } from "../../utils/sort-utils";
import { ModuleService } from "./services/module.service";

@Component({
  selector: "app-plan",
  templateUrl: "./plan.component.html",
  styleUrls: ["./plan.component.scss"]
})
export class PlanComponent {
  protected readonly originalOrder = originalOrder;
  public calendarData: CalendarDataType = {} as CalendarDataType;

  constructor(private readonly moduleService: ModuleService) {
    effect(() => {
      this.calendarData = this.moduleService.getCalendarData();
    });
  }

  public onDrop({ data }: DndDropEvent, dayKey: string) {
    this.moduleService.setCalendarData(data, dayKey as Days);
  }
}
