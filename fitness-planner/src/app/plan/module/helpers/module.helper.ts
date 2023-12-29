import { KeyValue } from "@angular/common";
import { Module } from "../../../models/plan/types";

export const moduleTrackBy = (_: number, module: Module) => module.id;

export const dayTrackBy = (_: number, day: KeyValue<string, Module[]>) =>
  day.key;
