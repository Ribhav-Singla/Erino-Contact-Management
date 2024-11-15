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
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// LIMIT is also defined in the backend as 15
const LIMIT = 15;

interface CONTACT {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  company: string;
  jobTitle: string;
}

export default function Contacts() {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<string>('asc');
  const [rows, setRows] = useState<CONTACT[]>([]);
  const [totalContacts, setTotalContacts] = useState<number>(200);
  const [page, setPage] = useState<number>(1);
  const [toggleDelete, setToggleDelete] = useState<Boolean>(false);
  const [refreshContacts, setRefreshContacts] = useState(false);
  const [selectedContact, setSelectedContact] = useState<CONTACT | null>(null);
  const [loading, setLoading] = useState(true);
  
  const handleSortBy = (orderBy: string) => {
    if (sortBy == orderBy) return;
    else if (sortBy == 'asc') {
      setSortBy('desc');
    } else {
      setSortBy('asc');
    }
  };

  useEffect(() => {
    const getContacts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/contacts?page=${page}&sortBy=${sortBy}`
        );        
        if (response.status == 200) {
          setTotalContacts(response.data.totalContacts);
          setRows(response.data.contacts);
          setLoading(false);
        }
      } catch (error) {
        console.log("error ocuured while getting contacts: ", error);
      }
    };

    getContacts();
  }, [refreshContacts, page, sortBy]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <CircularProgress />
      </div>
    );
  }

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
            variant={sortBy == 'asc' ? `contained` : "outlined"}
            onClick={() => handleSortBy('asc')}
          >
            Ascending
          </Button>
          <Button
            variant={sortBy == 'desc' ? `contained` : "outlined"}
            onClick={() => handleSortBy('desc')}
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
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {LIMIT * (page - 1) + index + 1}
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
                      navigate(`/updateContact/${row._id}`, {
                        state: { contact: row },
                      })
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
          page={page}
          onChange={(event, value) => setPage(value)}
        />
      </div>

      {toggleDelete && selectedContact && (
        <DeleteContact
          id={selectedContact._id}
          firstName={selectedContact.firstName}
          lastName={selectedContact.lastName}
          email={selectedContact.email}
          phoneNumber={selectedContact.phoneNumber}
          company={selectedContact.company}
          jobTitle={selectedContact.jobTitle}
          setToggleDelete={setToggleDelete}
          setRefreshContacts={setRefreshContacts}
        />
      )}
    </div>
  );
}
