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
  title: string;
  text: string;
  imagePath: string;
};

export type DragAndDropType = { effectAllowed: EffectAllowed; data: Module };
