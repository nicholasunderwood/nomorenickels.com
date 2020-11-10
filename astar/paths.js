class Path {
    constructor (grid) {
        this.grid = grid;
        this.open = new Set();
        this.closed = new Set();

        this.includeCorners = false;
        this.animate;
        this.isPaused = false;
        this.cancelled = false;
        console.log('build', this.open)
    }

    async generatePath (startNode, endNode, animate, includeCorners) {
        this.startNode = startNode;
        this.endNode = endNode;
        this.isFinished = false;
        this.includeCorners = includeCorners || false;
        this.isPaused = false;

        this.open.clear();
        this.closed.clear();
        this.open.add(startNode);
        startNode.g = 0;

        console.log('start', this.open);

        this.step(animate ? 1 : 0);
        

        return this.getPath(endNode);
    }

    addToOpen(node) {
        this.open.add(node);
        if(node != startNode && node != endNode){
            node.setState(NodeState.Open);
        }
    }
    
    addToClosed(node){
        this.open.delete(node);
        this.closed.add(node);
        if(node != startNode && node != endNode){
            node.setState(NodeState.Closed);
        }
    }

    getSuroundingNodes(node, includeCorners) {
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

    getPath(end){
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
}

class Dikstra extends Path {
    step (timeout) {


        if(this.open.size == 0) {
            this.isFinished = true;
            alert("No possible path");
            return;
        };
        var current;
        this.open.forEach(node => {
            current = !current ? node : Node.getBestNodeByG(current, node);
        });

        this.addToClosed(current);
        
        if(current === endNode){
            console.log('done');
            this.isFinished = true;
            return this.getPath(current);
        }

        let neighbors = this.getSuroundingNodes(current, includeCorners);

        neighbors.forEach(node => {
            if(this.closed.has(node) || this.open.has(node) || node.state == NodeState.Wall) return;
            let dist = Node.calcDist(node, current);
            if(dist + current.g >= node.g) return;
            
            node.g = dist + current.g;
            node.setParent(current);
            this.addToOpen(node);
        });

        setTimeout(() => this.step(), timeout)
    }
}


class Astar extends Path {
    step (timeout) {

        console.log(timeout, !((timeout || 0) > 0))
        if(this.isPaused && (timeout || 0) > 0) return;

        if(this.open.size == 0) {
            this.isFinished = true;
            alert("No possible path");
            return;
        };
        var current;
        this.open.forEach(node => {
            current = !current ? node : Node.getBestNodeByF(current, node);
        });

        this.addToClosed(current);
        
        if(current === endNode){
            console.log('done');
            this.isFinished = true;
            return this.getPath(current);
        }

        let neighbors = this.getSuroundingNodes(current, includeCorners);

        neighbors.forEach(node => {
            if(this.closed.has(node) || this.open.has(node) || node.state == NodeState.Wall) return;
            let dist = Node.calcDist(node, current);
            if(dist + current.g >= node.g) return;
            
            node.g = dist + current.g;
            node.h = Node.calcDist(node, endNode);
            node.setParent(current);
            this.addToOpen(node);
        });

        setTimeout(() => this.step(timeout), timeout || 0)
    }
}