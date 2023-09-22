import { EffectAllowed } from "ngx-drag-drop";

export type Days =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type Module = {
  id: number;
  title: string;
  text: string;
  imagePath: string;
};

export type CalendarDataType = Record<Days, Module[]>;

export type DragAndDropType = { effectAllowed: EffectAllowed; data: Module };
