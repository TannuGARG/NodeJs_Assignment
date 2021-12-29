function getNameFromCommandLine() {
    // Write you code here, name should be taken as args in process.argv
    // process.argv=[...process.argv,"Yash"]
    // return process.argv[2]
    return process.argv[2];
    
}

function getNameFromEnv() {
    // process.env.name= "Yash";
    return process.env.name
}

function getNameFromReadLine() {
    // Write your code here
    const readline=require("readline");
    const element=readline.createInterface({input:process.stdin,output:process.stdout});
    element.question((userInput)=>{
        return userInput;
    })
    
}

module.exports = {
    getNameFromCommandLine,
    getNameFromEnv,
    getNameFromReadLine
}