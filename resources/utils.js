const path = require('path')
const fs = require('fs-extra')
const readline = require('readline');
const { execSync } = require("child_process");


const selectWorkingDirectory = () => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    const processAnswer = (answer) => {
        // Get a name of a user
        console.log(`Окей, ты выбрал юзера: ${answer}`);
        let resultPath = path.join('C:', 'Users', answer)
        console.log('Result Path:', resultPath)

        // Open Downloads folder (inside a user)
        resultPath = path.join(resultPath, 'Downloads')
        // Open the path in File Explorer
        const resultRunningCommand = execSync("explorer " + resultPath)
        console.log("🚀 ~ file: utils.js ~ line 19 ~ processAnswer ~ resultRunningCommand", resultRunningCommand)
        rl.close();
    }

    rl.question('Как зовут твоего юзера?', processAnswer);
}

/**
 * Moves file or directory to a folder
 * @param {Path} fromPath File to move
 * @param {Path} toFolder Directory that should hold this file or folder
 */
const moveFiles = (fromPath, toFolder) => {
    //TODO: Return successful or not
    const fileName = path.parse(fromPath).name
    const extName = path.parse(fromPath).ext
    let fullFilename = fileName + extName;
    const workingToPath = path.join(toFolder, fullFilename)
    try {
        fs.moveSync(fromPath, workingToPath, { overwrite: true })
        console.log('Successfully moved file:', fullFilename);
        return true;
    } catch (error) {
        console.log(`Cannot move file ${fullFilename}. To ${workingToPath}`);
        return false;
    }
}

const cleanExtension = (ext) => ext.replace('.', '').toLowerCase()

module.exports = {
    selectWorkingDirectory,
    moveFiles,
    cleanExtension
}

