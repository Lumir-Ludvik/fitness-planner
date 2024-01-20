import type { Meta, StoryObj } from "@storybook/angular";
import { argsToTemplate } from "@storybook/angular";

import { HeaderComponent } from "./header.component";
import { action } from "@storybook/addon-actions";
import { userEvent, waitFor, within } from "@storybook/test";

const actionData = {
  onNavButtonClick: action("onNavButtonClick")
};

const meta: Meta<HeaderComponent> = {
  title: "Example/Header",
  component: HeaderComponent,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  render: (args: HeaderComponent) => ({
    props: {
      ...args,
      navButtonClick: args.navButtonClick
    },
    template: `<storybook-header ${argsToTemplate(args)} ></storybook-header>`
  }),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;
type Story = StoryObj<HeaderComponent>;

export const Header: Story = {
  args: { title: "Header Title", navBarButtons: [] }
};

export const HeaderWithNavBar: Story = {
  args: {
    title: "Header Title",
    navBarButtons: [
      { text: "First page", redirectUrl: "/first" },
      { text: "Second page", redirectUrl: "/second" }
    ]
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole("button");

    await step("Click on all buttons", () => {
      buttons.forEach(button => {
        waitFor(() => userEvent.hover(button), { interval: 1000 });
      });
    });
  }
};
