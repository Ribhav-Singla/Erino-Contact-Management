import Button from "@mui/material/Button";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';

export default function Homepage() {
  return (
    <>
      <div className="bg-slate-100 flex flex-col justify-start items-center pt-20 pb-20 gap-12 h-full">
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-5xl font-bold">Contact Management</h1>
            <h1 className="text-5xl font-bold mt-5">System</h1>
        </div>
        <Button className="max-w-xs w-full" variant="contained" color="success" endIcon={<AddIcCallIcon/>}>
          Create new contact
        </Button>
        <Button className="max-w-xs w-full" variant="contained" color="primary" endIcon={<PersonSearchIcon/>}>
          contact List
        </Button>
      </div>
    </>
  );
}
