import { styled } from "styled-components";
import { states } from "../data/statesData";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const Title = styled.h1`
color: black;`

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
  return (
    <PageContainer>
      <Title>Create Employee</Title>
      <Form>
        <InputWrapper>
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" type="text" />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" type="text" />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="birthDate">Date of Birth</Label>
          <Input id="birthDate" type="date" />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="hireDate">Start Date</Label>
          <Input id="hireDate" type="date" />
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
            <Input id="address" type="text" />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="city">City</Label>
            <Input id="city" type="text" />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="state">State</Label>
            <Select id="state">
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
            <Input id="zip" type="number" />
          </InputWrapper>
        </Fieldset>
        <InputWrapper>
          <Label htmlFor="departement">Departement</Label>
          <Select id="departement">
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
