import { Injectable } from "@angular/core";
import { ApiModulePath } from "../endpoints";
import { BaseApiService } from "./base.api.service";

@Injectable()
export class ModuleApiService extends BaseApiService<typeof ApiModulePath> {
  constructor() {
    super(ApiModulePath);
  }
}
