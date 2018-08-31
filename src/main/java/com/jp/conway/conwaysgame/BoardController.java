package com.jp.conway.conwaysgame;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BoardController {
  BoardService service;

  public BoardController(BoardService service){
    this.service = service;
  }
  @PostMapping(value = "/Boards")
  @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5000"})
  public Board generateNextBoard(@RequestBody Board board){
    System.out.println("HERE");
    return new Board(service.nextBoard(board.getBoard()));
  }
}
