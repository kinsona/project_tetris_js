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
    TETRIS.View.enableControls();
    _gameloop = setInterval(_tick, 750);
  };

  function _tick() {

    if ( TETRIS.Piece.hasActivePiece() ) {
      TETRIS.Piece.stepDown();
    }
    else {
      TETRIS.Piece.spawnShape(TETRIS.ShapeModule);
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

    var pieces = TETRIS.Piece.getPieces();
    TETRIS.View.render(pieces, score);;
  }


  return {
    init: init,
    start: start,
    keydown: keydown
  };

})();