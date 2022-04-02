const fs = require('fs-extra');
const path = require('path');
const utils = require('./utils')

const foldersTypesDictionary = {
    'Documents': ['txt', 'docx', 'rtf', 'pages', 'csv', 'xlsx', 'pdf'],
    'Programs': ['exe', 'dmg', 'app', 'pkg', 'dll', 'msi'],
    'Archives': ['zip', 'rar'],
    'Images': ['png', 'jpg', 'psd', 'jpeg', 'bmp'],
    'Other': ['ini']
};

const getAllExts = (listOfFiles, downloadsDir) => {
    let handledExts = []
    Object.values(foldersTypesDictionary).forEach(extensions => { extensions.forEach(ext => handledExts.push(ext)) })
    // [ [],  [],  [] ]
    // ['txt', 'docx', 'rtf', 'pages', 'csv', 'xlsx', 'pdf', 'exe', 'dmg', 'app', 'pkg', 'dll', 'msi', 'zip', 'rar']

    listOfFiles.map((file) => {
        const filePath = path.join(downloadsDir, file)
        const fileData = path.parse(filePath)
        let fileExt = utils.cleanExtension(fileData.ext)
        // console.log(fileExt)
        if (!handledExts.includes(fileExt)) {
            handledExts.push(fileExt)
            console.log('Added ext|' + fileExt, '|')
            console.log(fileData);
        }
    })
    return handledExts
};

const downloadsDir = path.join('C:', 'Users', 'kolia', 'Downloads')
const listOfFiles = fs.readdirSync(downloadsDir)
console.log('Result:', getAllExts(listOfFiles, downloadsDir));