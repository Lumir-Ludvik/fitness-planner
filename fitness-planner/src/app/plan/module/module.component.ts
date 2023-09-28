import { Component, Input, OnInit } from "@angular/core";
import { Days, Module } from "../types";
import { ModuleService } from "../services/module.service";

@Component({
  selector: "app-module",
  templateUrl: "./module.component.html",
  styleUrls: ["./module.component.scss"]
})
export class ModuleComponent implements OnInit {
  @Input() day?: string;
  @Input({ required: true }) id?: number;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) image!: { filename: string; data: Blob };
  @Input() text!: string;

  public imageUrl: string | null = null;
  public module: Module | null = null;
  constructor(private moduleService: ModuleService) {}

  public ngOnInit() {
    if (!(this.image instanceof Blob)) {
      return;
    }

    this.imageUrl = URL.createObjectURL(this.image.data);
    this.module = {
      id: this.id,
      image: this.image,
      text: this.text,
      title: this.title
    };
  }

  public onDelete() {
    if (!this.day || !this.id) {
      return;
    }

    this.moduleService.removeCalendarData(this.id, this.day as Days);
  }
}
