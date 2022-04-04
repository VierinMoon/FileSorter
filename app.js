const utils = require('./resources/utils')
const path = require('path');
const fs = require('fs-extra');


//Открываем папку загрузок с введенным юзером
//--------------------------------------------------------
const foldersTypesDictionary = {
    'Documents': ['txt', 'docx', 'rtf', 'pages', 'csv', 'xlsx', 'pdf'],
    'Programs': ['exe', 'dmg', 'app', 'pkg', 'dll', 'msi'],
    'Archives': ['zip', 'rar'],
    'Images': ['png', 'jpg', 'psd', 'jpeg', 'bmp'],
    'Other': ['ini']
};
let handledExts = []
Object.values(foldersTypesDictionary).forEach(extensions => { extensions.forEach(ext => handledExts.push(ext)) });

const resultWorkingFunction = () => {
    const defaultUsername = require("os").userInfo().username
    __makeWorkFor(defaultUsername)
}

const __makeWorkFor = (username) => {
    const currentPath = path.join('C:', 'Users', username, 'Downloads')
    console.log('currentPath', currentPath);

    const downloadFolder = fs.readdirSync(currentPath) //Читаем содержимое папки 

    //---------------------------------------------------
    //Создаем папки под каждый тип файлов из Словаря
    const entriesFoldersDictionary = Object.entries(foldersTypesDictionary);
    entriesFoldersDictionary.forEach(entry => {   //Пробегаемся по словарю
        const downloadsFiles = path.join(currentPath, entry[0])    //Создаем путь для новых папок
        try {                                               //Проверяем сущетсвуют ли в директории папки из словаря. Если нет, создаем
            if (!fs.existsSync(downloadsFiles)) {
                fs.mkdirSync(downloadsFiles)
                console.log('Creating folder:', downloadsFiles);
            }
        } catch (err) {
            console.error(err)
        }
    });
    //-------------------------------------------------------------------------
    //Создаем массив из новых папок 
    let newFoldersArr = [];
    Object.entries(foldersTypesDictionary).forEach(entry => {
        const nameFolder = entry[0];
        newFoldersArr.push(nameFolder);
    });
    //------------------------------------------------------------
    //Проходимся по всем файлам внутри "Downloads"
    for (let i = 0; i < downloadFolder.length; i++) {
        const usedFileData = path.parse(downloadFolder[i])
        const extension = utils.cleanExtension(usedFileData.ext);
        if (newFoldersArr.includes(usedFileData.base))                           //Отбрасываем только что созданные папки
            continue
        else {
            const from = path.join(currentPath, usedFileData.base)   //Создаем путь для каждого элемента объекта

            if (extension) {                                                //Проверяем, есть ли окончание
                if (!handledExts.includes(extension)) {
                    console.log('We cannot detect folder for a file ext:', extension);
                    const to = path.join(currentPath, `Other`)                      //Если окончания нет, также отправляем в Other
                    utils.moveFiles(from, to)
                } else {
                    entriesFoldersDictionary.forEach(entry => {
                        //TODO: fix 4 times looping
                        let nameFolder = entry[0];
                        let possibleExtention = entry[1];

                        if (possibleExtention.includes(extension)) {                    //Если есть, проверяем входит ли оно в архив
                            const toFolder = path.join(currentPath, `${nameFolder}`)    //Создаем путь с соответсвующей папкой
                            utils.moveFiles(from, toFolder)                             //Перемещаем файл
                        }
                    });
                }
            } else {
                const to = path.join(currentPath, `Other`)                      //Если окончания нет, также отправляем в Other
                utils.moveFiles(from, to)
            }
        }
    }
}

module.exports = {
    resultWorkingFunction,
}

//Спрашиваем имя Пользователя
//С помощью полученного имени создаем путь до папки загрузок
//Читаем содержимое этой папки
//Создаем несколько папок дял каждого типа файлов (при наличии, используем существующие)
//Проходимся по всем файлам внутри "Downloads"
//По типу данных распределяем файлы по папкам -> Проверить не забрасываются ли созданные папки
//Желаем хорошего дня  user'у




/* if (arrFiles.length == 2) {                                     //Проверяем, является ли перебираемый элемент корректным файлом
        extention =  arrFiles[1];
        Object.entries(foldersTypesDictionary).forEach(entry => {             //Если да, сравниваем его значение после точки 
            //const folderOthers = `C:/Users/kolia/testFolderJS/Other` 
            const to = path.join(currentPath, 'Other')         //со значением из словаря (пока Others)
            nameFile = entry[0];
            possibleExtention = entry[1];
            if (possibleExtention.includes(extention)){                       //Если окончание сущетсвует в регистре, перемещаем файл в папку Other              
                console.log(`включает ${extention}`);
                // utils.moveFile(from, to)                             
            }
        });
    } else {
        console.log(`Не включает ${extention}`);
        
        // 
        // utils.moveFile(from, to)
    }*/