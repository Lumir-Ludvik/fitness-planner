import { Component, Signal } from "@angular/core";
import { Module } from "../../models/plan/types";
import { moduleTrackBy } from "../module/helpers/module.helper";
import { ModuleStoreService } from "../services/module.store.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"]
})
export class MenuComponent {
  public modules: Signal<Module[]>;

  constructor(private readonly moduleStoreService: ModuleStoreService) {
    this.modules = this.moduleStoreService.getAll();
  }

  protected readonly moduleTrackBy = moduleTrackBy;
}
