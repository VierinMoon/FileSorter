const path = require('path')
const readline = require('readline');
const { execSync } = require("child_process");


const selectWorkingDirectory = () => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    const processAnswer = (answer) => {
        console.log(`Окей, ты выбрал юзера: ${answer}`);
        const resultPath = path.join('C:', 'Users', answer)
        console.log('Result Path:', resultPath)

        const result = execSync("explorer " + resultPath)
        console.log(result.toString())
        rl.close();
    }

    rl.question('Как зовут твоего юзера?', processAnswer);
}


module.exports = { 
    selectWorkingDirectory
}



