import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function DeleteContact({
  firstName,
  lastName,
  email,
  phoneNumber,
  company,
  jobTitle,
  setToggleDelete,
}: {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  company: string;
  jobTitle: string;
  setToggleDelete: React.Dispatch<React.SetStateAction<Boolean>>;
}) {
  return (
    <>
      <div className="overlay">
        <div className="flex flex-col gap-5 justify-center items-center bg-white w-fit p-10 rounded-lg">
          <h1 className="text-2xl font-semibold">Contact</h1>
          <div className="flex flex-col justify-center items-center">
            <h1>
              {firstName} {lastName}
            </h1>
            <h1>{email}</h1>
            <h1>{phoneNumber}</h1>
            <h1>{company}</h1>
            <h1>{jobTitle}</h1>
          </div>
          <h1 className="text-xl font-semibold">
            Are you sure you want to delete?
          </h1>
          <Stack spacing={2} direction="row">
            <Button variant="contained" color="error">
              Yes
            </Button>
            <Button variant="contained" onClick={() => setToggleDelete(false)}>
              No
            </Button>
          </Stack>
        </div>
      </div>
    </>
  );
}

export default DeleteContact;
