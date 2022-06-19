process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}
const traversalBFS = (matrix) => {
    let n = matrix.length
    let m = matrix[0].length
    //arr con las distancias 
    let posiciones =new Array(n).fill().map(() => new Array(m).fill(0))
    //arr con las direcciones de los nodos
    let vecinos =[[-1, 0],[0, 1],[1, 0],[0, -1]] 
     //arr de cola,aqui se guardan los nodos con 1     
    const queue = [];
    //arr para constar las direcciones visitadas
    const seen = new Array(n).fill('').map(() => new Array(m).fill(false));
    function In(row,col){
      //condiciones para que la direccion este dentro de la matrix
      return row>=0 && row<n && col>=0 && col<m 
    }
    for(let index = 0;index < n;index++){
      for(let j = 0;j<m;j++){
        if(matrix[index][j]=='1'){
          posiciones[index][j] = 0;
          seen[index][j] = true;
          queue.push([index,j]);//todas las direcciones de los 1 en cola
        }
      }
    }
    while (queue.length) { //BFS
      const actualPos = queue.shift();//sacamos de cola la 1era direccion 
      const row = actualPos[0];
      const col = actualPos[1];              
      for (let dir = 0;dir < 4 ; dir ++){//visitar a direcciones vecinas
        let newRow = row + vecinos[dir][0]
        let newCol = col + vecinos [dir][1]
       
        if(In(newRow,newCol) && !seen[newRow][newCol]){//solo para direcciones no vistas y dentro de la matrix
          seen[newRow][newCol] = true;
          queue.push([newRow, newCol])
          posiciones[newRow][newCol] = posiciones[row][col] +1 
        }
      }
    
      }//print a las distancias
      for (let row = 0; row < n; row++) {
       for (let col = 0; col < m; col++) {
         process.stdout.write(posiciones[row][col]+' ')
       }process.stdout.write('\n')
      }process.stdout.write('\n')        
      
}
function main() {
    

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        let n = readLine().split(' ');
        
        n = parseInt(n[0], 10);// longitud de matrix
        let m = parseInt(n[1], 10);//cantidad de bits
        let matrix = [];
        

      for (let i = 0; i < n; i++) {
      	let gridItem = readLine().split('');
      	for (let j = 0; j <m ; j++){
        gridItem[j] = parseInt(gridItem[j])
        
    }matrix.push(gridItem);}
        
        currentLine++;
       
        traversalBFS(matrix);
        
        
    }
    process.exit();
    
}