export declare class FileSystemHelper {
    static getFileNameFromPath(path: string): string;
    static getDirFromPath(path: string): string;
    static writeOutFile({ data, sourceFilePath, rootDir, outDir, outExtension, }: {
        data: string;
        sourceFilePath: string;
        rootDir: string;
        outDir: string;
        /**
         * Example: .jpg | .png | .txt
         */
        outExtension: string;
    }): void;
}
