import { Component, Input, OnInit } from "@angular/core";
import { Days, Module } from "../../models/plan/types";
import { Store } from "@ngxs/store";
import { RemoveCalendarData } from "../../states/actions/fitness-plan-state-actions";
import { Guid } from "guid-typescript";

@Component({
  selector: "app-module",
  templateUrl: "./module.component.html",
  styleUrls: ["./module.component.scss"]
})
export class ModuleComponent implements OnInit {
  @Input({ transform: (value: string): Days => value as Days }) day?: Days;
  @Input({ required: true }) id?: Guid;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) image!: { filename: string; data: Blob };
  @Input() text!: string;

  public imageUrl: string | null = null;
  public module: Module | null = null;
  constructor(private store: Store) {}

  public ngOnInit() {
    if (!(this.image.data instanceof Blob)) {
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

    this.store.dispatch(new RemoveCalendarData(this.id, this.day));
  }
}
