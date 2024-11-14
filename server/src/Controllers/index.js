// contacts controllers
const Contacts = require("../Models/contactsModel.js");

const getContacts = async (req, res) => {
  const limit = 15;
  const page = req.query.page || 1;
  const skip = (Number(page) - 1) * limit;
  const sortField = "firstName";
  const sortDirection = req.query.sortBy === "desc" ? -1 : 1;

  try {
    const contacts = await Contacts.find()
      .skip(skip)
      .limit(limit)
      .sort({ [sortField]: sortDirection });

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contacts" });
  }
};

const createContact = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, company, jobTitle } =
    req.body;
  try {
    const existingContact = await Contacts.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    if (existingContact) {
      return res.status(400).json({
        message: "Contact with this email or phone number already exists",
      });
    }

    const contact = await Contacts.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      company,
      jobTitle,
    });

    res.status(201).json(contact);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating contact", error: error.message });
  }
};

const updateContact = async (req, res) => {
  const id = req.params.id;
  const { firstName, lastName, email, phoneNumber, company, jobTitle } =
    req.body;

  try {
    const existingContact = await Contacts.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    if (existingContact) {
      return res.status(400).json({
        message: "Contact with this email or phone number already exists",
      });
    }

    const contact = await Contacts.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        email,
        phoneNumber,
        company,
        jobTitle,
      },
      { new: true }
    );
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    console.log("error while updating: ", error);
    res.status(500).json({ message: "Error updating contact" });
  }
};

const deleteContact = async (req, res) => {
  const id = req.params.id;
  try {
    const contact = await Contacts.findByIdAndDelete(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.log("error while deleting: ", error);
    res.status(500).json({ message: "Error deleting contact" });
  }
};

module.exports = {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
};
