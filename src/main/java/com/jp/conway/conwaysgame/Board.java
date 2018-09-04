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



  @Override
  public String toString(){
    StringBuilder builder = new StringBuilder();
    for (int[] ints : board) {
      builder.append("{ " + ints[0]+", ");
      for (int i = 1; i < ints.length-1; i++) {
        builder.append(ints[i] + ", ");
      }
      builder.append(ints[ints.length-1]+" }\n");
    }
    return builder.toString();
  }
}
