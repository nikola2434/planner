import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types";

export const buildDevServer = (
  options: BuildOptions
): DevServerConfiguration => {
  return {
    port: options.port ?? 8000,
    open: false,
    historyApiFallback: true,
    hot: true,
  };
};
