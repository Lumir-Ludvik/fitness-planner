import { Component, Input } from "@angular/core";
import { Days } from "../types";
import { ModuleService } from "../services/module.service";

@Component({
  selector: "app-module",
  templateUrl: "./module.component.html",
  styleUrls: ["./module.component.scss"]
})
export class ModuleComponent {
  @Input() day?: string;
  @Input({ required: true }) id?: number;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) image!: Blob;
  @Input() text!: string;

  public imageUrl = URL.createObjectURL(this.image);
  constructor(private moduleService: ModuleService) {}

  public onDelete() {
    if (!this.day || !this.id) {
      return;
    }

    this.moduleService.removeCalendarData(this.id, this.day as Days);
  }
}
