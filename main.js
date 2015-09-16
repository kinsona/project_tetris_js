var TETRIS = TETRIS || {};


TETRIS.MainModule = (function() {

  var _gameloop;
  var score;


  function init() {
    TETRIS.Board.init();
    TETRIS.Piece.init();
    TETRIS.View.init();

    var rows = TETRIS.Board.getRows();
    TETRIS.View.drawBoard(rows);
  };


  function start() {
    score = 0;
    _gameloop = setInterval(_tick, 100);
    TETRIS.View.enableControls();
  };

  function _tick() {

    if ( TETRIS.Piece.hasActivePiece() ) {
      TETRIS.Piece.stepDown();
    }
    else {
      TETRIS.Piece.spawnPiece();
    }

    TETRIS.Piece.checkCompleteRows();

    var pieces = TETRIS.Piece.getPieces();
    TETRIS.View.render(pieces, score);

    score += TETRIS.Piece.removeClearedRows();
  };


  function keydown() {
    var input = event.which;
    switch (input) {
      case 37:
        TETRIS.Piece.slideAllLeft();
        break;
      case 39:
        TETRIS.Piece.slideAllRight();
        break;
      case 40:
        TETRIS.Piece.forceAllDown();
        break;
    };
  }


  return {
    init: init,
    start: start,
    keydown: keydown
  };

})();