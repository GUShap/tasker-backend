const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const socketService = require('../../services/socket.service')
const boardService = require('./board.service')


// GET BOARDS LIST
async function getBoards(req, res) {
    try {
        const boards = await boardService.query(req.query)
        res.send(boards)
    } catch (err) {
        logger.error('Cannot get boards', err)
        res.status(500).send({ err: 'Failed to get boards' })
    }
}

// GET BOARD BY ID 
async function getBoardById(req, res) {
    try {
      const {boardId} = req.params;
      const board = await boardService.getById(boardId)
      res.json(board)
    } catch (err) {
      logger.error('Failed to get board', err)
      res.status(500).send({ err: 'Failed to get board' })
    }
  }

// POST (add board)
async function addBoard(req, res) {
    try {
        const {board} = req.body;
        const addedBoard = await boardService.add(board)
        res.json(addedBoard)

    } catch (err) {
        console.log("err",err)
        logger.error('Failed to add board', err)
        res.status(500).send({ err: 'Failed to add board' })
    }
}

// PUT (Update board)
async function updateBoard(req, res) {
    try {
      const {board} = req.body;
      const updatedBoard = await boardService.update(board)
      res.json(updatedBoard)
    } catch (err) {
      logger.error('Failed to update board', err)
      res.status(500).send({ err: 'Failed to update board' })
  
    }
  }

  // DELETE (Remove board)
async function removeBoard(req, res) {
    try {
      const {boardId} = req.params;
      const removedId = await boardService.remove(boardId)
      res.send(removedId)
    } catch (err) {
      logger.error('Failed to remove board', err)
      res.status(500).send({ err: 'Failed to remove board' })
    }
  }
  

module.exports = {
    getBoards,
    removeBoard,
    getBoardById,
    addBoard,
    updateBoard
}