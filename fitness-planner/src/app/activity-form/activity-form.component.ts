import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ModuleService } from "../plan/services/module.service";
import { Module } from "../plan/types";

@Component({
  selector: "app-activity-form",
  templateUrl: "./activity-form.component.html",
  styleUrls: ["./activity-form.component.scss"]
})
export class ActivityFormComponent implements OnInit {
  @Input()
  module: Module | null = null;
  @Output() submitted = new EventEmitter<boolean>();

  private tempIdCounter = 1;
  private isEdit = false;

  constructor(
    private formBuilder: FormBuilder,
    private moduleService: ModuleService
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
      id: this.isEdit ? this.module?.id : this.tempIdCounter++
    } as Module;

    if (this.isEdit) {
      const res = this.moduleService.updateModule(module);
      this.submitted.emit(res);

      return;
    }

    this.moduleService.addModule(module);
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
