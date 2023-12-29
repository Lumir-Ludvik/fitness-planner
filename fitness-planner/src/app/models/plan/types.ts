import { Guid } from "guid-typescript";

export type Days =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type ModuleBE = Omit<Module, "image"> & {
  filename: string;
  base64Img: string;
  contentType: string;
};

export type Module = {
  id?: Guid;
  title: string;
  text: string;
  image: { filename: string; data: Blob };
};

export type CalendarDataType = Record<Days, Module[]>;

export type FitnessPlanStateType = {
  modules: Module[];
  calendarData: CalendarDataType;
};
