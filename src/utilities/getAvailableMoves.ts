import { getMovesForPawn } from "./moves/getMovesForPawn"
import { getMovesForRook } from "./moves/getMovesForRook"

const getAvailableMovesForPiece = (square: Chess.Square, board: Chess.Board, player: Chess.Color): Chess.Square[] => {
  const { piece, location } = square

  // Can't move the other player's pieces... that would be too easy
  if (piece.color !== player) {
    return []
  }

  let availableLocations = new Set<string>()
  const splitLocation = location.split('')
  const isWhitePiece = piece.color === 'white'
  const file = Number(splitLocation[1])
  const rank = splitLocation[0]

  // Pawns
  if (piece.type === 'pawn') {
    const movesForPawn = getMovesForPawn({ board, isWhitePiece, location, file, rank, player })
    availableLocations = new Set<string>([...availableLocations, ...movesForPawn])
  }

  // Rooks
  if (piece.type === 'rook') {
    const movesForRook = getMovesForRook({ board, isWhitePiece, location, file, rank, player })
    availableLocations = new Set<string>([...availableLocations, ...movesForRook])
    getMovesForRook({ board, isWhitePiece, location, file, rank, player })
  }

  // Now we return a subset of the board which represent available moves for that piece
  return board.filter(square => availableLocations.has(square.location))
}

const getAvailableMoves = (board: Chess.Board, player: Chess.Color): Chess.Board => {
  const newBoard = board.map(square => {
    // Can't do shit without a piece mate
    if (!square.piece) {
      return square
    }

    return {
      ...square,
      piece: {
        ...square.piece,
        availableMoves: getAvailableMovesForPiece(square, board, player)
      }
    }
  })

  return newBoard
}

export { getAvailableMoves }
