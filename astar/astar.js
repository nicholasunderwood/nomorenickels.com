function pause(){
    console.log('pause');
    pathGenerator.isPaused = !pathGenerator.isPaused;
    if(!pathGenerator.isPaused) { pathGenerator.step(1); console.log('resume') }
    $('#play').text(pathGenerator.isPaused ? 'Play' : 'Pause');
}

function handleEndPoints(node) {
    if(node.state == NodeState.Wall) return;
    if(!startNode || endNode) {
        if(startNode && endNode) { clearGrid(false); console.log('reset') }

        node.setState(NodeState.Start)
        
        startNode = node;
        setState(false)
    } else {
        node.setState(NodeState.End);
        node.h = 0;
        endNode = node;
        
        startNode.h = Node.calcDist(startNode, endNode)
        setState(true);
        pathGenerator.generatePath(startNode, endNode, shouldAnimate, includeCorners);
    }
}

function clearGrid (clearWalls) {
    console.log('clear');
    for(let y = 0; y < gridHeight; y++){
        for(let x = 0; x < gridWidth; x++){
            if(!clearWalls && grid[y][x].state == NodeState.Wall) continue;
            grid[y][x].clear();
        }
    }
    startNode = null; endNode = null;
    path = null;
    setState(false)
}


function setState(isPathing){
    // $('#play,#next').attr('disabled', !isPathing);
}

function mousePressed(e) {
    e.preventDefault();
    let td = $(e.currentTarget)
    let node = grid[+td.attr('y')][+td.attr('x')];
    if(!node) return;
    if(e.buttons == 1){
        handleEndPoints(node);
    } else if(e.buttons == 2){
        isRemovingWall = node.state == NodeState.Wall;
        console.log(isRemovingWall)
        node.setState(isRemovingWall ? NodeState.None : NodeState.Wall)
    }
}

function mouseMoved(e) {
    if(e.buttons != 2) return;
    let td = $(e.currentTarget)
    let node = grid[+td.attr('y')][+td.attr('x')];
    node.setState(isRemovingWall ? NodeState.None : NodeState.Wall)
}

function genMaze(){
    clearGrid(true);
    maze.start(grid[1][1]);
    $('#maze').text('Finish Maze').unbind('click').on('click', () => {
        maze.finishMaze();
        $('#maze').text('Generate Maze').unbind('click').on('click', genMaze);
    });
}

const gridWidth = 51, gridHeight = 33, nodeSize = 20;
const grid = [];
const sqrt2 = Math.sqrt(2);
const maze = new Maze(grid);
const pathGenerators = [new Astar(grid), new Dikstra(grid)];
var pathGenerator = pathGenerators[0];
var startNode = null, endNode = null, path = null;
var isRemovingWall = false;
var shouldAnimate = true;
var includeCorners = false;

$(document).ready(() => {
    console.log('ready')
    $('#play').on('click', pause);
    $('#next').on('click', () => pathGenerator.step());
    $('#clear').on('click', () => clearGrid(true));
    $('#maze').on('click', genMaze);
    setState(false);

    $('#animate').on('change', () => { shouldAnimate = !shouldAnimate});
    $('#jump').on('change', () => { includeCorners = !includeCorners });
    $('#algorithm').on('change', () => {pathGenerator = pathGenerators[+$('#algorithm').val()] })
    
    for(let y = 0; y < gridHeight; y++){
        grid.push([]);
        let tr = $('<tr></tr>');
        for(let x = 0; x < gridWidth; x++){
            grid[y].push(new Node(x,y,$(`<td x=${x} y=${y}></td>`)));
            tr.append(grid[y][x].td);
        }
        $('#table').append(tr);
    }

    $('td').on('mousedown', mousePressed)
        .on('mouseover', mouseMoved)
        .on('contextmenu', e => e.preventDefault());
});

console.log('load')