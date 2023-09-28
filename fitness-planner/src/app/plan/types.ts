export type Days =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type Module = {
  id?: number;
  title: string;
  text: string;
  image: { filename: string; data: Blob };
};

export type CalendarDataType = Record<Days, Module[]>;
