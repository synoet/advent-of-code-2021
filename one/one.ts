import * as fs from "fs";
import * as path from "path";

const depths = fs.readFileSync(path.join(__dirname, "testinput"))
    .toString()
    .split("\n")
    .filter(x => x.length)
    .map(x => +x);

function part1() {
    let counter = 0;

    for (let i = 0; i < depths.length; ++i) if (depths[i] > depths[i-1]) counter++

    console.log("Day 1, Part 1:" + counter);
}

function part2() {
    let counter = 0

    let before = depths[0]

    for (let i = 3; i < depths.length; ++i){
        if(before < depths[i]) counter++
        before = depths[i- 2]
    }

    console.log("Day 2, Part 2:" + counter);
}

part1();
part2();
