function play () {
    console.log('play', startNode, endNode, path, ani)
    if(startNode && endNode && !path){
        ani = setInterval(step, 10);
        $('#play').text('Pause').unbind('click').on('click', pause);
    }
}

function pause(){
    console.log('pause')
    if(ani) clearInterval(ani);
    $('#play').text('Play').unbind('click').on('click', play);
}

function handleEndPoints(node) {
    if(node.state == NodeState.Wall) return;
    if(!startNode || endNode) {
        if(startNode && endNode) { clearGrid(false); console.log('reset') }

        node.setState(NodeState.Start)
        node.g = 0;
        startNode = node;
        setState(false)
    } else {
        node.setState(NodeState.End);
        node.h = 0;
        endNode = node;
        
        startNode.h = Node.calcDist(startNode, endNode)
        open.add(startNode);
        setState(true);
        play();
    }
}

function getSuroundingNodes(node, includeCorners) {
    let nodes = [];
    for(let y = Math.max(node.y-1, 0); y <= Math.min(node.y+1, gridHeight-1); y++) {
      for(let x = Math.max(node.x-1, 0); x <= Math.min(node.x+1, gridWidth-1); x++) {
        let neighbor = grid[y][x];
        if(!includeCorners && (x - node.x) * (y - node.y) != 0) continue;
        if(neighbor == node) continue;
        nodes.push(neighbor);
      }
    }
    return nodes;
}

function addToOpen(node) {
    open.add(node);
    if(node != startNode && node != endNode){
        node.setState(NodeState.Open);
    }
}

function addToClosed(node){
    open.delete(node);
    closed.add(node);
    if(node != startNode && node != endNode){
        node.setState(NodeState.Closed);
    }
}

function getPath(end){
    path = [end];
    let current = end.parent;
    while(current && current != startNode){
        path.push(current);
        current.setState(NodeState.Path);
        current = current.
        parent;
    }

    setState(false);
}

function step(){
    console.log('step')
    if(open.size == 0) {
        setState(false);
        alert("No possible path");
        return;
    };
    var current;
    open.forEach(node => {
        current = !current ? node : Node.getBestNode(current, node);
    });
    console.log(current, current.td[0])
    addToClosed(current);
    
    if(current === endNode){
        console.log('done');
        getPath(current);
        return;
    }
    let neighbors = getSuroundingNodes(current, false);
    console.log(neighbors)
    if(neighbors.length < 4 && current.x != 0 && current.y != 0 && current.x != gridWidth-1 && current.y != gridHeight-1)
        console.log(current, neighbors)

    neighbors.forEach(node => {
        console.log(node, closed.has(node), open.has(node), node.state == NodeState.Wall);
        if(closed.has(node) || open.has(node) || node.state == NodeState.Wall) return;
        let dist = Node.calcDist(node, current);
        if(dist + current.g >= node.g) return;
        
        node.g = dist + current.g;
        node.h = Node.calcDist(node, endNode);
        node.setParent(current);
        addToOpen(node);
    });
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
    open.clear(); closed.clear(); path = null;
    clearInterval(ani);
    setState(false)
}

function draw() {
    background(250);
    grid.forEach(row => row.forEach(node => {
        fill(...node.state)
        square(node.x * nodeSize, node.y * nodeSize, nodeSize)
    }));
}

function setState(isPathing){
    $('#play,#next').attr('disabled', !isPathing);
    if(ani && !isPathing) clearInterval(ani);
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
var canvas;
var startNode = null, endNode = null, path = null;
var isRemovingWall = false;
var isAnimating = false;
var includeCorners = false;
var ani;

const open = new Set();
const closed = new Set();

$(document).ready(() => {
    console.log('ready')
    $('#play').on('click', play);
    $('#next').on('click', step);
    $('#clear').on('click', () => clearGrid(true));
    $('#maze').on('click', genMaze);
    setState(false)
    
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