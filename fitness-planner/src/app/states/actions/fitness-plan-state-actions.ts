import { Days, Module } from "../../models/plan/types";
import { Guid } from "guid-typescript";

export class AddModule {
  static readonly type = "[FitnessPlan] Add Module";

  constructor(public readonly module: Module) {}
}
export class DeleteModule {
  static readonly type = "[FitnessPlan] Delete Module";

  constructor(public id: Guid) {}
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
    public readonly id: Guid,
    public readonly day: Days
  ) {}
}

export class APISuccessResponse<T> {
  static readonly type = "[FitnessPlan] API Success Response";

  constructor(public readonly data: T) {}
}

export class APIErrorResponse<T> {
  static readonly type = "[FitnessPlan] API Error Response";

  constructor(public readonly data: T) {}
}

export class GetFitnessPlanData {
  static readonly type = "[FitnessPlan] Get Fitness plan data";
}
