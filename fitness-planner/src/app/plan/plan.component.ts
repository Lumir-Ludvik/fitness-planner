import { Component, OnDestroy, OnInit } from "@angular/core";
import { CalendarDataType, Days } from "../models/plan/types";
import { originalOrder } from "../utils/sort-utils";
import { CdkDrag } from "@angular/cdk/drag-drop";
import { Select, Store } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";
import { FitnessPlanState } from "../states/state/fitness-plan-state";
import { SetCalendarData } from "../states/actions/fitness-plan-state-actions";
import { dayTrackBy, moduleTrackBy } from "./module/helpers/module.helper";

@Component({
  selector: "app-plan",
  templateUrl: "./plan.component.html",
  styleUrls: ["./plan.component.scss"]
})
export class PlanComponent implements OnInit, OnDestroy {
  protected readonly originalOrder = originalOrder;

  public calendarData: CalendarDataType = {
    Friday: [],
    Monday: [],
    Saturday: [],
    Sunday: [],
    Thursday: [],
    Tuesday: [],
    Wednesday: []
  };

  @Select(FitnessPlanState.getCalendarData)
  private calendarData$: Observable<CalendarDataType>;
  private subscriptionCalendarData: Subscription | null = null;

  constructor(private readonly store: Store) {
    // effect(() => {
    //   this.calendarData = this.moduleService.getCalendarData();
    // });
  }

  public ngOnInit() {
    this.subscriptionCalendarData =
      this.calendarData$?.subscribe({
        next: calendarData => (this.calendarData = calendarData),
        error: err => console.error(err)
      }) ?? null;
  }

  public ngOnDestroy() {
    this.subscriptionCalendarData?.unsubscribe();
  }

  public onDrop(item: CdkDrag, dayKey: string) {
    this.store.dispatch(new SetCalendarData(item.data, dayKey as Days));
  }

  protected readonly dayTrackBy = dayTrackBy;
  protected readonly moduleTrackBy = moduleTrackBy;
}
