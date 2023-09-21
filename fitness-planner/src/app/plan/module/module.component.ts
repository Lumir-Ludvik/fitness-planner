import { Component, Input } from "@angular/core";

@Component({
  selector: "app-module",
  templateUrl: "./module.component.html",
  styleUrls: ["./module.component.scss"]
})
export class ModuleComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) imagePath!: string;
  @Input() text!: string;
}
