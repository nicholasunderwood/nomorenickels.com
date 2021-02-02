class SortingAlgorithm {

    constructor(array){
        this.isFinished = false;
        this.stepRate = 1;
        this.array = array;
    }

    start(){}

    step(){}

    isSorted(array) {
        array = array || this.array;
        for(let i = 0; i < array.length-1;i++){
            if(array[i] > array[i+1]) return false;
        }
        return true;
    }

    swap(array, index1, index2) {
        let temp = array[index1];
        array[index1] = array[index2];
        array[index2] = temp;
    }

}

class BubbleSort extends SortingAlgorithm {
    constructor(array){
        super(array)
        this.index = 0;
        this.cap = array.length-1;
        this.hasDisorder = false;
    }

    step(){
        if(this.isFinished) return;

        
        while(this.index != this.cap){
            
            if(this.array[this.index] > this.array[this.index+1]){
                this.hasDisorder = true;
                this.swap(this.array, this.index, this.index+1)
            }
            this.index++;
        }

        // colors[this.index] = 'black';
        // colors[this.index] = 'red';
        // colors[this.index+1] = 'red';

        this.index = 0;
        this.cap--;
        colors[this.cap] = 'green';
        colors[this.cap+1] = 'green';
        if(this.cap == 1){
            this.isFinished = true;
            console.log('finished')
        }
    }
}

class SelectionSort extends SortingAlgorithm {
    constructor(array){
        super(array)

        this.firstUnsorted = 0;
        this.index = 1;
        this.smallestIndex = 0;
    }

    step(){
        if(this.isFinished) return;
        

        while(this.index != this.array.length) {
            if(this.array[this.smallestIndex] > this.array[this.index]) {
                this.smallestIndex = this.index
            }
            this.index++
        }
        
        this.swap(this.array, this.firstUnsorted, this.smallestIndex);
        colors[this.firstUnsorted] = 'green';
        
        this.firstUnsorted++;
        this.smallestIndex = this.firstUnsorted;
        this.index = this.firstUnsorted+1;
        
        if(this.firstUnsorted == this.array.length){
            this.isFinished = true;
            colors[this.firstUnsorted] = 'green';
        }

    }
}

class MergeSort extends SortingAlgorithm{
    constructor(array){
        super(array);
    }

    
}

class StalinSort extends SortingAlgorithm {

    constructor(){
        super();
        this.index = 1;
        this.stepRate = 1;
    }

    start(){
        this.minValue = this.array[0];
        colors[0] = 'green';
        colors[1] = 'red';
    }

    step(){
        if(this.minValue > this.array[this.index]){
            array.splice(this.index, 1);
            console.log(this.minValue, this.array[this.index]);
        } else {
            this.minValue = this.array[this.index]
            colors[this.index] = 'black'
            this.index++;
            colors[this.index] = 'red';
        }

        if(this.index >= this.array.length){
            this.isFinished = true;
        }

    }

}