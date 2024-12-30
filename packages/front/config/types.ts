export interface BuildPaths {
  entry: string | Record<string, string>;
  html: string | Record<string, string>;
  public: string;
  output: string;
  src: string;
  packageJSON: string;
}

export type BuildMode = 'production' | 'development';

export interface BuildOptions {
  mode: BuildMode;
  port: number;
  paths: BuildPaths;
  alias: Record<string, string>;
}
