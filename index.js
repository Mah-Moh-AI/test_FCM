import admin from "firebase-admin";
// const { credential, intializeApp } = admin;
import { getMessaging } from "firebase-admin/messaging";
import express, { json } from "express";
import cors from "cors";

// const { intializeApp, applicationDefault } = require("firebase-admin");
// const { getMessaging } = require("firebase-admin/messaging");
// const express = require("express");
// const { json } = require("express");
// const cors = require("cors");

process.env.GOOGLE_APPLICATION_CREDENTIALS;

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.use(function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next();
});

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId: "laundary-579b0",
});

app.post("/send", function (req, res) {
  const receivedToken = req.body.fcmToken;
  const message = {
    notification: {
      title: "Notif",
      body: "This is a Test Notification",
    },
    token: "", // i should get it from Flutter FCM end
  };

  getMessaging()
    .send(message)
    .then((response) => {
      res.status(200).json({
        message: "Successfully sent message",
        token: receivedToken,
      });
      console.log("Successfully sent message", response);
    })
    .catch((error) => {
      res.status(400);
      res.send(error);
      console.log("Error sending message:", error);
    });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
