import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import DeleteContact from "../components/DeleteContact";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// LIMIT is also defined in the backend as 15
const LIMIT = 15;
const data = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phoneNumber: "1234567890",
    company: "Example Corp",
    jobTitle: "Software Engineer",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phoneNumber: "1234567890",
    company: "Tech Innovations",
    jobTitle: "Product Manager",
  },
  {
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael.johnson@example.com",
    phoneNumber: "1234567890",
    company: "Global Solutions",
    jobTitle: "Marketing Director",
  },
  {
    firstName: "Emily",
    lastName: "Williams",
    email: "emily.williams@example.com",
    phoneNumber: "1234567890",
    company: "Creative Agency",
    jobTitle: "Graphic Designer",
  },
  {
    firstName: "David",
    lastName: "Brown",
    email: "david.brown@example.com",
    phoneNumber: "1234567890",
    company: "Innovative Systems",
    jobTitle: "Project Manager",
  },
  {
    firstName: "Sarah",
    lastName: "Taylor",
    email: "sarah.taylor@example.com",
    phoneNumber: "0987654321",
    company: "FinTech Solutions",
    jobTitle: "Data Scientist",
  },
  {
    firstName: "Chris",
    lastName: "Miller",
    email: "chris.miller@example.com",
    phoneNumber: "0987654321",
    company: "Digital Works",
    jobTitle: "Backend Developer",
  },
  {
    firstName: "Patricia",
    lastName: "Davis",
    email: "patricia.davis@example.com",
    phoneNumber: "0987654321",
    company: "Smart Apps",
    jobTitle: "UI/UX Designer",
  },
  {
    firstName: "James",
    lastName: "Garcia",
    email: "james.garcia@example.com",
    phoneNumber: "0987654321",
    company: "Enterprise Inc",
    jobTitle: "DevOps Engineer",
  },
  {
    firstName: "Sophia",
    lastName: "Martinez",
    email: "sophia.martinez@example.com",
    phoneNumber: "0987654321",
    company: "Health Tech",
    jobTitle: "Product Designer",
  },
  {
    firstName: "Brian",
    lastName: "Lopez",
    email: "brian.lopez@example.com",
    phoneNumber: "0987654321",
    company: "Eco World",
    jobTitle: "Environmental Consultant",
  },
  {
    firstName: "Olivia",
    lastName: "Wilson",
    email: "olivia.wilson@example.com",
    phoneNumber: "0987654321",
    company: "Edu Solutions",
    jobTitle: "Instructional Designer",
  },
  {
    firstName: "Jack",
    lastName: "Clark",
    email: "jack.clark@example.com",
    phoneNumber: "0987654321",
    company: "Mobile Labs",
    jobTitle: "Android Developer",
  },
  {
    firstName: "Liam",
    lastName: "Robinson",
    email: "liam.robinson@example.com",
    phoneNumber: "0987654321",
    company: "Retail Ventures",
    jobTitle: "E-commerce Specialist",
  },
  {
    firstName: "Emma",
    lastName: "Harris",
    email: "emma.harris@example.com",
    phoneNumber: "0987654321",
    company: "Global Ventures",
    jobTitle: "Business Analyst",
  },
];

interface CONTACT {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  company: string;
  jobTitle: string;
}

export default function Contacts() {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<number>(1);
  const [rows, setRows] = useState(data);
  const [totalContacts, setTotalContacts] = useState<number>(200);
  const [page, setPage] = useState<number>(1);
  const [toggleDelete, setToggleDelete] = useState<Boolean>(false);
  const [selectedContact, setSelectedContact] = useState<CONTACT | null>(null);

  const sortAscending = () => {
    return rows.sort((a, b) => {
      if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) return -1;
      if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) return 1;
      if (a.lastName.toLowerCase() < b.lastName.toLowerCase()) return -1;
      if (a.lastName.toLowerCase() > b.lastName.toLowerCase()) return 1;
      return 0;
    });
  };

  const sortDescending = () => {
    return rows.sort((a, b) => {
      if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) return -1;
      if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) return 1;
      if (a.lastName.toLowerCase() > b.lastName.toLowerCase()) return -1;
      if (a.lastName.toLowerCase() < b.lastName.toLowerCase()) return 1;
      return 0;
    });
  };

  const handleSortBy = (num: number) => {
    if (sortBy == num) return;
    else if (sortBy == 1) {
      setSortBy(-1);
      setRows(sortDescending());
    } else {
      setSortBy(1);
      setRows(sortAscending());
    }
  };

  return (
    <div className="bg-slate-50 py-5">
      <div className="flex flex-col justify-center items-center gap-5 py-5 px-5 ">
        <div className="flex justify-start items-center w-full">
          <Button variant="contained" onClick={() => navigate("/")}>
            <ArrowBackIcon />
          </Button>
        </div>
        <h1 className="text-xl font-semibold">SortBy</h1>
        <Stack spacing={2} direction="row">
          <Button
            variant={sortBy == 1 ? `contained` : "outlined"}
            onClick={() => handleSortBy(1)}
          >
            Ascending
          </Button>
          <Button
            variant={sortBy == 1 ? `outlined` : "contained"}
            onClick={() => handleSortBy(-1)}
          >
            Descending
          </Button>
        </Stack>
      </div>

      <div className="px-10">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell align="right">FirstName</TableCell>
                <TableCell align="right">LastName</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">PhoneNumber</TableCell>
                <TableCell align="right">Company</TableCell>
                <TableCell align="right">JobTitle</TableCell>
                <TableCell align="right" colSpan={2}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row: CONTACT, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="right">{row.firstName}</TableCell>
                  <TableCell align="right">{row.lastName}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.phoneNumber}</TableCell>
                  <TableCell align="right">{row.company}</TableCell>
                  <TableCell align="right">{row.jobTitle}</TableCell>
                  <TableCell
                    align="right"
                    onClick={() =>
                      navigate(`/updateContact/${index}`, { state: { contact: row } })
                    }
                  >
                    <EditNoteIcon className="text-green-600 cursor-pointer" />
                  </TableCell>
                  <TableCell
                    align="right"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedContact(row);
                      setToggleDelete(!toggleDelete);
                    }}
                  >
                    <DeleteIcon className="text-red-600 cursor-pointer" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="flex justify-center items-center py-5">
        <Pagination
          count={Math.ceil(totalContacts / LIMIT)}
          variant="outlined"
          shape="rounded"
          color="primary"
        />
      </div>

      {toggleDelete && selectedContact && (
        <DeleteContact
          firstName={selectedContact.firstName}
          lastName={selectedContact.lastName}
          email={selectedContact.email}
          phoneNumber={selectedContact.phoneNumber}
          company={selectedContact.company}
          jobTitle={selectedContact.jobTitle}
          setToggleDelete={setToggleDelete}
        />
      )}
    </div>
  );
}
