import * as fs from "fs";
import * as path from "path";

 const rates = fs.readFileSync(path.join(__dirname, "input"))
    .toString()
    .split("\n")
    .filter(x => x.length)

function part1(){
    let gamma = ""
    let epsilon = ""
    for(let i = 0; i < rates[0].length; i++){
        let ones = rates.filter(x => x[i] === '1');
        let zeros = rates.filter(x => x[i] === '0');

        if (ones.length > zeros.length){
            gamma+= "1";
            epsilon+= "0";
        }else {
            gamma+="0";
            epsilon+="1";
        }
    }

    console.log("Day 3, Part 1: " + (parseInt(gamma, 2) * parseInt(epsilon, 2 )));
}

function part2(){
    let oxy = rates;
    let c02 = rates;

    for(let i = 0; i < rates[0].length; i++){
        if(oxy.length > 1){
            let oxyOnes = oxy.filter(x => x[i] === '1');
            let oxyZeros = oxy.filter(x => x[i] === '0');

            if(oxyOnes.length >= oxyZeros.length) oxy = oxyOnes;
            else oxy = oxyZeros;
        }

        if (c02.length > 1){
            let c02Ones = c02.filter(x => x[i] === '1');
            let c02Zeros = c02.filter(x => x[i] === '0');

            if(c02Ones.length >= c02Zeros.length) c02 = c02Zeros;
            else c02 = c02Ones;
        }
    }

    console.log("Day 3, Part 2: " + (parseInt(oxy[0], 2) * parseInt(c02[0], 2)));
}

part1();
part2();
