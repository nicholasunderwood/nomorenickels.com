function getPlay(board){
    function willEnd(mRows){
        ['X', 'Y'].forEach((cond)=>{
            for(let row in mRows){
                let filled = [];
                for(let col in mRows[row]){
                    let square = mRows[row][col]
                    if(square == cond){
                        filled.push(col);
                    }
                    if(filled.length == 2){
                        return map[row][-1*(filled[0]+filled[1])+3];
                    }
                } 
            }
        });
        return null;
    }
    
    let rows = [
        mBoard[0],
        mBoard[1],
        mBoard[3],
        [mBoard[0][0], mBoard[0][1], mBoard[0][2]],
        [mBoard[1][0], mBoard[1][1], mBoard[1][2]],
        [mBoard[2][0], mBoard[2][1], mBoard[2][2]]
    ];
    let map = [
        [[0,0], [0,1], [0,2]],
        [[1,0], [1,1], [1,2]],
        [[2,0], [2,1], [2,2]],
        [[0,0], [0,1], [0,2]],
        [[1,0], [1,1], [1,2]],
        [[2,0], [2,1], [2,2]]
    ]

    let play = willEnd(rows);
    if(play != null){
        return play;
    }
    
    
}