import * as readline from "node:readline/promises";
import {stdin, stdout} from "node:process"

import chalk from 'chalk';

import { createFile, createFolder, deleteFile, deleteFolder, listItems, writeToFile } from "./utilsFunc.js";


const rl =  readline.createInterface({
    input: stdin,
    output: stdout
});

async function menu(){
    console.clear();
    console.log(chalk.blue.bold("\n 📁 File System Manager ------------->\n"));

    const option = [
        "Create Folder",
        "Create File",
        "Write to File",
        "Delete File",
        "Delete Folder",
        "List Items",
        "Exit"
    ]

    option.forEach((opt, i) => console.log(chalk.yellow(`${i + 1}.`) + chalk.white(` ${opt}`)));

    const answer = await rl.question(chalk.cyan("\n Select option: "));

    switch(answer){
        case "1":
            const folderPath = await rl.question(chalk.cyan("Folder Path: "));
            await createFolder(folderPath);
            console.log(chalk.green("✅ Folder Created"));
            break;
        case "2":
            const filePath = await rl.question(chalk.cyan("File Path: "));
            const initialContent = await rl.question(chalk.cyan("Initial Content: "));
            await createFile(filePath, initialContent);
            console.log(chalk.green("✅ File Created"));
            break;
        case "3":
            const appendFilePath = await rl.question(chalk.cyan("File Path: "));
            const appendContent = await rl.question(chalk.cyan("Content: "));
            await writeToFile(appendFilePath, appendContent);
            console.log(chalk.green("✅ File Content Added"));
            break;
        case "4":
            const deleteFilePath = await rl.question(chalk.cyan("File to Delete: "));
            await deleteFile(deleteFilePath);
            console.log(chalk.green("✅ File Deleted"));
            break;
        case "5":
            const deleteFolderPath = await rl.question(chalk.cyan("Folder to Delete: "));
            await deleteFolder(deleteFolderPath);
            console.log(chalk.green("✅ Folder Deleted"));
            break;
        case "6":
            const listPath = await rl.question(chalk.cyan("Folder path (Enter for current): "));
            const items = await listItems(listPath || "./");
            console.log(chalk.blue("\nContents: "));
            
            items.forEach((item) => {
                const icon = item.type === "folder" ? "📁" : "🗎";
                console.log(`${icon} ${chalk.yellow(item.name)}`);
            });
            break;
        case "7":
            rl.close();
            return;
        default:
            console.log(chalk.red("⛔ Invalid option!"));
    }

    await rl.question(chalk.gray("\n Press Enter to continue..."));
    menu();
}

menu();