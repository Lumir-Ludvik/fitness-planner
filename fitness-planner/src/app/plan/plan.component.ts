import { Component, effect } from "@angular/core";
import { CalendarDataType, Days } from "./types";
import { originalOrder } from "../../utils/sort-utils";
import { ModuleService } from "./services/module.service";
import { CdkDrag } from "@angular/cdk/drag-drop";

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

  public onDrop(item: CdkDrag, dayKey: string) {
    debugger;
    this.moduleService.setCalendarData(item.data, dayKey as Days);
  }
}
