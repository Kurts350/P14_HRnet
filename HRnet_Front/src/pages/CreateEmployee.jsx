import { styled } from "styled-components";
import { states } from "../data/statesData";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addEmployee } from "../store/employeesSlice";
import { useNavigate } from "react-router-dom";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const Title = styled.h1`
  color: black;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
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
`;

const Input = styled.input`
  max-width: 200px;
`;

const Fieldset = styled.fieldset``;

const Select = styled.select`
  max-width: 200px;
  height: 30px;
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
`;

export function CreateEmployee() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setEmployee({ ...employee, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addEmployee(employee));
    navigate("/employee-list");
  };

  return (
    <PageContainer>
      <Title>Create Employee</Title>
      <Form onSubmit={handleSubmit}>
        <InputWrapper>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            type="text"
            value={employee.firstName}
            onChange={handleChange}
            required
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
          />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="birthDate">Date of Birth</Label>
          <Input
            id="birthDate"
            type="date"
            value={employee.birthDate}
            onChange={handleChange}
            required
          />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="hireDate">Start Date</Label>
          <Input
            id="hireDate"
            type="date"
            value={employee.hireDate}
            onChange={handleChange}
            required
          />
        </InputWrapper>
        <Fieldset>
          <legend
            style={{
              fontSize: "1.2em",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Address
          </legend>
          <InputWrapper>
            <Label htmlFor="address">Street</Label>
            <Input
              id="address"
              type="text"
              value={employee.address}
              onChange={handleChange}
              required
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
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="state">State</Label>
            <Select
              id="state"
              value={employee.state}
              onChange={handleChange}
              required
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.abbreviation} value={state.abbreviation}>
                  {state.name}
                </option>
              ))}
            </Select>
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="zip">Zip Code</Label>
            <Input
              id="zipCode"
              type="number"
              value={employee.zip}
              onChange={handleChange}
              required
            />
          </InputWrapper>
        </Fieldset>
        <InputWrapper>
          <Label htmlFor="departement">Departement</Label>
          <Select
            id="department"
            value={employee.departement}
            onChange={handleChange}
            required
          >
            <option value="">Select Departement</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Engineering">Engineering</option>
            <option value="HR">Human Resources</option>
            <option value="Legal">Legal</option>
          </Select>
        </InputWrapper>
        <Button type="submit">Save</Button>
      </Form>
    </PageContainer>
  );
}
