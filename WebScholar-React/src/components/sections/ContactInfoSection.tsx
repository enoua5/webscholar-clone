import styled from 'styled-components';
import { Form, Input, Select } from 'antd';
import { FiftyStates } from '../forms/FiftyStates';
import { FormHeader } from '../forms/PersonalInfoForm';

export default function ContactInfoSection(props: any) {
  return <>
    <FormHeader>Contact Information</FormHeader>
        <Form.Item 
          label='Email'
          name='email'
          rules={[{ required: true, message: 'Please input your email address' }]}
        >
          <StyledInput placeholder='ex: student@mail.com'/>
        </Form.Item>

        <Form.Item 
          label='Phone'
          name='phone'
          tooltip='Please enter in the format: 1234567890'
        >
          <Input 
            type='tel'
            placeholder='ex: 1234567890'
            pattern='[0-9]{10}' 
            style={{width: "35%"}}
          />
        </Form.Item>

        <Form.Item 
          label='Street Address'
          name='streetAddress'
          rules={[{ required: true, message: 'Please input your street address' }]}
        >
          <StyledInput placeholder='ex: 123 Country Rd'/>
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
          <Input style={{width: "35%"}} placeholder='ex: Detroit'/>
        </Form.Item>

        <Form.Item 
          label='State'
          name='state'
          rules={[{ required: true, message: 'Please select your state' }]}
        >
          <Select style={{width: "35%"}} placeholder='Select one'>
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
          <Input style={{width: "25%"}} placeholder='ex: 84403' type='number' pattern='[0-9]{5}'/>
        </Form.Item>
  </>
}

const StyledInput = styled(Input)`
  width: 70%;
`;