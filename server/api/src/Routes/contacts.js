const express = require("express");
const {
  deleteContact,
  createContact,
  updateContact,
  getContacts,
} = require("../Controllers/index.js");

const contactsRouter = express.Router();

contactsRouter.get("/", getContacts);
contactsRouter.post("/", createContact);
contactsRouter.put("/:id", updateContact);
contactsRouter.delete("/:id", deleteContact);

module.exports = contactsRouter;
