const path = require('path')
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


module.exports = { 
    selectWorkingDirectory
}

