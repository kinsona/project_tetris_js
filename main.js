var TETRIS = TETRIS || {};


TETRIS.MainModule = (function() {

  var _gameloop;


  function init() {
    TETRIS.Board.init();
    TETRIS.Piece.init();
    TETRIS.View.init();

    var rows = TETRIS.Board.getRows();
    TETRIS.View.drawBoard(rows);

    //var pieces = TETRIS.Piece.getPieces();
    //TETRIS.View.render(pieces);
  };


  function start() {
    //start ticking
    _gameloop = setInterval(_tick, 100);
  };

  function _tick() {
    if ( TETRIS.Piece.hasActivePiece() ) {
      TETRIS.Piece.stepDown();
    }
    else {
      TETRIS.Piece.spawnPiece();
    }

    var pieces = TETRIS.Piece.getPieces();
    TETRIS.View.render(pieces);

    //check collision with bottom

  };


  return {
    init: init,
    start: start
  };

})();