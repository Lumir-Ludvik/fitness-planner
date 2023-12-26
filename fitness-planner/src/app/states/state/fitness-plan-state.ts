import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { FitnessPlanStateType } from "../../models/plan/types";
import {
  AddModule,
  DeleteModule,
  RemoveCalendarData,
  SetCalendarData,
  UpdateModule
} from "../actions/fitness-plan-state-actions";
import { b64toBlob } from "../../../utils/img-utils";
import { TEST_IMAGE } from "../../testing/mocks/test-image-base64";

@State<FitnessPlanStateType>({
  name: "FitnessPlan",
  defaults: {
    modules: [
      {
        id: 1,
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
  @Selector([FitnessPlanState])
  static getModules(state: FitnessPlanStateType) {
    return state.modules;
  }

  @Selector([FitnessPlanState])
  static getCalendarData(state: FitnessPlanStateType) {
    return state.calendarData;
  }

  @Action(AddModule)
  addModule(ctx: StateContext<FitnessPlanStateType>, action: AddModule) {
    const state = ctx.getState();

    ctx.setState({
      ...state,
      modules: [...state.modules, action.module]
    });
  }

  @Action(DeleteModule)
  deleteModule(ctx: StateContext<FitnessPlanStateType>, action: DeleteModule) {
    const state = ctx.getState();

    ctx.setState({
      ...state,
      modules: state.modules.filter(module => module.id !== action.id)
    });
  }

  @Action(UpdateModule)
  updateModule(ctx: StateContext<FitnessPlanStateType>, action: UpdateModule) {
    const state = ctx.getState();
    const moduleIndex = state.modules.findIndex(
      module => module.id === action.nextModule.id
    );

    if (moduleIndex === -1) {
      return;
    }

    const nextModules = [...state.modules];
    nextModules[moduleIndex] = action.nextModule;

    ctx.setState({
      ...state,
      modules: nextModules
    });
  }

  @Action(SetCalendarData)
  setCalendarData(
    ctx: StateContext<FitnessPlanStateType>,
    action: SetCalendarData
  ) {
    const state = ctx.getState();

    const nextCalendar = { ...state.calendarData };
    nextCalendar[action.day] = [...nextCalendar[action.day], action.module];

    ctx.setState({
      ...state,
      calendarData: nextCalendar
    });
  }

  @Action(RemoveCalendarData)
  removeCalendarData(
    ctx: StateContext<FitnessPlanStateType>,
    action: RemoveCalendarData
  ) {
    const state = ctx.getState();
    const nextCalendarData = { ...state.calendarData };

    nextCalendarData[action.day] = nextCalendarData[action.day].filter(
      module => module.id !== action.id
    );

    ctx.setState({
      ...state,
      calendarData: nextCalendarData
    });
  }
}
