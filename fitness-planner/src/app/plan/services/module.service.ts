import { Injectable, signal } from "@angular/core";
import { CalendarDataType, Days, Module } from "../types";

@Injectable({
  providedIn: "root"
})
export class ModuleService {
  private modules = signal<Module[]>([]);

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

  public addModule = (value: Module) =>
    this.modules.mutate(modules => modules.push(value));

  public deleteModule = (id: number) =>
    this.modules.update(modules => modules.filter(module => module.id !== id));

  public updateModule = (nextValue: Module) => {
    const index = this.getModules().findIndex(m => m.id === nextValue.id);

    if (index === -1) {
      return false;
    }

    this.modules.mutate(modules => {
      modules[index] = nextValue;

      return modules;
    });

    return true;
  };

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
