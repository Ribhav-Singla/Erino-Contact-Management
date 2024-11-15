const { contactvalidateSchema } = require("../zod/validate.js");
const Contacts = require("../Models/contactsModel.js");

const getContacts = async (req, res) => {
  const limit = 15;
  const page = req.query.page || 1;
  const skip = (Number(page) - 1) * limit;
  try {
    const totalContacts = await Contacts.countDocuments();
    const contacts = await Contacts.find().skip(skip).limit(limit);
    res.status(200).json({ totalContacts, contacts });
  } catch (error) {
    res.status(500).json({ message: "Error fetching contacts" });
  }
};

const createContact = async (req, res) => {
  const { success, error } = contactvalidateSchema.safeParse(req.body);
  if (error) {
    return res.status(400).json({ message: "Invalid request body" });
  }

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
  const { success, error } = contactvalidateSchema.safeParse(req.body);
  if (error) {
    return res.status(400).json({ message: "Invalid request body" });
  }

  const id = req.params.id;
  const { firstName, lastName, email, phoneNumber, company, jobTitle } =
    req.body;

  try {
    const existingContact = await Contacts.findById(id);
    if (!existingContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    const query = {};
    if (email && email !== existingContact.email) {
      query.email = email;
    }
    if (phoneNumber && phoneNumber !== existingContact.phoneNumber) {
      query.phoneNumber = phoneNumber;
    }

    //  if the email or the phoneNumber is changed then we will check if other user has the same email or phoneNumber
    if (query.email || query.phoneNumber) {
      const duplicateContact = await Contacts.findOne({
        $or: [{ email: query.email }, { phoneNumber: query.phoneNumber }],
      });

      if (duplicateContact) {
        return res.status(400).json({
          message: "Contact with this email or phone number already exists",
        });
      }
    }

    const updatedContact = await Contacts.findByIdAndUpdate(
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

    res.status(200).json(updatedContact);
  } catch (error) {
    console.log("Error while updating: ", error);
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
