import { styled, createGlobalStyle } from "styled-components";
import { states } from "../data/statesData";
import { departments } from "../data/departmentsData";
import { useState, memo } from "react";
import { useDispatch } from "react-redux";
import { addEmployee } from "../store/employeesSlice";
import { Helmet } from "react-helmet-async";
import Modal from "../composants/modal/Modal";
import { Calendar } from "../composants/calendar/Calendar";
import { SelectInput } from "../composants/selectInput/SelectInput";

const GlobalStyle = createGlobalStyle`
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Title = styled.h1`
  color: black;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 600px;
  background-color: #009879;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: 500;
`;

const Input = styled.input`
  max-width: 200px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;

  &:focus {
    outline: 2px solid #0078d4;
    border-color: transparent;
  }
`;

const Fieldset = styled.fieldset`
  border: 1px solid white;
  border-radius: 4px;
  padding: 15px;
`;

const Legend = styled.legend`
  font-size: 1.2em;
  font-weight: bold;
  padding: 0 5px;
`;

const Button = styled.button`
  width: 100px;
  height: 40px;
  margin: 20px auto;
  background-color: rgb(0, 128, 255);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-items: center;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgb(0, 102, 204);
  }

  &:focus {
    outline: 2px solid white;
    outline-offset: 2px;
  }
`;

function CreateEmployee() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Conservation de votre structure employee exacte
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    hireDate: "",
    department: "",
    birthDate: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const handleChange = e => {
    const { id, value } = e.target;
    setEmployee({ ...employee, [id]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(
      addEmployee({
        ...employee,
        id: Date.now().toString(), // Ajout d'un ID unique
      })
    );
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEmployee({
      firstName: "",
      lastName: "",
      hireDate: "",
      department: "",
      birthDate: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    });
  };

  const fullName = `${employee.firstName} ${employee.lastName}`.trim();
  const successMessage = fullName
    ? `${fullName} has been added successfully to the employees.`
    : `Employee has been created successfully.`;

  return (
    <PageContainer>
      {/* SEO improvements */}
      <GlobalStyle />
      <Helmet>
        <title>Create Employee | HRnet</title>
        <meta
          name="description"
          content="Create a new employee record in the HRnet employee management system."
        />
      </Helmet>

      <Title>Create Employee</Title>
      <Form onSubmit={handleSubmit} aria-labelledby="form-heading">
        <h2 id="form-heading" className="sr-only">
          Employee Information Form
        </h2>

        <InputWrapper>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            type="text"
            value={employee.firstName}
            onChange={handleChange}
            required
            aria-required="true"
          />
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            type="text"
            value={employee.lastName}
            onChange={handleChange}
            required
            aria-required="true"
          />
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor="birthDate">Date of Birth</Label>
          <Calendar
            id="birthDate"
            value={employee.birthDate}
            onChange={handleChange}
            required
            aria-required="true"
          />
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor="hireDate">Start Date</Label>
          <Calendar
            id="hireDate"
            value={employee.hireDate}
            onChange={handleChange}
            required
            aria-required="true"
          />
        </InputWrapper>

        <Fieldset>
          <Legend>Address</Legend>

          <InputWrapper>
            <Label htmlFor="address">Street</Label>
            <Input
              id="address"
              type="text"
              value={employee.address}
              onChange={handleChange}
              required
              aria-required="true"
            />
          </InputWrapper>

          <InputWrapper>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              type="text"
              value={employee.city}
              onChange={handleChange}
              required
              aria-required="true"
            />
          </InputWrapper>

          <InputWrapper>
            <InputWrapper>
              <Label htmlFor="state">State</Label>
              <SelectInput
                id="state"
                value={employee.state}
                onChange={handleChange}
                options={states}
                placeholder="Select State"
                required
              />
            </InputWrapper>
          </InputWrapper>

          <InputWrapper>
            <Label htmlFor="zipCode">Zip Code</Label>
            <Input
              id="zipCode"
              type="number"
              value={employee.zipCode}
              onChange={handleChange}
              required
              aria-required="true"
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </InputWrapper>
        </Fieldset>

        <InputWrapper>
          <Label htmlFor="department">Department</Label>
          <SelectInput
            id="department"
            value={employee.department}
            onChange={handleChange}
            options={departments}
            placeholder="Select Department"
            required
          />
        </InputWrapper>

        <Button type="submit" aria-label="Save employee information">
          Save
        </Button>
      </Form>

      {/* Utilisation du nouveau Modal avec la même interface */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Success!" closeText="Close">
        <p>{successMessage}</p>
      </Modal>
    </PageContainer>
  );
}

// Optimisation des performances avec memo
export default memo(CreateEmployee);
