import dayjs from 'dayjs';
import { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'antd/es/form/Form';
import { FiftyStates } from './FiftyStates';
import { useAppSelector } from '../../hooks';
import { PageContainer } from '../elements/PageContainer';
import { userState } from '../../state/reducers/userSlice';
import { Button, DatePicker, Form, Input, Radio, Row, Select } from 'antd';
import { CheckCircle } from 'react-feather';
import { useNavigate } from 'react-router-dom';

export default function PersonalInfoForm() {
  const [form] = useForm();
  const navigate = useNavigate();
  const user = useAppSelector(userState);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitSuccess = (values: any) => {
      console.log("FORM SUBMITTED SUCCESSFULLY: ", values);
      setSubmitted(true);
  };

  const handleSubmitFailure = (values: any) => {
    console.log("FORM SUBMISSION FAILED", values)
  };

  return (
    <FormContainer>
      <FormHeader>
        Personal Information 
        {submitted && <EditButton onClick={e => setSubmitted(false)}>Edit</EditButton>}
        </FormHeader>
      <Form
        disabled={submitted}
        style={{width: "100%"}}
        labelAlign='left'
        labelCol={{span: 6}}
        form={form}
        name="student"
        initialValues={{firstName: user.firstName, lastName: user.lastName, email: user.email, ethnicity: 'white'}}
        onFinish={handleSubmitSuccess}
        onFinishFailed={handleSubmitFailure}
        autoComplete='off'
        requiredMark='optional'
      >
        <Form.Item 
          label='First Name'
          name='firstName'
          rules={[{ required: true, message: 'Please input your first name' }]}
        >
          <HalfWidthInput placeholder='ex: John'/>
        </Form.Item>

        <Form.Item 
          label='Last Name'
          name='lastName'
          rules={[{ required: true, message: 'Please input your last name' }]}
        >
          <HalfWidthInput placeholder='ex: Smith'/>
        </Form.Item>

        <Form.Item 
          label='Middle Initial'
          name='middle'
        >
          <Input style={{width: "7.5%"}}/>
        </Form.Item>

        <Form.Item 
          label='Date of Birth'
          name='birth'
          rules={[{ required: true, message: 'Please input your date of birth' }]}
        >
          <DatePicker
            style={{width: "25%"}}
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

        <FormHeader>Contact Information</FormHeader>
        <Form.Item 
          label='Email'
          name='email'
          rules={[{ required: true, message: 'Please input your email address' }]}
        >
          <HalfWidthInput placeholder='ex: student@mail.com'/>
        </Form.Item>

        <Form.Item 
          label='Phone'
          name='phone'
          tooltip='Please enter in the format: 123-456-7890'
        >
          <Input 
            type='tel'
            placeholder='ex: 123-456-7890'
            pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}' 
            style={{width: "25%"}}
          />
        </Form.Item>

        <Form.Item 
          label='Street Address'
          name='streetAddress'
          rules={[{ required: true, message: 'Please input your street address' }]}
        >
          <HalfWidthInput placeholder='ex: 123 Country Rd'/>
        </Form.Item>

        <Form.Item 
          label='Apt/Unit #'
          name='streetAddress2'
        >
          <Input style={{width: "10%"}}/>
        </Form.Item>

        <Form.Item 
          label='City'
          name='city'
          rules={[{ required: true, message: 'Please input your city' }]}
        >
          <Input style={{width: "25%"}} placeholder='ex: Detroit'/>
        </Form.Item>

        <Form.Item 
          label='State'
          name='state'
          rules={[{ required: true, message: 'Please select your state' }]}
        >
          <Select style={{width: "25%"}} placeholder='Select one'>
            {FiftyStates.map((state, index) => {
              return <Select.Option key={index} value={state.value}>{state.label}</Select.Option>
            })}
          </Select>
        </Form.Item>

        <Form.Item 
          label='Zip'
          name='zip'
          tooltip='Enter the 5 digit area code associated with your address'
          rules={[{ required: true, message: 'Please input your zip/area code' }]}
        >
          <Input style={{width: "15%"}} placeholder='ex: 84403' type='number' pattern='[0-9]{5}'/>
        </Form.Item>

        <Form.Item>
          {!submitted ? 
            <SaveButton type='primary' htmlType='submit'>Save</SaveButton>
          :
            <Row style={{gap: "15px"}}>
              <CheckCircle style={{color: "green", fontSize: "20px"}}/>
              <SavedText>Changes saved successfully!</SavedText>
            </Row>
          }
        </Form.Item>
      </Form>
      {submitted && <EditButton onClick={e => navigate}>Next</EditButton>}
    </FormContainer>
  )
}

export const FormContainer = styled(PageContainer)`
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 10px;
  min-width: 0px;
`;

const FormHeader = styled.div`
  font-size: 24px;
  font-weight: 600;
  padding-bottom: 15px;
  margin-bottom: 25px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  text-align: left;
  border-bottom: 1px solid #d9d9d9;
`;

const HalfWidthInput = styled(Input)`
  width: 50%;
`;

const RadioLayout = styled.div`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: repeat(4, auto);
`;

const SaveButton = styled(Button)`
  width: 120px;
  height: 50px;
  font-size: 18px;
`;

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

const SavedText = styled.div`
  color: green;
  font-size: 20px;
  font-family: sans-serif;
`;