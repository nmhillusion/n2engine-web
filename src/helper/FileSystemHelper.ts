import * as fs from "fs";
import * as path from "path";

export class FileSystemHelper {
  static getFileNameFromPath(path_: string, ignoreExt = true): string {
    // {
    //   const slashIndex = path_.lastIndexOf("/");
    //   if (-1 < slashIndex && slashIndex < path_.length - 1) {
    //     path_ = path_.substring(slashIndex + 1);
    //   }
    // }

    // {
    //   const dotIndex = path_.lastIndexOf(".");
    //   if (0 < dotIndex && ignoreExt) {
    //     path_ = path_.substring(0, dotIndex);
    //   }
    // }

    // return path_;
    const baseName = path.basename(path_);
    return baseName.includes(".")
      ? baseName.substring(0, baseName.lastIndexOf("."))
      : baseName;
  }

  static getDirFromPath(path_: string) {
    // const fileState = fs.lstatSync(path_);
    // if (fileState.isFile()) {
    //   const slashIndex = path_.lastIndexOf("/");
    //   if (-1 < slashIndex && slashIndex < path_.length - 1) {
    //     path_ = path_.substring(0, slashIndex);
    //   }
    // }
    // return path_;

    return path.dirname(path_);
  }

  static writeOutFile({
    data,
    sourceFilePath,
    rootDir,
    outDir,
    outExtension = ".dat",
  }: {
    data: string;
    sourceFilePath: string;
    rootDir: string;
    outDir: string;
    /**
     * Example: .jpg | .png | .txt
     */
    outExtension: string;
  }) {
    const outFileName = FileSystemHelper.getFileNameFromPath(sourceFilePath);
    const inputFileDir = FileSystemHelper.getDirFromPath(sourceFilePath);
    const outFileDir = inputFileDir.replace(rootDir, outDir);
    const fullOutFilePath = outFileDir + "/" + outFileName + outExtension;

    fs.mkdirSync(outFileDir, { recursive: true });
    fs.writeFileSync(fullOutFilePath, data, {
      mode: 0o666,
    });
  }

  static copyFile({
    sourceFilePath,
    rootDir,
    outDir,
  }: {
    sourceFilePath: string;
    rootDir: string;
    outDir: string;
  }) {
    const outFileName = FileSystemHelper.getFileNameFromPath(
      sourceFilePath,
      false
    );
    const inputFileDir = FileSystemHelper.getDirFromPath(sourceFilePath);
    const outFileDir = inputFileDir.replace(rootDir, outDir);
    const fullOutFilePath = outFileDir + "/" + outFileName;

    if (!fs.existsSync(outFileDir)) {
      fs.mkdirSync(outFileDir, { recursive: true });
    }

    fs.copyFileSync(sourceFilePath, fullOutFilePath);
  }
}
