export interface TraversalCallback {
  get name(): string;
  invoke(filePath: string): Promise<void>;
}
