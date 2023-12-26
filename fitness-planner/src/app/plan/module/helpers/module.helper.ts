import { Module } from "../../types";
import { KeyValue } from "@angular/common";

export const moduleTrackBy = (_: number, module: Module) => module.id;

export const dayTrackBy = (_: number, day: KeyValue<string, Module[]>) =>
  day.key;
