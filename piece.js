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


  _PieceConstructor.prototype.detectCollision = function() {
    var maxRow = this.findMaxRow();
    return (this.row === maxRow);
  };


  _PieceConstructor.prototype.findMaxRow = function() {
    var self = this;

    var piecesInColumn = $(pieces).filter( function( index, object) {
      return (object.col === self.col && object.row != self.row)
    });

    if (piecesInColumn.length > 0) {
      return piecesInColumn.last()[0].row - 1;
    }
    else {
      return TETRIS.Board.getHeight() -1;
    };
  };


  _PieceConstructor.prototype.stop = function() {
    this.active = false;
    this.set = true;
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
    // if any active piece
    if (_activePiece.detectCollision() ) {
      // stop all active pieces
      _activePiece.stop();
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