import { NgModule } from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { PlanComponent } from "./plan.component";
import { MenuComponent } from "./menu/menu.component";
import { ModuleComponent } from "./module/module.component";
import { CdkDrag, CdkDropList, CdkDropListGroup } from "@angular/cdk/drag-drop";
import { ModuleStoreService } from "./services/module.store.service";

@NgModule({
  declarations: [PlanComponent, MenuComponent, ModuleComponent],
  imports: [
    CommonModule,
    NgOptimizedImage,
    CdkDrag,
    CdkDropList,
    CdkDropListGroup
  ],
  providers: [ModuleStoreService]
})
export class PlanModule {}
