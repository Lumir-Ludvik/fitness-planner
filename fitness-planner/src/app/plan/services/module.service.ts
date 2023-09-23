import { Injectable, signal } from "@angular/core";
import { CalendarDataType, Days, Module } from "../types";

@Injectable({
  providedIn: "root"
})
export class ModuleService {
  private modules = signal<Module[]>([
    {
      id: 1,
      title: "Cardio",
      imagePath: "./assets/img/test.png",
      text: "Core of all fat burning exercise"
    },
    {
      id: 2,
      title: "Biceps exercise",
      imagePath: "./assets/img/test.png",
      text: "Lifting for the win fdsfsfhjdsfsfhjsfjshfkshfskjfhsjkfshfkdsjfhsjkfhsfksjhf"
    }
  ]);

  private CalendarData = signal<CalendarDataType>({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
  });

  public getModules = () => this.modules();

  public setModule = (value: Module) =>
    this.modules.mutate(modules => modules.push(value));

  public updateModule = (nextValue: Module) =>
    this.modules.update(modules => {
      const index = modules.findIndex(m => m.id === nextValue.id);
      modules[index] = nextValue;

      return modules;
    });

  public getCalendarData = () => this.CalendarData();

  public setCalendarData = (module: Module, day: Days) =>
    this.CalendarData.mutate(data => {
      if (!data[day].some(x => x.id === module.id)) {
        data[day].push(module);
      }
    });

  public removeCalendarData = (id: number, day: Days) =>
    this.CalendarData.update(data => {
      const module = data[day].filter(x => x.id !== id);

      return { ...data, [day]: module };
    });
}
