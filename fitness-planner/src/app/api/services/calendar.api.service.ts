import { Injectable } from "@angular/core";
import { ApiCalendarPath } from "../endpoints";
import { BaseApiService } from "./base.api.service";

@Injectable()
export class CalendarApiService extends BaseApiService<typeof ApiCalendarPath> {
  constructor() {
    super(ApiCalendarPath);
  }
}
