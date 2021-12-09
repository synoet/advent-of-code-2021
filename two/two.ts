import * as fs from "fs";
import * as path from "path";

const commands = fs.readFileSync(path.join(__dirname, "input"))
    .toString()
    .split("\n")
    .filter(x => x.length)
    .map(x => x.split(" "));


function part1(){
    let x = 0;
    let y = 0;

    for(let i = 0; i < commands.length; ++i){
        const val = parseInt(commands[i][1], 10);
        if (commands[i][0] === 'forward'){
            x += val;
        }else if(commands[i][0] === 'down'){
            y += val;
        }else if(commands[i][0] === 'up'){
            y -= val;
        }
    }

    console.log("Day 2, Part 1: " + x*y);
}

function part2(){
    let x = 0;
    let y = 0;
    let z = 0;

    for(let i = 0; i < commands.length; ++i){
        const val = parseInt(commands[i][1], 10);
        if (commands[i][0] === 'forward'){
            x += val;
            y += val*z;
        }else if(commands[i][0] === 'down'){
            z += val;
        }else if(commands[i][0] === 'up'){
            z -= val;
        }
    }

    console.log("Day 2, Part 2: " + x*y);

}

part1();
part2();
