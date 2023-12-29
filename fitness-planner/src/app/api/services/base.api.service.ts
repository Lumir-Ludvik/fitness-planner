import { ApiBasePath } from "../endpoints";
import { ModuleBE } from "../../models/plan/types";
import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { Guid } from "guid-typescript";

export class BaseApiService<T extends ApiBasePath> {
  protected readonly httpClient: HttpClient = inject(HttpClient);

  constructor(private readonly apiPath: T) {}

  public getAll() {
    return this.httpClient.get(this.apiPath.getAll());
  }

  public get(id: Guid) {
    return this.httpClient.get(this.apiPath.get(id));
  }

  public add(module: ModuleBE) {
    return this.httpClient.post(this.apiPath.add(), module);
  }

  public update(module: ModuleBE) {
    return this.httpClient.put(this.apiPath.update(), module);
  }

  public delete(id: Guid) {
    return this.httpClient.delete(this.apiPath.delete(id));
  }
}
