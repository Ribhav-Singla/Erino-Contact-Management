import Button from "@mui/material/Button";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import { useNavigate } from "react-router-dom";

export default function Homepage() {

  const navigate = useNavigate();

  return (
    <>
      <div className="bg-slate-100 flex flex-col justify-start items-center pt-20 pb-20 gap-12 h-full">
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-5xl font-bold">Contact Management</h1>
            <h1 className="text-5xl font-bold mt-5">System</h1>
        </div>
        <Button className="max-w-xs w-full" variant="contained" color="success" endIcon={<AddIcCallIcon/>} onClick={()=>navigate('/createContact')}>
          Create new contact
        </Button>
        <Button className="max-w-xs w-full" variant="contained" color="primary" endIcon={<PersonSearchIcon/>} onClick={()=>navigate('/contacts')}>
          contact List
        </Button>
      </div>
    </>
  );
}
