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
        super()
        this.array = array;
        this.index = 0;
        this.cap = array.length-1;
        this.hasDisorder = false;
    }

    step(array){
        if(this.isFinished) return;

        if(array[this.index] > array[this.index+1]){
            this.hasDisorder = true;
            this.swap(array, this.index, this.index+1)
        }

        colors[this.index] = 'black';
        this.index++;
        colors[this.index] = 'red';
        colors[this.index+1] = 'red';

        if(this.index == this.cap){
            this.index = 0;
            colors[this.cap] = 'green';
            colors[this.cap+1] = 'green';
            this.cap--;
            if(this.cap == 1){
                this.isFinished = true;
                console.log('finished')
            }
        }
    }
}

class SelectionSort extends SortingAlgorithm {
    constructor(array){
        super()
        this.array = array;

        this.firstUnsorted = 0;
        this.index = 1;
        this.smallestIndex = 0;
    }

    step(array){
        if(this.isFinished) return;
        
        if(array[this.smallestIndex] > array[this.index]) {
            this.smallestIndex = this.index
            colors[this.smallestIndex] = 'red';
        }

        colors[this.index] = 'black';
        this.index++
        colors[this.index] = 'red';

        if(this.index == array.length){
            this.swap(array, this.firstUnsorted, this.smallestIndex);
            colors[this.firstUnsorted] = 'green';
            
            this.firstUnsorted++;
            this.smallestIndex = this.firstUnsorted;
            this.index = this.firstUnsorted+1;
            colors[this.firstUnsorted] = 'yellow';

        }

        if(this.firstUnsorted == array.length){
            this.isFinished = true;
            colors[this.firstUnsorted] = 'green';
        }

    }
}

class BogoSort extends SortingAlgorithm {
    constructor(){
        super();
        this.stepRate = 100;
    }

    shuffle(array){
        array = array.sort(() => { () => .5 - Math.random() });
    }

    step(array){
        if(this.isFinished) return;

        console.log('step')
        this.shuffle(array);
        if(this.isSorted(array)) {
            this.isFinished = true;
        }
    }


}

class StalinSort extends SortingAlgorithm {

    constructor(){
        super();
        this.index = 1;
        this.stepRate = 1;
    }

    start(array){
        this.minValue = array[0];
        colors[0] = 'green';
        colors[1] = 'red';
    }

    step(array){
        if(this.minValue > array[this.index]){
            array.splice(this.index, 1);
            console.log(this.minValue, array[this.index]);
        } else {
            this.minValue = array[this.index]
            colors[this.index] = 'black'
            this.index++;
            colors[this.index] = 'red';
        }

        if(this.index >= array.length){
            this.isFinished = true;
        }

    }

}