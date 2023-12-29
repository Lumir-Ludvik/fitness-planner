import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Module } from "../models/plan/types";
import { Store } from "@ngxs/store";
import {
  AddModule,
  UpdateModule
} from "../states/actions/fitness-plan-state-actions";
import { Guid } from "guid-typescript";

@Component({
  selector: "app-activity-form",
  templateUrl: "./activity-form.component.html",
  styleUrls: ["./activity-form.component.scss"]
})
export class ActivityFormComponent implements OnInit {
  @Input()
  module: Module | null = null;
  @Output() submitted = new EventEmitter<boolean>();

  private isEdit = false;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store
  ) {}

  public ngOnInit() {
    this.activityForm.patchValue({
      text: this.module?.text || "",
      title: this.module?.title || "",
      image: this.module?.image || null
    });

    this.isEdit = this.module !== null;
  }

  public activityForm = this.formBuilder.group({
    title: this.formBuilder.control<string>("", Validators.required),
    image: this.formBuilder.control<{ filename: string; data: Blob } | null>(
      null,
      Validators.required
    ),
    text: this.formBuilder.control<string>("", Validators.required)
  });

  public onSubmit() {
    const module = {
      ...this.activityForm.value,
      // I really love community packages...
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      id: this.isEdit ? this.module?.id : Guid.create().value
    } as Module;

    if (this.isEdit) {
      try {
        this.store.dispatch(new UpdateModule(module));
        this.submitted.emit(true);
      } catch (e) {
        this.submitted.emit(false);
      }

      return;
    }

    this.store.dispatch(new AddModule(module));
    this.submitted.emit(true);
  }

  public async onImageUploaded(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) {
      return;
    }

    this.activityForm.get("image")?.patchValue({
      filename: file.name,
      data: new Blob([file], { type: "image/png" })
    });
  }

  public deleteImage() {
    this.activityForm.get("image")?.patchValue(null);
  }
}
