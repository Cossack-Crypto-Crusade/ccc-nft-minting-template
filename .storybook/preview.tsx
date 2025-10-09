import React from "react";
import type { Preview, Decorator, StoryFn, StoryContext } from "@storybook/nextjs-vite";
import { NftProvider } from "../src/components/NftProvider";
import "../src/styles/globals.css";

const withProviders: Decorator = (Story: StoryFn, context: StoryContext) => (
  <NftProvider>
    <div className="bg-gray-950 text-white min-h-screen p-6">
      <Story {...context} />
    </div>
  </NftProvider>
);

const preview: Preview = {
  decorators: [withProviders],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
    layout: "centered",
  },
};

export default preview;
