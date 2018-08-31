package com.jp.conway.conwaysgame;

public class Board {

  public int[][] getBoard() {
    return board;
  }

  public void setBoard(int[][] board) {
    this.board = board;
  }

  int[][] board;
  Board(){

  }
  Board(int[][] board){
    this.board = board;
  }
}
