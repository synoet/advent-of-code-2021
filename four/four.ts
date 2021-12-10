import * as fs from "fs";
import * as path from "path";

interface BoardTile {
    value: string;
    marked: boolean;
};


class Board{
    tiles: Array<Array<BoardTile>>;
    marks: Array<string>;

    constructor(state: Array<Array<string>>){
        this.tiles = state
            .map(x => x.map((item: string): BoardTile => {
                return {value: item, marked: false} as BoardTile;
            }));
        this.marks = [];
    }

    checkTile(value: string): boolean {
        return this.tiles
            .map((x: any) => x.filter((tile: BoardTile) => tile.value === value))
            .filter((x: any) => x.length)
            .length ? true : false;
    }

    mark(value: string): void{
        if(!this.checkTile(value)) return;
        for(let row = 0; row < 5; row++){
            for(let col = 0; col < 5; col++){
                if(this.tiles[row][col].value === value){
                    this.tiles[row][col].marked = true;
                    this.marks.push(value);
                }
            }
        }
    }

    checkBoard(): boolean {
        let isWin: boolean = false;
        for(let i = 0; i < 5; i++){
            isWin = (this.tiles[i].filter(x => x.marked).length === 5
                || this.tiles.map(x => x[i]).filter(x => x.marked).length === 5) ? true : false;
            if(isWin) break;
        }
        return isWin;
    }

    sum(): number {
        let sum: number = 0

        for(let i =0; i < this.tiles.length; i++)
            for(let j = 0; j < this.tiles.length; j++)
                if (!this.tiles[i][j].marked) sum += parseInt(this.tiles[i][j].value, 10);

        return sum;
    }
}

const board = new Board([
    ['1', '2', '3', '4', '5'],
    ['6', '7', '8', '9', '10'],
    ['11', '12', '13', '14', '15'],
    ['16', '17', '18', '19', '20'],
    ['21', '22', '23','24', '25'],
])

function partOne(){
    const input = fs.readFileSync(path.join(__dirname, "input"))
        .toString()
        .split("\n")
        .filter(x => x.length);

    const numbers = input[0].split(',');

    let states = [];

    for(let i = 1; i < input.length; i += 5){
        let tempArray = []
        for(let j = i; j < (i + 5); j++) tempArray.push(input[j].split(' ').filter(x => x.length));
        states.push(tempArray);
    }

    const boards: Array<Board> = states.map(x => new Board(x));

    let winBoard: Board | undefined = undefined;

    for(let i = 0; i < numbers.length; i++){
        for(let j = 0; j < boards.length; j++){
            boards[j].mark(numbers[i]);
            if (boards[j].checkBoard()){
                winBoard = boards[j]
                break;
            }
        }
        if(winBoard) break;
    }

    console.log("Day 4, Part 1: ", winBoard?.sum() as number * parseInt(winBoard?.marks.pop() as string, 10));
}

partOne();
