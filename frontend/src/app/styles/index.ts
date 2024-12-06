// theme.ts (Version 2 needs to be a tsx file, due to usage of StyleFunctions)
import { extendTheme } from "@chakra-ui/react";

// Version 1: Using objects
export const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      html: {
        height: "100dvh",
      },
      body: {
        height: "100dvh",
      },
    },
  },
});
