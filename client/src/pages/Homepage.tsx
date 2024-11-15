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
            <h1 className="text-4xl sm:text-5xl font-bold text-center">Contact Management</h1>
            <h1 className="text-4xl sm:text-5xl font-bold sm:mt-5">System</h1>
        </div>
        <div className="flex flex-col justify-center items-center w-full gap-8 px-5 sm:px-0">
          <Button className="max-w-xs w-full" variant="contained" color="success" endIcon={<AddIcCallIcon/>} onClick={()=>navigate('/createContact')}>
            Create new contact
          </Button>
          <Button className="max-w-xs w-full" variant="contained" color="primary" endIcon={<PersonSearchIcon/>} onClick={()=>navigate('/contacts')}>
            contact List
          </Button>
        </div>
      </div>
    </>
  );
}
