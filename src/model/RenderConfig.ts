export interface RenderConfig {
  baseDir: string;
  rootDir: string;
  outDir: string;
  pug: {
    enabled: boolean;
  };
  scss: {
    enabled: boolean;
  };
  typescript: {
    enabled: boolean;
  };
}
