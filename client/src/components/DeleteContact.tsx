import { Snackbar, Alert } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

function DeleteContact({
  id,
  firstName,
  lastName,
  email,
  phoneNumber,
  company,
  jobTitle,
  setToggleDelete,
  setRefreshContacts,
}: {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  company: string;
  jobTitle: string;
  setToggleDelete: React.Dispatch<React.SetStateAction<Boolean>>;
  setRefreshContacts: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<{
    message: string;
    severity: "error" | "info";
  }>({
    message: "",
    severity: "info",
  });

  const handleDeleteContact = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/contacts/${id}`
      );
      if (response.status == 200) {
        const successMessage = "Contact deleted successfully";
        setSnackbarMessage({
          message: successMessage,
          severity: "info",
        });
        setSnackbarOpen(true);
        setTimeout(() => {
          setToggleDelete(false);
          setRefreshContacts(prev => !prev);
        }, 500);
      }
    } catch (error) {
      //@ts-ignore
      const errorMessage = error.response?.data?.message || "An error occurred while deleting the contact.";
      setSnackbarMessage({
        message: errorMessage,
        severity: "error",
      });
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setToggleDelete(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="overlay">
        <div
          className="flex flex-col gap-2 sm:gap-5 justify-center items-center bg-white w-fit p-5 sm:p-10 rounded-lg m-5"
          ref={containerRef}
        >
          <h1 className="text-xl sm:text-2xl font-semibold">Contact</h1>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-sm sm:text-base">
              {firstName} {lastName}
            </h1>
            <h1 className="text-sm sm:text-base">{email}</h1>
            <h1 className="text-sm sm:text-base">{phoneNumber}</h1>
            <h1 className="text-sm sm:text-base">{company}</h1>
            <h1 className="text-sm sm:text-base">{jobTitle}</h1>
          </div>
          <h1 className="text-xl font-semibold px-2 sm:px-0 text-center">
            Are you sure you want to delete?
          </h1>
          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteContact}
            >
              Yes
            </Button>
            <Button variant="contained" onClick={() => setToggleDelete(false)}>
              No
            </Button>
          </Stack>
        </div>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity={snackbarMessage.severity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage.message}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}

export default DeleteContact;
