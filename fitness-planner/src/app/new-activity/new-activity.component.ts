import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ModuleService } from "../plan/services/module.service";
import { Module } from "../plan/types";

@Component({
  selector: "app-new-activity",
  templateUrl: "./new-activity.component.html",
  styleUrls: ["./new-activity.component.scss"]
})
export class NewActivityComponent {
  constructor(
    private formBuilder: FormBuilder,
    private moduleService: ModuleService
  ) {}

  public activityForm = this.formBuilder.group({
    title: this.formBuilder.control<string>("", Validators.required),
    image: this.formBuilder.control<Blob | null>(null, Validators.required),
    text: this.formBuilder.control<string>("", Validators.required)
  });

  public onSubmit() {
    const module = this.activityForm.value;
    this.moduleService.addModule(module as Module);
  }

  public async onImageUploaded(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) {
      return;
    }
    //
    // const base64 = await new Promise((resolve, reject) => {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(file);
    //   reader.onload = () => resolve(reader.result);
    //   reader.onerror = error => reject(error);
    // });
    this.activityForm
      .get("image")
      ?.patchValue(new Blob([file], { type: "image/png" }));
  }
}
