let windowW;
let windowH;
let size=10;
let grid;
let rows;
let cols;
let timer=0;
let life=2;

function setup() {
	windowW=windowWidth-(windowWidth%size);
	windowH=windowHeight-(windowHeight%size);
	createCanvas(windowW,windowH);
	rows=height/size;
	cols=width/size;
	grid=createGrid(cols,rows);
	//console.table(grid);
	//frameRate(120);
}

function draw() {
	background(100);
	drawGrid();
	grid=generateNext();
}

function generateNext(){
	let next=makeGrid(cols,rows);
	let count=0;
	for(let i=0; i<cols; i++){
		for(let j=0; j<rows; j++){
			count=countNeigbours(i,j);
			if(grid[i][j]==0&&count==3){
				next[i][j]=1;
			}else if(grid[i][j]==1&&(count<2||count>3)){
				next[i][j]=0;
			}else{
				next[i][j]=grid[i][j];
			}
		}
	}
	return next;
}

function countNeigbours(x,y){
	let count=0;
	for(let i=-1; i<=1; i++){
		for(let j=-1; j<=1; j++){
			count+=grid[(cols+x+i)%cols][(rows+y+j)%rows];
		}
	}
	count-=grid[x][y];
	return count;
}

function drawGrid(){
	let posx, posy;
	for(let i=0; i<cols; i++){
		for(let j=0; j<rows; j++){
			posx=i*size;
			posy=j*size;
			if(grid[i][j]){
				fill(10);
			}else{
				fill(250);
			}
			//noStroke();
			stroke(0);
			rect(posx,posy,size,size);
		}
	}
}

function createGrid(cols, rows){
	let grid=makeGrid(cols, rows);
	// fill the grid
	for(let i=0; i<cols; i++){
		for(let j=0; j<rows; j++){
			grid[i][j]=floor(random(2));
		}
	}
	return grid;
}

function makeGrid(col, row){
	let arr=[];
	for(let i=0; i<col; i++){
		arr[i]=[];
		for (let j = 0; j < row; j++) {
			arr[i][j]=0;
		}
	}
	return arr;
}
