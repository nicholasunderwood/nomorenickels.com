class Maze {
    constructor(grid){
        this.grid = grid;
        this.closed = new Set();
    }

    start(startNode) {
        this.closed.clear();
        console.log('start', startNode)
        this.startNode = startNode;
        
        this.path = [];
        grid.forEach(row => row.forEach(node => {
            node.clear();
            node.setState(NodeState.Wall);
        }));
        startNode.setState(NodeState.None);
        this.nextNode = this.startNode;
        this.ani = setInterval(() => this.step(this.nextNode, false), 50);
    }

    finishMaze(){
        console.log('finish');
        clearInterval(this.ani);
        this.step(this.nextNode, true);
    }

    step(node, finish){
        this.closed.add(node);
        node.setState(NodeState.None)
        
        let nextNodes = this.getNextNodes(node);
        if(nextNodes.length == 0){
            if(node == this.startNode) return;
            this.nextNode = this.path.pop();
            if(!finish) this.nextNode.setState(NodeState.Path);
            return finish ? this.step(this.nextNode, true) : null;
        }

        this.path.push(node);
        let randNum = Math.floor(Math.random()*nextNodes.length);
        let nextNode = nextNodes[randNum];

        for(let x = Math.min(node.x, nextNode.x); x <= Math.max(node.x, nextNode.x); x++){
            grid[node.y][x].setState(NodeState.None);
        }

        for(let y = Math.min(node.y, nextNode.y); y <= Math.max(node.y, nextNode.y); y++){
            grid[y][node.x].setState(NodeState.None);
        }

        this.nextNode = nextNode;
        if(finish) this.step(nextNode, true);
        else nextNode.setState(NodeState.Path);
    }

    getNextNodes(node){
        let nodes = [];
        for(let y = Math.max(node.y-2, 1); y <= Math.min(node.y+2, gridHeight-2); y+=2) {
            for(let x = Math.max(node.x-2, 1); x <= Math.min(node.x+2, gridWidth-2); x+=2) {
            let neighbor = grid[y][x];
            if((x - node.x) * (y - node.y) != 0) continue;
            if(neighbor == node || this.closed.has(neighbor)) continue;
            nodes.push(neighbor);
            }
        }
        return nodes;
    }
}