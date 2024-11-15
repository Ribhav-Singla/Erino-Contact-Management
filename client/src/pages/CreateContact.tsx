import {
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import FormControl from "@mui/material/FormControl";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ShortTextIcon from "@mui/icons-material/ShortText";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import { useState } from "react";

interface FormDataType {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  company: string;
  jobTitle: string;
}

interface ErrorType {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  company?: string;
  jobTitle?: string;
}

export default function CreateContact() {
  const [formData, setFormData] = useState<FormDataType>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    company: "",
    jobTitle: "",
  });

  const [error, setError] = useState<ErrorType>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    company: "",
    jobTitle: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError((prevError) => ({
      ...prevError,
      [name]: "",
    }));
  };

  const validateFields = () => {
    const newErrors: ErrorType = {};

    const isEmptyOrNot = (value: string) => !value.trim();

    if (isEmptyOrNot(formData.firstName)) {
      newErrors.firstName = "FirstName is required";
    } else if (formData.firstName.length > 50) {
      newErrors.firstName = "FirstName must be at most 50 characters";
    }

    if (formData.lastName.length > 50) {
      newErrors.lastName = "LastName must be at most 50 characters";
    }

    if (isEmptyOrNot(formData.email)) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    } else if (formData.email.length > 50) {
      newErrors.email = "Email must be at most 50 characters";
    }

    if (isEmptyOrNot(formData.phoneNumber)) {
      newErrors.phoneNumber = "PhoneNumber is required";
    } else if (
      !/^\d{10}$/.test(formData.phoneNumber) ||
      formData.phoneNumber.length != 10
    ) {
      newErrors.phoneNumber = "PhoneNumber must be 10 digits";
    }

    if (isEmptyOrNot(formData.company)) {
      newErrors.company = "Company is required";
    } else if (formData.company.length > 50) {
      newErrors.company = "Company name must be at most 50 characters";
    }

    if (isEmptyOrNot(formData.jobTitle)) {
      newErrors.jobTitle = "JobTitle is required";
    } else if (formData.jobTitle.length > 50) {
      newErrors.jobTitle = "JobTitle must be at most 50 characters";
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateFields()) {
      console.log("Form data:", formData);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center my-10 py-10 gap-5 bg-slate-50">
      <h1 className="text-xl font-semibold">Create Contact</h1>
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1 } }}
        noValidate
        autoComplete="off"
        className="flex flex-col max-w-[640px] w-full"
        onSubmit={handleSubmit}
      >
        <FormControl error={error.firstName ? true : false}>
          <InputLabel htmlFor="firstName">FirstName</InputLabel>
          <OutlinedInput
            id="firstName"
            name="firstName"
            label="FirstName"
            value={formData.firstName}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <PersonIcon />
              </InputAdornment>
            }
          />
          <FormHelperText>{error.firstName}</FormHelperText>
        </FormControl>

        <FormControl error={error.lastName ? true : false}>
          <InputLabel htmlFor="lastName">LastName (Optional)</InputLabel>
          <OutlinedInput
            id="lastName"
            name="lastName"
            label="LastName (Optional)"
            value={formData.lastName}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <PersonIcon />
              </InputAdornment>
            }
          />
          <FormHelperText>{error.lastName}</FormHelperText>
        </FormControl>

        <FormControl error={error.email ? true : false}>
          <InputLabel htmlFor="email">Email</InputLabel>
          <OutlinedInput
            id="email"
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <EmailIcon />
              </InputAdornment>
            }
          />
          <FormHelperText>{error.email}</FormHelperText>
        </FormControl>

        <FormControl error={error.phoneNumber ? true : false}>
          <InputLabel htmlFor="phoneNumber">PhoneNumber</InputLabel>
          <OutlinedInput
            id="phoneNumber"
            name="phoneNumber"
            label="PhoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <PhoneIcon />
              </InputAdornment>
            }
          />
          <FormHelperText>{error.phoneNumber}</FormHelperText>
        </FormControl>

        <FormControl error={error.company ? true : false}>
          <InputLabel htmlFor="company">Company</InputLabel>
          <OutlinedInput
            id="company"
            name="company"
            label="Company"
            value={formData.company}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <ShortTextIcon />
              </InputAdornment>
            }
          />
          <FormHelperText>{error.company}</FormHelperText>
        </FormControl>

        <FormControl error={error.jobTitle ? true : false}>
          <InputLabel htmlFor="jobTitle">JobTitle</InputLabel>
          <OutlinedInput
            id="jobTitle"
            name="jobTitle"
            label="JobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <ShortTextIcon />
              </InputAdornment>
            }
          />
          <FormHelperText>{error.jobTitle}</FormHelperText>
        </FormControl>

        <div className="flex justify-center items-center p-2">
          <Button
            className="max-w-sm w-full"
            variant="contained"
            color="success"
            endIcon={<AddIcCallIcon />}
            type="submit"
          >
            Create contact
          </Button>
        </div>
      </Box>
    </div>
  );
}
