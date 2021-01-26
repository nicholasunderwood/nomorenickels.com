function bestMove(board, player) {

	// AI to make its turn
	let bestScore = -Infinity;
	let move;

	for (let i = 0; i < boardSize; i++) {
		for (let j = 0; j < boardSize; j++) {
			// Is the spot available?
			if (board[i][j] != 0) continue;

			board[i][j] = player;
			let score = player * minimax(board, player, false);
			console.log(i*3+j, score);
			board[i][j] = 0;
			
			if (score > bestScore) {
				bestScore = score;
				move = { i, j };
			}
		}
	}

	console.log(move);
	return move;
}

function getPossibleMoves(board) {
	return [...Array(9)]
		.map((_, i) => { return { 'x': i % 3, 'y': Math.floor(i / 3) }; })
		.filter(i => board[i.y][i.x] == 0);
}


function printBoard(board){
	board.forEach((row) => console.log(row.join(' ')))
}

function minimax(board, player, isMaximizing) {
	let result = evaluateBoard(board);
	if (result !== null) {
		// console.log(result)
		// printBoard(board);
		return result;
	}
	
	let bestScore = isMaximizing ? -Infinity : Infinity;

	for (let i = 0; i < boardSize; i++) {
		for (let j = 0; j < boardSize; j++) {
			// Is the spot available?
			if (board[i][j] != 0) continue;
		
			board[i][j] = isMaximizing ? player : -player;
			let score = minimax(board, player, !isMaximizing);
			board[i][j] = 0;
			bestScore = isMaximizing ? Math.max(bestScore, score) : Math.min(bestScore, score);
		}
	}
	// console.log(bestScore);
	return bestScore;
}

function evaluateBoard(board) {
	let isDraw = true;
	for (let a = 0; a < boardSize; a++) {
		let rowWin = board[a][0];
		let colWin = board[0][a];
		isDraw = isDraw && board[a][0] != 0;
		for (let b = 1; b < boardSize; b++) {
			rowWin = (rowWin == board[a][b] ? rowWin : 0)
			colWin = (colWin == board[b][a] ? colWin : 0)
			isDraw = isDraw && board[a][b] != 0;
		}

		if (rowWin != 0) return rowWin;
		if (colWin != 0) return colWin;
	}

	let diag1 = board[0][0];
	let diag2 = board[0][boardSize - 1];

	for (let i = 1; i < boardSize; i++) {
		diag1 = (diag1 == board[i][i] ? diag1 : 0)
		diag2 = (diag2 == board[i][boardSize - i - 1] ? diag2 : 0)
	}

	if (diag1 != 0) return diag1;
	if (diag2 != 0) return diag2;

	if (isDraw) return 0;
	return null;
}