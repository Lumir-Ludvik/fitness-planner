import { Component, effect } from "@angular/core";
import { ModuleService } from "../services/module.service";
import { Module } from "../types";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"]
})
export class MenuComponent {
  public modules: Module[] = [];

  constructor(private moduleService: ModuleService) {
    effect(() => {
      this.modules = this.moduleService.getModules();
    });
  }
}
