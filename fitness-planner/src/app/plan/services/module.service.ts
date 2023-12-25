import { Injectable, signal } from "@angular/core";
import { CalendarDataType, Days, Module } from "../../models/plan/types";
import { b64toBlob } from "../../../utils/img-utils";
import { TEST_IMAGE } from "../../testing/mocks/test-image-base64";

@Injectable({
  providedIn: "root"
})
export class ModuleService {
  private modules = signal<Module[]>([
    {
      id: 1,
      image: { data: b64toBlob(TEST_IMAGE), filename: "big-biceps" },
      title: "I the big biceps",
      text: "I wish I was a big biceps"
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
