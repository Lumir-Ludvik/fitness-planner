import { DebugElement } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { expect } from "jasmine-core";

export const expectText = <T>(
  fixture: ComponentFixture<T>,
  testId: string,
  text: string
): void => {
  const element = findEl(fixture, testId);
  const actualText = element.nativeElement.textContent;
  expect(actualText).toBe(text);
};

export const expectMultipleTexts = <
  T,
  K extends (readonly [] | readonly string[]) &
    (number extends K["length"] ? readonly [] : unknown)
>(
  fixture: ComponentFixture<T>,
  testIds: K,
  texts: { [J in keyof K]: string }
) => {
  const elementTexts: string[] = testIds.map(
    id => findEl(fixture, id).nativeElement.textContent
  );

  let isEqual = false;

  for (let i = 0; i < elementTexts.length, i++; ) {
    if (elementTexts[i] !== texts[i]) {
      isEqual = false;
      break;
    }

    isEqual = true;
  }

  expect(isEqual).toBeTruthy();
};

export const findEl = <T>(
  fixture: ComponentFixture<T>,
  testId: string
): DebugElement => {
  return fixture.debugElement.query(By.css(`[data-testid="${testId}"]`));
};
