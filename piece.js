var TETRIS = TETRIS || {};


TETRIS.Piece = (function() {

  var pieces;
  var _activePiece;
  var _rowsToClear;
  var _shapes;
  var gameover;


  function init() {
    pieces = [];
    _rowsToClear = 0;
    gameover = false;
    _shapes = ['2x2','4x1','L-left','L-right','S-left','S-right'];
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


  _PieceConstructor.prototype.findDownDistance = function() {
    return (this.findMaxRow() - this.row);
  };


  _PieceConstructor.prototype.findMaxRow = function() {
    var self = this;

    var piecesInColumn = $(pieces).filter( function( index, object) {
      return (object.col === self.col && !object.active)
    });

    if (piecesInColumn.length > 0) {
      return piecesInColumn.last()[0].row - 1;
    }
    else {
      return TETRIS.Board.getHeight() - 1;
    };
  };


  _PieceConstructor.prototype.stop = function() {
    this.active = false;
    this.set = true;
    if (this.row < 4) {
      gameover = true;
    };
  };


  _PieceConstructor.prototype.slideLeft = function() {
    this.col = Math.max(this.col - 1, 0);
  };


  _PieceConstructor.prototype.slideRight = function() {
    this.col = Math.min(this.col + 1, TETRIS.Board.getWidth() - 1 );
  };


  _PieceConstructor.prototype.forceDown = function(distance) {
    this.row += (distance - 1);
  };


  _PieceConstructor.prototype.validMove = function(columnMove) {
    var self = this;
    var targetColumn = self.col + columnMove;

    var piecesInRow = $(pieces).filter( function( index, object) {
      return (object.row === self.row && object.col === targetColumn && !object.active)
    });

    return (_columnInBounds(targetColumn) && piecesInRow.length === 0);
  };


  function _columnInBounds(colNumber) {
    return (colNumber >= 0 && colNumber < TETRIS.Board.getWidth() );
  };


  function spawnShape(ShapeModule) {
    _activePiece = []

    var shapeOffsets = ShapeModule.getShapeOffsets();
    var baseColumn = _randomColumn(shapeOffsets[0]);

    shapeOffsets.slice(1,5).forEach( function(offset, index) {
      spawnPiece(offset.row, baseColumn + offset.col);
    })

  };


  function spawnPiece(row, col) {
    newPiece = new _PieceConstructor(row,col);
    _activePiece.push(newPiece);
    pieces.push(newPiece);
  };


  function _randomColumn(rangeOffset) {
    return Math.floor( Math.random() * (rangeOffset.high - rangeOffset.low) );
  };


  function hasActivePiece() {
    return !!_activePiece;
  };


  function stepDown() {
    _activePiece.forEach(function(piece) { piece.row++; } );
    _stopPiece();
  };


  function _stopPiece() {
    if (_activePiece.some(function(piece) { return piece.detectCollision() } ) ) {
      _activePiece.forEach(function(piece) { piece.stop() } );
      _activePiece = undefined;
    };
  };


  function slideAllLeft() {
    if (_activePiece.every(function(piece) { return piece.validMove(-1) } ) ) {
      _activePiece.forEach(function(piece) {
        piece.slideLeft();
      });
      _stopPiece();
    };
  };


  function slideAllRight() {
    if (_activePiece.every(function(piece) { return piece.validMove(1) } ) ) {
      _activePiece.forEach(function(piece) {
        piece.slideRight();
      });
      _stopPiece();
    };
  };


  function forceAllDown() {
    var minDownDistance = _activePiece.reduce(function(previous, current) {
      return Math.min(previous, current.findDownDistance() )
    }, _activePiece[0].findDownDistance() );

    _activePiece.forEach(function(piece) { piece.forceDown(minDownDistance) } );
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
    spawnShape: spawnShape,
    hasActivePiece: hasActivePiece,
    getPieces: function() { return pieces },
    stepDown: stepDown,
    slideAllLeft: slideAllLeft,
    slideAllRight: slideAllRight,
    forceAllDown: forceAllDown,
    checkCompleteRows: checkCompleteRows,
    removeClearedRows: removeClearedRows,
    checkGameOver: function() { return gameover }
  };

})();