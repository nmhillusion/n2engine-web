import * as fs from "fs";
import { TraversalCallback } from "../model/TraversalCallback";

export class TraversalWorkspace {
  private listeners: TraversalCallback[] = [];

  private __traversal(startDir: string, callback: (filePath: string) => any) {
    const dirList = fs.readdirSync(startDir);

    for (const pItem of dirList) {
      const pItemPath = `${startDir}/${pItem}`;

      const itemState = fs.lstatSync(pItemPath);
      if (itemState.isDirectory()) {
        this.__traversal(pItemPath, callback);
      } else if (itemState.isFile()) {
        callback(pItemPath);
      }
    }
  }

  private __callbackTraversal(filePath: string) {
    if (this.listeners) {
      for (const listener of this.listeners) {
        listener?.invoke(filePath);
      }
    }
  }

  public registerCallback(callback: TraversalCallback) {
    if (callback) {
      this.listeners.push(callback);
    }
  }

  public traversalPath(startDir: string) {
    this.__traversal(startDir, this.__callbackTraversal.bind(this));
  }
}
