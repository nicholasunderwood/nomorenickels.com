function getBestMove(player, board) {
	let moves = getPossibleMoves(board)
	evals = new Map();

	let bestScore = -player * Infinity;
	let bestMove;

	moves.forEach(move => {
		board[move.y][move.x] = player;
		let score = player * minimax(-player, board, 0);
		board[move.y][move.x] = 0;

		evals.set(move, score);

		if (score * player > bestScore * player) {
			bestScore = score;
			bestMove = move;
		}
	});

	console.log(bestMove, bestScore, evals)
	return bestMove;
}

function minimax(player, board, depth) {
	let score = evaluateBoard(board);
	
	if(score != null){
		return {score: score, depth: depth};
	}
	
	let moves = getPossibleMoves(board);

	if(player == 1){
		let bestScore = -Infinity;
	
		moves.forEach(move => {
			board[move.y][move.x] = player;
			let score = minimax(-player, board, depth+1);
			board[move.y][move.x] = 0;
			if(score.score > bestScore.score){
				bestScore = score;
			} else if(bestScore.score == score.score){
				if(score.depth < bestScore.depth){
					bestScore = score;
				}
			}
		});
	
		return bestScore;
	} else {
		let bestScore = Infinity;
	
		moves.forEach(move => {
			board[move.y][move.x] = player;
			let score = minimax(-player, board, depth+1);
			board[move.y][move.x] = 0;
			if(score.score < bestScore.score){
				bestScore = score;
			} else if(bestScore.score == score.score){
				if(score.depth < bestScore.depth){
					bestScore = score;
				}
			}
		});
	
		return bestScore;
	}
}

function printBoard(board){
	console.log(board.reduce((str, row) => {return str + row.join(' ') + "\n"}, ""));
}


function getPossibleMoves(board) {
	return [...Array(9)]
		.map((_, i) => { return { 'x': i % 3, 'y': Math.floor(i / 3) }; })
		.filter(i => board[i.y][i.x] == 0);
}

function evaluateBoard(board) {
	let isDraw = true;
	for (let a = 0; a < 3; a++) {
		let rowWin = board[a][0];
		let colWin = board[0][a];
		isDraw = isDraw && board[a][0] != 0;
		for (let b = 1; b < 3; b++) {
			rowWin = (rowWin == board[a][b] ? rowWin : 0)
			colWin = (colWin == board[b][a] ? colWin : 0)
			isDraw = isDraw && board[a][b] != 0;
		}
		if (rowWin != 0) return rowWin;
		if (colWin != 0) return colWin;
	}
	if (isDraw) return 0;
	if (board[0][0] == board[1][1] && board[0][0] == board[2][2]) return board[0][0];
	if (board[0][2] == board[1][1] && board[0][2] == board[2][0]) return board[0][2];
	return null;
}