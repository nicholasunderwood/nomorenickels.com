
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
    setState(state){ this.state = state }
    setParent(parent) { this.parent = parent; }
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
        console.log(node, startNode);
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
    for(let x = Math.max(node.x-1, 0); x <= Math.min(node.x+1, gridWidth-1); x++) {
      for(let y = Math.max(node.y-1, 0); y <= Math.min(node.y+1, gridHeight-1); y++) {
        let neighbor = grid[x][y];
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
    while(current != startNode){
        path.push(current);
        current.setState(NodeState.Path);
        current = current.
        parent;
    }

    setState(false)
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
    getSuroundingNodes(current, false).forEach(node => {
        if(closed.has(node) || open.has(node) || node.state == NodeState.Wall) return;
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
    for(let x = 0; x < gridWidth; x++){
        for(let y = 0; y < gridHeight; y++){
            grid[x][y] = new Node(x,y);
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
    console.log(e);
    e.preventDefault();
    let td = $(e.currentTarget)
    let node = Node.getNode(+td.attr('x'), td.attr('y'));
    if(!node) return;
    if(e.type == 'click'){
        handleEndPoints(node);
    } else if(e.type == 'contextmenu'){
        isRemovingWall = node.state == NodeState.Wall;
        node.setState(isRemovingWall ? NodeState.None : NodeState.Wall)
    }
}

function mouseDragged() {
    let node = Node.getNode(mouseX, mouseY);
    if(!node || mouseButton == LEFT) return;
    node.setState(isRemovingWall ? NodeState.None : NodeState.Wall);
}

function keyPressed(){
    if(key == ' ' && startNode && endNode && path == null) {
        step();
    }
}

const NodeState = { None: [255], Start: [0,0,255], End: [0,0,255], Closed: [255,0,0], Open: [0,255,0], Wall: [0], Path: [0,0,255] };

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
        let tr = $('<tr></tr>')
        for(let x = 0; x < gridWidth; x++){
            grid[y].push(new Node(x,y,$(`<td x=${x} y=${y}></td>`)));
            tr.append(grid[x][y]);
        }
        console.log(tr);
        $('#table').append(tr);
    }

    $('td').on('click contextmenu', mousePressed)
});

console.log('load')