import dayjs from 'dayjs';
import styled from 'styled-components';
import { DatePicker, Form, Input, Radio } from 'antd';
import { FormHeader } from '../forms/PersonalInfoForm';

export default function PersonalInfoSection(props: any) {
  const {submitted, setSubmitted} = props;
  
  return <>
   <FormHeader>
      Personal Information 
      {submitted && <EditButton onClick={e => setSubmitted(false)}>Edit</EditButton>}
    </FormHeader>
    <Form.Item 
      label='First Name'
      name='firstName'
      rules={[{ required: true, message: 'Please input your first name' }]}
    >
      <StyledInput placeholder='ex: John'/>
    </Form.Item>

    <Form.Item 
      label='Last Name'
      name='lastName'
      rules={[{ required: true, message: 'Please input your last name' }]}
    >
      <StyledInput placeholder='ex: Smith'/>
    </Form.Item>

    <Form.Item 
      label='Middle Initial'
      name='middle'
    >
      <Input style={{width: "10%"}}/>
    </Form.Item>

    <Form.Item 
      label='Date of Birth'
      name='birth'
      rules={[{ required: true, message: 'Please input your date of birth' }]}
    >
      <DatePicker
        style={{width: "35%"}}
        disabledDate={current => current && current > dayjs().subtract(10, 'years')} 
        allowClear={false}
        placeholder="YYYY-MM-DD"
      />
    </Form.Item>

    <Form.Item 
      label='Ethnicity'
      name='ethnicity'
      rules={[{ required: true, message: 'Please select your ethnicity' }]}

    >
      <Radio.Group>
        <RadioLayout>
          <Radio value='white'>White</Radio>
          <Radio value='hispanic'>Hispanic or Latino</Radio>
          <Radio value='black'>Black or African American</Radio>
          <Radio value='asian'>Asian</Radio>
          <Radio value='native'>Native American</Radio>
          <Radio value='islander'>Native Hawaiian or other Pacific Islander</Radio>
          <Radio value='other'>Other</Radio>
        </RadioLayout>
      </Radio.Group>
    </Form.Item>
  </>
}

const EditButton = styled.button`
  width: 120px;
  height: 50px;
  font-size: 18px;
  background-color: #106ec6;
  padding: 4px 15px;
  border-radius: 6px;
  border: none;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #106ec6cc;
  }
`;

const StyledInput = styled(Input)`
  width: 70%;
`;

const RadioLayout = styled.div`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: repeat(4, auto);
`;