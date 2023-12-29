import { Injectable } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import {
  AddModule,
  DeleteModule,
  GetFitnessPlanData,
  UpdateModule
} from "../../states/actions/fitness-plan-state-actions";
import { Module } from "../../models/plan/types";
import { FitnessPlanState } from "../../states/state/fitness-plan-state";
import { Observable, Subscription } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";
import { Guid } from "guid-typescript";

@Injectable()
export class ModuleStoreService {
  @Select(FitnessPlanState.getModules)
  private modules$: Observable<Module[]>;
  private subscriptionModules$: Subscription | null = null;

  constructor(private readonly store: Store) {
    this.store.dispatch(new GetFitnessPlanData());
  }

  public getAll() {
    return toSignal(this.modules$);
  }

  public add(module: Module) {
    this.store.dispatch(new AddModule(module));
  }

  public delete(id: Guid) {
    this.store.dispatch(new DeleteModule(id));
  }

  public update(module: Module) {
    this.store.dispatch(new UpdateModule(module));
  }
}
