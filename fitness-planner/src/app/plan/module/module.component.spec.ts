import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ModuleComponent } from "./module.component";
import { PlanModule } from "../plan.module";
import { b64toBlob } from "../../../utils/img-utils";
import { TEST_IMAGE } from "../../testing/mocks/test-image-base64";
import { expectMultipleTexts, findEl } from "../../testing/utils";
import spyOn = jest.spyOn;
describe("ModuleComponent", () => {
  let fixture: ComponentFixture<ModuleComponent>;
  let module: ModuleComponent;
  const id = 1;
  const title = "I the big biceps";
  const text = "I wish I was a big biceps";
  const image = { filename: "big-biceps", data: b64toBlob(TEST_IMAGE) };
  const imageUrl =
    "blob:http://localhost:4200/6d3a10d2-cf4e-42dc-b5d6-b87e8f5ca803";
  const urlCreateObjectSpy = spyOn(
    window.URL,
    "createObjectURL"
  ).mockReturnValue(imageUrl);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PlanModule],
      declarations: [ModuleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ModuleComponent);
    module = fixture.componentInstance;
    module.id = id;
    module.text = text;
    module.title = title;
    module.image = image;

    module.ngOnInit();
    fixture.detectChanges();
  });

  it("should receive required text inputs", () => {
    expectMultipleTexts(
      fixture,
      ["module-text", "module-title"],
      [text, title]
    );
  });

  it("should have imageUrl", () => {
    const img = findEl(fixture, "module-image");

    expect(urlCreateObjectSpy).toHaveBeenCalledWith(imageUrl);

    expect(
      module.imageUrl !== null && img.nativeElement.src === module.imageUrl
    ).toBeTruthy();
  });
});
