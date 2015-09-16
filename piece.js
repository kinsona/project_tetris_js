var TETRIS = TETRIS || {};


TETRIS.Piece = (function() {

  var pieces;
  var _activePiece;
  var _rowsToClear;


  function init() {
    pieces = [];
    _rowsToClear = 0;
  };


  function _PieceConstructor(row, col) {
    this.row = row;
    this.col = col;
    this.active = true;
    this.set = false;
    this.clearing = false;
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


  _PieceConstructor.prototype.slideLeft = function() {
    this.col = Math.max(this.col - 1, 0);
  };


  _PieceConstructor.prototype.slideRight = function() {
    this.col = Math.min(this.col + 1, TETRIS.Board.getWidth() - 1 );
  };


  _PieceConstructor.prototype.forceDown = function() {
    this.row = this.findMaxRow() - 2;
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
  };


  function slideAllLeft() {
    _activePiece.slideLeft();
  };


  function slideAllRight() {
    _activePiece.slideRight();
  };


  function forceAllDown() {
    _activePiece.forceDown();
  };


  function checkCompleteRows() {
    for(var i = 0; i < TETRIS.Board.getHeight(); i++) {
      var piecesInRow = _findPiecesInRow(i);

      if (piecesInRow.length === 10) {
        _rowsToClear++;
        piecesInRow.each(_flagForClear);
      };
    };
  };


  function _findPiecesInRow(rowNumber) {
    var piecesInRow = $(pieces).filter( function( index, piece) {
      return (piece.row === rowNumber && piece.set)
    });
    return piecesInRow;
  };


  function _flagForClear(index, piece) {
    piece.clearing = true;
  };


  function removeClearedRows() {
    var rowsCleared = _rowsToClear;
    _rowsToClear = 0;

    pieces.forEach(function(piece, index) {
      piece.row += rowsCleared;
    })

    pieces = pieces.filter( function(el, i) { return (el.clearing === false) } )

    return rowsCleared;
  };


  return {
    init: init,
    spawnPiece: spawnPiece,
    hasActivePiece: hasActivePiece,
    getPieces: function() { return pieces },
    stepDown: stepDown,
    slideAllLeft: slideAllLeft,
    slideAllRight: slideAllRight,
    forceAllDown: forceAllDown,
    checkCompleteRows: checkCompleteRows,
    removeClearedRows: removeClearedRows
  };

})();