import dayjs from 'dayjs';
import styled from 'styled-components';
import { InboxOutlined } from '@ant-design/icons';
import { FormHeader } from '../forms/PersonalInfoForm';
import { DatePicker, Form, Input, Radio, Upload } from 'antd';

export default function PersonalInfoSection(props: any) {
  const {form, submitted, setSubmitted} = props;
  const citizen = Form.useWatch('citizen', form);
  const visaStatus = Form.useWatch('visaStatus', form);

  const uploadFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  
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
      label='Gender'
      name='gender'
      rules={[{required: true, message: 'Please select your gender'}]}
    >
      <Radio.Group>
        <Radio value='male'>Male</Radio>
        <Radio value='female'>Female</Radio>
        <Radio value='other'>Other</Radio>
      </Radio.Group>
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
          <Radio value='unknown'>I prefer not to say</Radio>
        </RadioLayout>
      </Radio.Group>
    </Form.Item>

    <Form.Item
      label='Are you a US citizen?'
      name='citizen'
      rules={[{required: true, message: 'Please select your citizenship status'}]}
    >
      <Radio.Group>
        <Radio value={true}>Yes</Radio>
        <Radio value={false}>No</Radio>
      </Radio.Group>
    </Form.Item>

    {!citizen && <>
      <Form.Item
        label='Do you have a student visa?'
        name='visaStatus'
        rules={[{required: true, message: 'Please indicate if you have a visa'}]}
      >
        <Radio.Group>
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </Radio.Group>
      </Form.Item>
         
      {visaStatus && <Form.Item requiredMark={undefined} label="Upload proof of current student visa" labelCol={{span: 7}} >
        <Form.Item 
          name="visa" 
          valuePropName="visa" 
          getValueFromEvent={uploadFile} 
          noStyle
          rules={[{required: true, message: 'Please upload proof of a current student visa'}]}
          >
          <Upload.Dragger name="visaFile" action="/files" style={{width: "70%"}}> {/* need an endpoint to send files to (/files) */}
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>}
    </>}
  </>
}

export const EditButton = styled.button`
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