import { Days, Module } from "../../models/plan/types";

export class AddModule {
  static readonly type = "[FitnessPlan] Add Module";

  constructor(public readonly module: Module) {}
}
export class DeleteModule {
  static readonly type = "[FitnessPlan] Delete Module";

  constructor(public id: number) {}
}

export class UpdateModule {
  static readonly type = "[FitnessPlan] Update Module";

  constructor(public readonly nextModule: Module) {}
}

export class SetCalendarData {
  static readonly type = "[FitnessPlan] Set Calendar Data";

  constructor(
    public readonly module: Module,
    public readonly day: Days
  ) {}
}

export class RemoveCalendarData {
  static readonly type = "[FitnessPlan] Remove Calendar Data";

  constructor(
    public readonly id: number,
    public readonly day: Days
  ) {}
}
