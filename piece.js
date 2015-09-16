var TETRIS = TETRIS || {};


TETRIS.Piece = (function() {

  var pieces;
  var _activePiece;


  function init() {
    pieces = [];
  };


  function _PieceConstructor(row, col) {
    this.row = row;
    this.col = col;
    this.active = true;
    this.set = false;
  };


  function spawnPiece() {
    _activePiece = new _PieceConstructor(0,_randomColumn());
    pieces.push(_activePiece);
  };


  function _randomColumn() {
    return Math.floor( Math.random() * TETRIS.Board.getWidth() );
  };


  function hasActivePiece() {
    return !!_activePiece;
  };


  function stepDown() {
    _activePiece.row++;
    _stopPiece();
  };


  function _stopPiece() {
    if (_activePiece.row === TETRIS.Board.getHeight() - 1) {
      _activePiece.active = false;
      _activePiece.set = true;
      _activePiece = undefined;
    }
  }


  return {
    init: init,
    spawnPiece: spawnPiece,
    hasActivePiece: hasActivePiece,
    getPieces: function() { return pieces },
    stepDown: stepDown
  };

})();