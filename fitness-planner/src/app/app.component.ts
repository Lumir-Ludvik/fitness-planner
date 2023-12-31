import { Component } from "@angular/core";
import { HeaderNavBarButton } from "../stories/header.component.types";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  readonly NAV_BAR_BUTTONS: HeaderNavBarButton[] = [
    {
      text: "Plan",
      redirectUrl: "/plan"
    },
    {
      text: "List of activities",
      redirectUrl: "/activities"
    },
    {
      text: "Add activity",
      redirectUrl: "/activity-form"
    }
  ];
}
