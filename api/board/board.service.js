const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const logger = require("../../services/logger.service");
const asyncLocalStorage = require('../../services/als.service')




async function query(filterBy = null) {
  try {
    const criteria = _buildCriteria(filterBy);
    const sortCriteria = _buildSortCriteria(filterBy);
    const collection = await dbService.getCollection("board");
    var boards = await collection.find(criteria).sort(sortCriteria).toArray();
    return boards;
  } catch (err) {
    logger.error("cannot find boards", err);
    throw err;
  }
}

async function remove(boardId) {
  try {
    const collection = await dbService.getCollection('board')
    const criteria = { _id: ObjectId(boardId) }
    await collection.deleteOne(criteria)
  } catch (err) {
    logger.error(`cannot remove board ${boardId}`, err)
    throw err
  }
}


async function add(board) {
  try {
    const collection = await dbService.getCollection('board')
    var currBoard = await collection.insertOne(board)
    console.log(currBoard);
    return board;
  } catch (err) {
    logger.error('cannot insert board', err)
    throw err
  }
}

async function update(board) {
  try {
    console.log(board);
    var id = ObjectId(board._id);
    delete board._id;
    const collection = await dbService.getCollection("board");
    await collection.updateOne({ _id: id }, { $set: { ...board } });
    board._id = id
    return board;
  } catch (err) {
    logger.error(`cannot update board ${board}`, err);
    throw err;
  }
}

async function getById(boardId) {
  try {
    const collection = await dbService.getCollection("board");
    const board = collection.findOne({ _id: ObjectId(boardId) });
    return board;
  } catch (err) {
    logger.error(`while finding board ${boardId}`, err);
    throw err;
  }
}



function _buildCriteria(filterBy) {
  const criteria = {};
  // console.log("before filter", filterBy);
  if (filterBy.searchKey) {
    const regex = new RegExp(filterBy.searchKey, "i");
    criteria.name = { $regex: regex };
  }

  //   if (filterBy.inStock !== '') {
  //     criteria.inStock = {$eq: JSON.parse(filterBy.inStock)}
  // }

  //   if (filterBy.labels) {
  //     criteria.labels = { $eq : filterBy.labels };
  //   }

  // console.log("after filter :", criteria);
  return criteria;
}


function _buildSortCriteria(filterBy) {
  const sortCriteria = {};
  if (filterBy.sort === "Name") sortCriteria.name = 1;
  else if (filterBy.sort === "Price") sortCriteria.price = -1;
  else sortCriteria.createAt = 1;

  return sortCriteria;
}

// createBoard()
async function createBoard() {
  const collection = await dbService.getCollection('board')
  console.log(collection);
  const id = ObjectId("61ae5ac3ac14464cd8b38e5b")
  // var currBoard = await collection.updateOne({ _id: id },{$set:{
  var currBoard = await collection.insertOne(
    {
      title: "Sprint 4",
      createdAt: 1589983468418,
      description: "Track your action items and improve for next sprint",
      createdBy: {
        _id: "u101",
        fullname: "Guy Shapira",
        imgUrl: "guy-img.jpeg",
      },
      style: {},
      labels: [
        {
          id: "l101",
          title: "Done",
          color: "#61bd4f",
        },
      ],
      members: [
        {
          _id: "u101",
          username: "Guy",
          fullname: "Guy Shapira",
          imgUrl: "guy-img.jpeg",
        },
        {
          _id: "u102",
          username: "Sundos",
          fullname: "Sundos Gutty",
          imgUrl: "sundos-img.jpg",
        },
        {
          _id: "u103",
          username: "Ishay",
          fullname: "Ishay Nitzan",
          imgUrl: "ishay-img.jpeg",
        },
      ],
      groups: [
        {
          id: "g101",
          title: "Group 1",
          tasks: [
            {
              id: "t101",
              title: "Replace logo",
              labelId: "Done",
              description: "description",
              comments: [
                {
                  id: "ZdPnm",
                  txt: "also @yaronb please CR this",
                  createdAt: 1638753114117,
                  byMember: {
                    _id: "u101",
                    fullname: "Guy Shapira",
                    imgUrl: "guy-img.jpeg",
                  },
                },
                {
                  id: "ZdPnm",
                  txt: "also @yaronb please CR this",
                  createdAt: 1620999817436,
                  byMember: {
                    _id: "u101",
                    fullname: "Guy Shapira",
                    imgUrl: "guy-img.jpeg",
                  },
                },
              ],
            },
            {
              id: "t102",
              title: "Have to have full CRUD!",
              labelId: "Work",
              members: [
                {
                  _id: "u101",
                  username: "Guy",
                  fullname: "Guy Shapira",
                  imgUrl: "guy-img.jpeg",
                },
              ],
            },
            {
              id: "t103",
              title: "Let's do Dungeon & Dragons ",
              labelId: "Stuck",
              members: [
                {
                  _id: "u101",
                  username: "Ishay",
                  fullname: "Ishay Nitzan",
                  imgUrl: "ishay-img.jpeg",
                },
              ],
            },
          ],
          style: {
            color: "#579bfc",
          },
        },
        {
          id: "g102",
          title: "Group 2",
          tasks: [
            {
              id: "t201",
              title: "Replace logo",
              labelId: "Stuck",
            },
            {
              id: "t202",
              title: "Add Samples",
              labelId: "Work",
            },
          ],
          style: {
            color: "#579bfc",
          },
        },
        {
          id: "g103",
          title: "Group 3",
          tasks: [
            {
              id: "t301",
              title: "Do that",
              labelId: "Done",
              members: [
                {
                  _id: "u102",
                  username: "Sundos",
                  fullname: "Sundos Gutty",
                  imgUrl: "sundos-img.jpg",
                },
                {
                  _id: "u103",
                  username: "Ishay",
                  fullname: "Ishay Nitzan",
                  imgUrl:"ishay-img.jpeg"
                },
              ],
            },
            {
              id: "t402",
              title: "Help me",
              description: "description",
              comments: [
                {
                  id: "ZdPnm",
                  txt: "also @yaronb please CR this",
                  createdAt: 1590999817436.0,
                  byMember: {
                    _id: "u101",
                    fullname: "Guy Shapira",
                    imgUrl: "guy-img.jpeg",
                  },
                },
              ],
              checklists: [
                {
                  id: "YEhmF",
                  title: "Checklist",
                  todos: [
                    {
                      id: "212jX",
                      title: "To Do 1",
                      isDone: false,
                    },
                  ],
                },
              ],
              members: [
                {
                  _id: "u101",
                  username: "Guy",
                  fullname: "Guy Shapira",
                  imgUrl: "guy-img.jpeg",
                },
              ],
              labelId: "Done",
              createdAt: 1590999730348,
              dueDate: 16156215211,
              byMember: {
                _id: "u101",
                username: "Guy",
                fullname: "Guy Shapira",
                imgUrl: "guy-img.jpeg",
              },
              style: {},
            },
          ],
          style: {
            color: "#579bfc",
          },
        },
        {
          id: "g104",
          title: "Group 4",
          tasks: [
            {
              id: "501",
              title: "Do that",
              labelId: "Done",
              members: [
                {
                  _id: "u102",
                  username: "Sundos",
                  fullname: "Sundos Gutty",
                  imgUrl:"sundos-img.jpg"
                },
                {
                  _id: "u103",
                  username: "Ishay",
                  fullname: "Ishay Nitzan",
                  imgUrl:"ishay-img.jpeg"
                },
              ],
            },
            {
              id: "t502",
              title: "Help me",
              description: "description",
              comments: [
                {
                  id: "ZdPnm",
                  txt: "also @yaronb please CR this",
                  createdAt: 1590999817436.0,
                  byMember: {
                    _id: "u101",
                    fullname: "Guy Shapira",
                    imgUrl: "guy-img.jpeg",
                  },
                },
              ],
              checklists: [
                {
                  id: "YEhmF",
                  title: "Checklist",
                  todos: [
                    {
                      id: "212jX",
                      title: "To Do 1",
                      isDone: false,
                    },
                  ],
                },
              ],
              members: [
                {
                  _id: "u101",
                  username: "Guy",
                  fullname: "Guy Shapira",
                  imgUrl: "guy-img.jpeg",
                },
              ],
              labelId: "Done",
              createdAt: 1590999730348,
              dueDate: 16156215211,
              byMember: {
                _id: "u101",
                username: "Guy",
                fullname: "Guy Shapira",
                imgUrl: "guy-img.jpeg",
              },
              style: {},
            },
          ],
          style: {
            color: "#579bfc",
          },
        },
        {
          id: "g105",
          title: "Group 5",
          tasks: [
            {
              id: "601",
              title: "Do that",
              labelId: "Done",
              members: [
                {
                  _id: "u102",
                  username: "Sundos",
                  fullname: "Sundos Gutty",
                  imgUrl:"sundos-img.jpg"
                },
                {
                  _id: "u103",
                  username: "Ishay",
                  fullname: "Ishay Nitzan",
                  imgUrl:"ishay-img.jpeg"
                },
              ],
            },
            {
              id: "t602",
              title: "Help me",
              description: "description",
              comments: [
                {
                  id: "ZdPnm",
                  txt: "also @yaronb please CR this",
                  createdAt: 1590999817436.0,
                  byMember: {
                    _id: "u101",
                    fullname: "Guy Shapira",
                    imgUrl: "guy-img.jpeg",
                  },
                },
              ],
              checklists: [
                {
                  id: "YEhmF",
                  title: "Checklist",
                  todos: [
                    {
                      id: "212jX",
                      title: "To Do 1",
                      isDone: false,
                    },
                  ],
                },
              ],
              members: [
                {
                  _id: "u101",
                  username: "Guy",
                  fullname: "Guy Shapira",
                  imgUrl: "guy-img.jpeg",
                },
              ],
              labelId: "Done",
              createdAt: 1590999730348,
              dueDate: 16156215211,
              byMember: {
                _id: "u101",
                username: "Guy",
                fullname: "Guy Shapira",
                imgUrl: "guy-img.jpeg",
              },
              style: {},
            },
          ],
          style: {
            color: "#579bfc",
          },
        },
      ],
      activities: [
        {
          id: "a101",
          type: "name",
          createdAt: 154514,
          byMember: {
            _id: "u101",
            fullname: "Guy Shapira",
            imgUrl: "guy-img.jpeg",
          },
          task: {
            id: "t101",
            title: "Replace Logo",
          },
        },
        {
          id: "a102",
          type: "status",
          createdAt: 154514,
          byMember: {
            _id: "u101",
            fullname: "Guy Shapira",
            imgUrl: "guy-img.jpeg",
          },
          task: {
            id: "t101",
            title: "bipboop",
          },
        },
        {
          id: "a103",
          type: "member",
          createdAt: 154514,
          byMember: {
            _id: "u101",
            fullname: "Guy Shapira",
            imgUrl: "guy-img.jpeg",
          },
          task: {
            id: "t101",
            title: "say Hi",
          },
        },
      ],
      cmpsOrder: [
        "title-picker",
        "status-picker",
        "member-picker",
        "timeline-picker",
      ],
    }
  )
}





module.exports = {
  query,
  remove,
  getById,
  update,
  add
}




