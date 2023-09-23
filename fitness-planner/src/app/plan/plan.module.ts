import { NgModule } from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { PlanComponent } from "./plan.component";
import { MenuComponent } from "./menu/menu.component";
import { ModuleComponent } from "./module/module.component";
import { ModuleService } from "./services/module.service";
import {
  DndDraggableDirective,
  DndDropzoneDirective,
  DndHandleDirective
} from "ngx-drag-drop";

@NgModule({
  declarations: [PlanComponent, MenuComponent, ModuleComponent],
  providers: [ModuleService],
  imports: [
    CommonModule,
    DndDropzoneDirective,
    DndDraggableDirective,
    DndHandleDirective,
    NgOptimizedImage
  ]
})
export class PlanModule {}
