import { Component, OnDestroy, OnInit } from "@angular/core";
import { ModuleService } from "../services/module.service";
import { Module } from "../../models/plan/types";
import { Select } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";
import { FitnessPlanState } from "../../states/state/fitness-plan-state";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"]
})
export class MenuComponent implements OnInit, OnDestroy {
  public modules: Module[] = [];

  @Select(FitnessPlanState.getModules)
  private modules$: Observable<Module[]>;
  private subscriptionModules$: Subscription | null = null;
  constructor(private moduleService: ModuleService) {
    // effect(() => {
    //   this.modules = this.moduleService.getModules();
    // });
  }

  public ngOnInit() {
    this.subscriptionModules$ =
      this.modules$?.subscribe({
        next: modules => (this.modules = modules),
        error: err => console.error(err)
      }) ?? null;
  }

  public ngOnDestroy() {
    this.subscriptionModules$?.unsubscribe();
  }
}
