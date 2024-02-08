const fs = require('node:fs');
const prompt = require('prompt-sync')({ sigint: true });

let userSelect = ''
function menuDisplay() {
    console.log("TODO List")
    console.log("Press 1: Create a ToDo File");
    console.log("Press 2: Read a ToDo File");
    console.log("Press 3: Update a ToDo File");
    console.log("Press 4: Delete a ToDo File");
    console.log("Press 5: View the List of Files");
    console.log("Press 6: Add Something to the ToDo File");
    console.log("Press 7: Change the Name of the ToDo File");
    console.log("Press 8: Exit");
    userSelect = prompt("Enter Your Choice ");        
    switch (userSelect) {
        case '1':
            userSelect = '1'
            creatingFile();
            break;
        case '2':
            userSelect = '2'
            readingFile();
            break;
        case '3':
            userSelect = '3'
            updatingFile();
            break;
        case '4':
            userSelect = '4'
            deletingFile();
            break;
        case '5':
            userSelect = '5'
            viewingFile();
            break;
        case '6':
            userSelect = '6'
            appendingFile();
            break;
        case '7':
            userSelect = '7'
            renamingFile();
            break;
        default:
            break;
    }
}
function creatingFile() {
    viewingFile()
    let temp_title = prompt("Enter the Title ")
    let temp_Description = prompt("Enter the Description ");
    fs.writeFileSync(`${temp_title}.txt`,`${temp_Description}`)
}
function readingFile(){
    viewingFile()
    let temp_title = prompt("Enter Title of the List ")
    let contents = fs.readFileSync(`${temp_title}.txt`)
    console.log((`Here is the contents of your file ${contents}`));
    return(temp_title);
}
function updatingFile() {
    viewingFile()
    readingFile();
    let temp_title = prompt("Enter Title of the List ")
    let contents = prompt("Enter the New Description ");
    fs.writeFileSync(`${temp_title}.txt`,`${contents}`)
}
function deletingFile() {
    viewingFile()
    let temp_title = prompt("Enter Title of the List ")
    fs.unlinkSync(`${temp_title}.txt`)
}
function viewingFile() {
    let file_list = fs.readdirSync(__dirname)
    console.log("Here is the list of To Do files available")
    for (let index = 0; index < file_list.length; index++) {
        if(file_list[index].includes('.txt'))
        console.log(`${index}. ${file_list[index]}`);
    }
}
function appendingFile(){
    viewingFile();
    let temp_title = readingFile();
    let additionalDescription = prompt("Enter the Description you want to add in the File ");
    fs.appendFileSync(`${temp_title}.txt`,`${additionalDescription}`)
}
function renamingFile() {
    viewingFile();
    let old_temp_title = readingFile();
    let new_temp_title = prompt("Enter new File Name ");
    fs.renameSync(`${old_temp_title}.txt`,`${new_temp_title}.txt`)
}
do {
    menuDisplay();
} while (!(userSelect=='8'));