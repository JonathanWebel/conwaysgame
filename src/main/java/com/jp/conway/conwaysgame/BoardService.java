package com.jp.conway.conwaysgame;

import org.springframework.stereotype.Service;

@Service
public class BoardService {

  public int[][] nextBoard(int[][] board) {
    int[][] nextSquares = new int[board.length][board.length];
    for (int i = 0; i < board.length; i++) {
      for (int j = 0; j < board[i].length; j++) {
        if (board[i][j] == 1) {
          int liveCount = 0;
          if (i > 0 && board[i - 1][j] == 1) {
            liveCount += 1;
          }
          if (i > 0 && j > 0 && board[i - 1][j - 1] == 1) {
            liveCount += 1;
          }
          if (i > 0 && j < board[i].length-1 && board[i - 1][j + 1] == 1) {
            liveCount += 1;
          }
          if (j > 0 && board[i][j - 1] == 1) {
            liveCount += 1;
          }
          if (j < board[i].length-1 && board[i][j + 1] == 1) {
            liveCount += 1;
          }
          if (i < board.length-1 && board[i + 1][j] == 1) {
            liveCount += 1;
          }
          if (i < board.length-1 && j < board[i].length-1 && board[i + 1][j + 1] == 1) {
            liveCount += 1;
          }
          if (i < board.length-1 && j > 0 && board[i + 1][j - 1] == 1) {
            liveCount += 1;
          }
          if(liveCount == 2||liveCount==3){
            nextSquares[i][j]=1;
          }
          else {
            nextSquares[i][j] = 0;
          }
        } else {
          int liveCount = 0;
          if (i > 0 && board[i - 1][j] == 1) {
            liveCount += 1;
          }
          if (i > 0 && j > 0 && board[i - 1][j - 1] == 1) {
            liveCount += 1;
          }
          if (i > 0 && j < board[i].length-1 && board[i - 1][j + 1] == 1) {
            liveCount += 1;
          }
          if (j > 0 && board[i][j - 1] == 1) {
            liveCount += 1;
          }
          if (j < board[i].length-1 && board[i][j + 1] == 1) {
            liveCount += 1;
          }
          if (i < board.length-1 && board[i + 1][j] == 1) {
            liveCount += 1;
          }
          if (i < board.length-1 && j < board[i].length-1 && board[i + 1][j + 1] == 1) {
            liveCount += 1;
          }
          if (i < board.length-1 && j > 0 && board[i + 1][j - 1] == 1) {
            liveCount += 1;
          }
          if (liveCount == 3) {
            nextSquares[i][j] = 1;
          } else {
            nextSquares[i][j] = 0;
          }
        }
      }
    }
    return nextSquares;
  }
}
