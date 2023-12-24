import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed
} from "@angular/core/testing";
import { MenuComponent } from "./menu.component";
import { AppModule } from "../../app.module";

describe("MenuComponent", () => {
  let fixture: ComponentFixture<MenuComponent>;
  let app: MenuComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuComponent],
      imports: [AppModule],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }]
    });

    fixture = TestBed.createComponent(MenuComponent);
    app = fixture.componentInstance;
  });

  it("should create the app", () => {
    expect(app).toBeTruthy();
  });

  it("should have data or be empty array", () => {
    expect(app.modules.length).toBeGreaterThanOrEqual(0);
  });
});
