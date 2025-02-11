import * as fs from "node:fs/promises"
import path from "node:path";

export async function listItems(listPath = "./"){
    const items = await fs.readdir(listPath, {withFileTypes:true});
    return items.map((item) =>{
        return {
            name: item.name,
            type: item.isDirectory() ? "folder" : "file",
            path: path.join(import.meta.dirname, item.name), 
        };
    });
}

export async function createFile(pathname, content = " ") {
    await fs.writeFile(pathname, content);
}

export async function createFolder(folderName) {
    await fs.mkdir(folderName, {recursive:true});
}

export async function writeToFile(pathname, content = " ") {
        await fs.appendFile(pathname, content);
}

export async function readFile(pathname) {
    const data = await fs.readFile(pathname, "utf-8");
    console.log("data:", data)
}

export async function deleteFile(filePath) {
    await fs.unlink(filePath);
}

export async function deleteFolder(folderPath) {
    await fs.rm(folderPath, {recursive:true});
}