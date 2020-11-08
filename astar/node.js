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
        this.h = Number.MAX_SAFE_INTEGER; this.g = Number.MAX_SAFE_INTEGER; this.parent = null;
    }
    setState(state){
        this.state = state;
        this.td[0].classList = state;
    }
    setParent(parent) { this.parent = parent; }
    clear() {
        this.state = NodeState.None;
        this.td[0].classList = '';
        this.h = Number.MAX_SAFE_INTEGER;
        this.g = Number.MAX_SAFE_INTEGER;
    }
    get f() { return this.h + this.g; }
    
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