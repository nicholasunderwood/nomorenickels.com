
class Node{
    static getNode(x,y) { return grid[Math.floor(x/nodeSize)][Math.floor(y/nodeSize)]}
    static calcDist(node1, node2) {
        let dx = Math.abs(node1.x - node2.x); let dy = Math.abs(node1.y - node2.y);
        return Math.min(dx, dy) * 14 + Math.abs(dx - dy) * 10
    }
    static getBestNode(node1, node2){
        if(node1.f == node2.f) return node1.h > node2.h ? node2 : node1;
        else return node1.f > node2.f ? node2 : node1;
    }
    constructor(x,y, td){
        this.x = x; this.y = y; this.td = td; this.state = NodeState.None;
        this.h = 1000; this.g = 1000; this.parent = null;
    }
    setState(state){
        this.state = state;
        this.td[0].classList = state;
    }
    setParent(parent) { this.parent = parent; }
    clear() {
        this.state = NodeState.None;
        this.td[0].classList = '';
        this.h = 1000; this.g = 1000;
    }
    get f() { return this.h + this.g; }
    
}

function play () {
    if(startNode && endNode && !path){
        ani = setInterval(step, 10);
    }
    $('#play').text('Pause').on('click', pause);
}

function pause(){
    if(ani) clearInterval(ani);
    $('#play').text('Play').on('click', play);
}

function handleEndPoints(node) {
    if(!startNode || endNode) {
        if(startNode && endNode) { clearGrid(); console.log('reset') }

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
    if(open.size < 1) return;
    var current;
    open.forEach(node => {
        current = !current ? node : Node.getBestNode(current, node);
    });
    addToClosed(current);
    
    if(current === endNode){
        console.log('done');
        getPath(current);
        return;
    }
    let neighbors = getSuroundingNodes(current, false);
    if(neighbors.length < 4 && current.x != 0 && current.y != 0 && current.x != gridWidth-1 && current.y != gridHeight-1)
        console.log(current, neighbors)

    neighbors.forEach(node => {
        if(node.state == NodeState.Wall) {
            console.log('wall', current)
        }

        if(closed.has(node) || open.has(node) || node.state == NodeState.Wall){
            // console.log(closed.has(node), open.has(node), node.state == NodeState.Wall)
            return;
        }
        let dist = Node.calcDist(node, current);
        if(dist + current.g >= node.g) return;
        
        node.g = dist + current.g;
        node.h = Node.calcDist(node, endNode);
        node.setParent(current);
        addToOpen(node);
    });
}

function clearGrid () {
    console.log('clear');
    for(let y = 0; y < gridHeight; y++){
        for(let x = 0; x < gridWidth; x++){
            grid[y][x].clear();
        }
    }
    startNode = null; endNode = null;
    open.clear(); closed.clear(); path = null;
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
    if(ani) clearInterval(ani);
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

const NodeState = {
    None: new String('none'),
    Start: new String('start'),
    End: new String('end'),
    Closed: new String('closed'),
    Open: new String('open'),
    Wall: new String('wall'),
    Path: new String('path')
};

const gridWidth = 50, gridHeight = 30, nodeSize = 20;
const grid = [];
const sqrt2 = Math.sqrt(2);
var canvas;
var startNode = null, endNode = null, path = null;
var isRemovingWall = false;
var includeCorners = false;
var ani;

const open = new Set();
const closed = new Set();

$(document).ready(() => {
    console.log('ready')
    $('#play').on('click', play);
    $('#next').on('click', step);
    $('#clear').on('click', clearGrid);
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