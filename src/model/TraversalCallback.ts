export interface TraversalCallback {
  invoke(filePath: string): Promise<void>;
}
