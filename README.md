
# Erino Contact Management

Contact Management helps users of the system to keep a track of important contact information of customers. It lets users add, view, update, and delete contact details all in one place. This makes it easy for users to find and manage information, which is especially helpful in a business setting where keeping track of relationships is key.

## Run Locally

Clone the project

```bash
  git clone https://github.com/Ribhav-Singla/Erino-Contact-Management.git

```

For the client:

```bash
  cd client
  npm install
  npm run dev

```

For the server:

```bash
  cd server
  npm install
  npm run dev

```

## Tech Stack

- **Frontend**:
  - TailwindCSS
  - ReactJS
  - Material UI (MUI)
  - Framer Motion
  - React Router DOM
  - MUI Icons
  - Axios

- **Backend**:
  - Zod (for request body validation)
  - Mongoose (for MongoDB integration)
  - Express (for API handling)
  - Nodemon (for automatic server restarts during development)
## Database Scehma Script

```bash
const mongoose = require("mongoose");

const contactsSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Contacts = mongoose.model("Contacts", contactsSchema);

module.exports = Contacts
```
## How the App Works

- The **frontend** (React) handles the user interface and communicates with the **backend** (Express API) using Axios for CRUD operations.
- The **backend** uses **Express** for routing, **Mongoose** to interact with MongoDB, and **Zod** for input validation.

### Features:

1. **Create New Contact**:  
‎  Users can create a new contact using **form-controlled components** from Material UI (MUI). The form ensures proper state management and validation before sending data to the backend.

2. **View Contacts**:  
   - Users can view all the stored contacts.  
   - Contacts are displayed with sorting functionality, allowing sorting in ascending or descending order based on the first name.  
   - **Pagination**: The backend serves only 15 contacts by default. The current page and sorting criteria (`sortBy`) are sent as query parameters to the GET request.  

3. **Update Existing Contact**:  
   Users can select an existing contact and update its details through a pre-filled form.


4. **Delete Contact**:  
   Users can delete a contact by clicking the delete button. A confirmation ensures no accidental deletions.

### Unique Attributes:
- **Phone Number** and **Email** are unique attributes for each contact record. Duplicate values for these fields are restricted by both frontend validation and backend database constraints.

### Backend Protection:
- The **backend model** is protected by:
  - **Mongoose's built-in type checking**, ensuring the database only stores valid data.
  - **Zod library** for JavaScript, providing additional input validation and safeguarding against invalid requests.

This structure ensures robust functionality and a seamless user experience.

## Challenges and Solutions

### Challenge 1: Handling Input Validation

**Problem**: Ensuring the data submitted by the user is correct and follows the required format was a challenge. Invalid data could easily break the system or cause inconsistencies.

**Solution**: To handle input validation efficiently, I integrated Zod for validating the incoming data. Zod ensures that the data sent to the backend matches the expected structure (e.g. ensuring that email addresses are properly formatted and required fields are not missing).

### Challenge 2: Managing State in React

**Problem**: The frontend needed to update the contact list dynamically without refreshing the page, while maintaining a smooth user experience.

**Solution**: I used React's state management system along with Axios to make API calls for adding, updating, and deleting contacts. The contact list is automatically updated on the frontend whenever a modification occurs.

### Challenge 3: Choosing Between PostgreSQL and MongoDB  

**Problem**: I had to decide between PostgreSQL and MongoDB for the database. While PostgreSQL is great for relational data, MongoDB offers more flexibility with its JSON-like structure, which seemed like a better fit for this project.

**Solution**: I went with **MongoDB** because it’s simpler to work with for this type of application. Its flexible schema, combined with Mongoose’s model system, made it easier to handle the data structure, speeding up development and allowing for easy scalability as the project grows.
