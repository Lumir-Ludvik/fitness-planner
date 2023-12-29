import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import {
  FitnessPlanStateType,
  Module,
  ModuleBE
} from "../../models/plan/types";
import {
  AddModule,
  APIErrorResponse,
  APISuccessResponse,
  DeleteModule,
  GetFitnessPlanData,
  RemoveCalendarData,
  SetCalendarData,
  UpdateModule
} from "../actions/fitness-plan-state-actions";
import { b64toBlob, blobToBase64 } from "../../utils/img-utils";
import { TEST_IMAGE } from "../../testing/mocks/test-image-base64";
import { forkJoin } from "rxjs";
import { ModuleApiService } from "../../api/services/module.api.service";
import { CalendarApiService } from "../../api/services/calendar.api.service";
import { Guid } from "guid-typescript";

@State<FitnessPlanStateType>({
  name: "FitnessPlan",
  defaults: {
    modules: [
      {
        id: Guid.create(),
        image: { data: b64toBlob(TEST_IMAGE), filename: "big-biceps" },
        title: "I the big biceps",
        text: "I wish I was a big biceps"
      }
    ],
    calendarData: {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: []
    }
  }
})
@Injectable()
export class FitnessPlanState {
  constructor(
    private readonly moduleApiService: ModuleApiService,
    private readonly calendarApiService: CalendarApiService
  ) {}

  @Selector([FitnessPlanState])
  public static getModules(state: FitnessPlanStateType) {
    return state.modules;
  }

  @Selector([FitnessPlanState])
  public static getCalendarData(state: FitnessPlanStateType) {
    return state.calendarData;
  }

  @Action(GetFitnessPlanData)
  public getFitnessPlanData(
    ctx: StateContext<FitnessPlanStateType>,
    action: GetFitnessPlanData
  ) {
    forkJoin([
      this.moduleApiService.getAll(),
      this.calendarApiService.getAll()
    ]).subscribe({
      next: (data: [modules: Module[], monday: Module[]]) => {
        debugger;
        ctx.setState({
          modules: data[0],
          calendarData: {
            //TODO: fix API add mapping and services
            Monday: data[1],
            Tuesday: data[1],
            Wednesday: data[1],
            Thursday: data[1],
            Friday: data[1],
            Saturday: data[1],
            Sunday: data[1]
          }
        });
      },
      error: err => console.error(err)
    });
  }

  @Action(APISuccessResponse)
  public apiSuccessResponse(
    ctx: StateContext<FitnessPlanStateType>,
    action: APISuccessResponse<FitnessPlanStateType>
  ) {
    ctx.setState(action.data);
  }

  @Action(APIErrorResponse)
  public apiErrorResponse(ctx: StateContext<FitnessPlanStateType>) {
    //TODO: error handling
    ctx.setState(null);
  }

  @Action(AddModule)
  public async addModule(
    ctx: StateContext<FitnessPlanStateType>,
    action: AddModule
  ) {
    const state = ctx.getState();

    //TODO: add mapping on API side
    const nextModule: ModuleBE = {
      id: action.module.id,
      text: action.module.text,
      title: action.module.title,
      filename: action.module.image.filename,
      base64Img: await blobToBase64(action.module.image.data),
      //TODO: add content type
      contentType: "image/png"
    };

    this.moduleApiService.add(nextModule).subscribe({
      next: (nextModule: Module) => {
        ctx.setState({
          ...state,
          //TODO: add API mapping
          modules: [...state.modules, action.module]
        });
      },
      error: err => console.error(err)
    });
  }

  @Action(DeleteModule)
  public deleteModule(
    ctx: StateContext<FitnessPlanStateType>,
    action: DeleteModule
  ) {
    const state = ctx.getState();

    this.moduleApiService.delete(action.id);

    ctx.setState({
      ...state,
      modules: state.modules.filter(module => module.id !== action.id)
    });
  }

  @Action(UpdateModule)
  public async updateModule(
    ctx: StateContext<FitnessPlanStateType>,
    action: UpdateModule
  ) {
    const state = ctx.getState();
    const moduleIndex = state.modules.findIndex(
      module => module.id === action.nextModule.id
    );

    if (moduleIndex === -1) {
      return;
    }

    const nextModules = [...state.modules];
    nextModules[moduleIndex] = action.nextModule;
    //TODO: add mapping on API side
    const nextModule: ModuleBE = {
      id: action.nextModule.id,
      text: action.nextModule.text,
      title: action.nextModule.title,
      filename: action.nextModule.image.filename,
      base64Img: await blobToBase64(action.nextModule.image.data),
      //TODO: add content type
      contentType: "image/png"
    };
    this.moduleApiService.update(nextModule);

    ctx.setState({
      ...state,
      modules: nextModules
    });
  }

  @Action(SetCalendarData)
  public setCalendarData(
    ctx: StateContext<FitnessPlanStateType>,
    action: SetCalendarData
  ) {
    const state = ctx.getState();

    const nextCalendar = { ...state.calendarData };
    nextCalendar[action.day] = [...nextCalendar[action.day], action.module];

    //TODO: API handle day

    ctx.setState({
      ...state,
      calendarData: nextCalendar
    });
  }

  @Action(RemoveCalendarData)
  public removeCalendarData(
    ctx: StateContext<FitnessPlanStateType>,
    action: RemoveCalendarData
  ) {
    const state = ctx.getState();
    const nextCalendarData = { ...state.calendarData };

    nextCalendarData[action.day] = nextCalendarData[action.day].filter(
      module => module.id !== action.id
    );
    //TODO: API hande day

    ctx.setState({
      ...state,
      calendarData: nextCalendarData
    });
  }
}
