import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { AppModule } from "./app.module";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("AppComponent", () => {
  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;
  let app: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [AppModule]
    });

    fixture = TestBed.createComponent(AppComponent);
    debugElement = fixture.debugElement;
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the app", () => {
    expect(app).toBeTruthy();
  });

  it("should render header", () => {
    // eslint-disable-next-line quotes
    const header = debugElement.query(By.css('[data-testid="app-header"]'));
    expect(header).toBeTruthy();
  });
});
