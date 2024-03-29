import { Component, EventEmitter, Input, Output } from "@angular/core";
import type { HeaderNavBarButton } from "./header.component.types";
import { CommonModule } from "@angular/common";
import { RouterTestingModule } from "@angular/router/testing";

@Component({
  selector: "storybook-header",
  standalone: true,
  templateUrl: "./header.component.html",
  imports: [CommonModule, RouterTestingModule],
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {
  @Input({ required: true }) title = "";
  @Input() navBarButtons: HeaderNavBarButton[] = [];

  @Output()
  navButtonClick = new EventEmitter();

  public onClick($event: MouseEvent) {
    this.navButtonClick.emit($event);
  }
}
