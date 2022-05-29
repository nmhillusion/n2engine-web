export interface RenderConfig {
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
