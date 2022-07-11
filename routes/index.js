var express = require("express");
var router = express.Router();
let rooms = [
  {
    "No. of seats available": 50,
    "Amenities in room": "AC,Wifi,Power Backup",
    "Price per hour": 1500,
    Room_No: 23,
  },
  {
    "No. of seats available": 200,
    "Amenities in room": "AC,CCTV,Power Backup,Water Supply",
    "Price per hour": 4000,
    Room_No: 32,
  },
];
let bookingList = [
  {
    "Customer Name": "Arunraj",
    date: "15-07-2022",
    Start_Time: "06:00",
    End_Time: "12:00",
    Room_No: 23,
  },
  {
    "Customer Name": "Jesver",
    date: "17-07-2022",
    Start_Time: "06:00",
    End_Time: "12:00",
    Room_No: 32,
  },
];

/* GET Rooms*/
router.get("/getrooms", function (req, res) {
  res.send({
    statusCode: 200,
    message: "Rooms Details Listed Successfully",
    data: rooms,
  });
});

/* GET Bookings*/
router.get("/getbookings", function (req, res) {
  let roomList = [];
  let bookedroomList = [];
  let bookedrooms = bookingList;
  bookedrooms.forEach((ele) => {
    ele.bookedStatus = true;
  });
  rooms.forEach((ele) => {
    roomList.push(ele.Room_No);
  });
  roomList = [...new Set(roomList)];
  bookingList.forEach((ele) => {
    bookedroomList.push(ele.Room_No);
  });
  roomList.forEach((ele) => {
    if (!bookedroomList.includes(ele)) {
      bookedrooms.push({
        bookedStatus: false,
        Room_No: ele,
      });
    }
  });
  res.send({
    statusCode: 200,
    message: "Booked Rooms Details",
    data: bookedrooms,
  });
});

/* GET customers*/
router.get("/getcustomers", function (req, res) {
  res.send({
    statusCode: 200,
    message: "Customer Details Listed",
    data: bookingList,
  });
});

/*Create room*/
router.post("/create", (req, res) => {
  rooms.push(req.body);
  res.send({
    statusCode: 201,
    message: "Room added successfully",
    data: rooms,
  });
});

/*Book a room*/
router.post("/book", function (req, res) {
  let count = 0;
  bookingList.forEach((element) => {
    if (element.Room_No == req.body.Room_No) {
      if (element.date == req.body.date) {
        if (
          (element.End_Time >= req.body.Start_Time &&
            element.Start_Time <= req.body.Start_Time) ||
          (element.End_Time >= req.body.End_Time &&
            element.Start_Time <= req.body.End_Time)
        ) {
          res.send({
            statusCode: 400,
            message:
              "Room not available. Please choose other room.",
          });
          count = 1;
        }
      }
    }
  });
  if (count == 0) {
    bookingList.push(req.body);
    console.log(bookingList);
    res.send({
      statusCode: 201,
      message: "Room booked successfully",
      data: bookingList,
    });
  }
});

module.exports = router;
