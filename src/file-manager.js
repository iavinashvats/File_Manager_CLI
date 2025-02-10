import * as readline from "node:readline/promises";
import {stdin, stdout} from "node:process"

import chalk from 'chalk';

import { createFile, createFolder, writeToFile } from "./utilsFunc.js";


const rl =  readline.createInterface({
    input: stdin,
    output: stdout
});

async function menu(){
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
            const filePath2 = await rl.question(chalk.cyan("File Path: "));
            const content = await rl.question(chalk.cyan("Content: "));
            await writeToFile(filePath2, content);
            console.log(chalk.green("✅ File Updated"));
            break;
        case "4":

    }
}

menu();