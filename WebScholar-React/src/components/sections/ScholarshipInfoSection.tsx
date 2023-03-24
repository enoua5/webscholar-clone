import dayjs from 'dayjs';
import styled from 'styled-components';
import { InboxOutlined } from '@ant-design/icons';
import { FormHeader } from '../forms/PersonalInfoForm';
import { DatePicker, Form, Input, Radio, Upload, Checkbox } from 'antd';

export default function ScholarshipInfoSection(props: any) {
    const { form, submitted, setSubmitted } = props;
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
            Scholarship Information
            {submitted && <EditButton onClick={e => setSubmitted(false)}>Edit</EditButton>}
        </FormHeader>
        <Form.Item
            label='Scholarship Name'
            name='scholarshipName'
            rules={[{ required: true, message: 'Please input a name for the scholarship' }]}
        >
            <StyledInput placeholder='ex: John' />
        </Form.Item>

        <Form.Item
            label='Last Name'
            name='lastName'
            rules={[{ required: true, message: 'Please input your last name' }]}
        >
            <StyledInput placeholder='ex: Smith' />
        </Form.Item>

        <Form.Item
            label='Scholarship Description'
            name='scholarshipDescription'
        >
            <Input style={{ width: "70%", height: "50%" }} />
        </Form.Item>

        <Form.Item
            label='Gender'
            name='gender'
            rules={[{ required: true, message: 'Please select which genders the scholarship will be available for' }]}
        >
            <Radio.Group>
                <Radio value='male'>Male</Radio>
                <Radio value='female'>Female</Radio>
            </Radio.Group>
        </Form.Item>

        <Form.Item
            label='Ethnicity'
            name='ethnicity'
            rules={[{ required: true, message: 'Please select your ethnicity' }]}

        >
            <CheckboxLayout>
                <Checkbox value='white'>White</Checkbox>
                <Checkbox value='hispanic'>Hispanic or Latino</Checkbox>
                <Checkbox value='black'>Black or African American</Checkbox>
                <Checkbox value='asian'>Asian</Checkbox>
                <Checkbox value='native'>Native American</Checkbox>
                <Checkbox value='islander'>Native Hawaiian or other Pacific Islander</Checkbox>
                <Checkbox value='other'>Other</Checkbox>
            </CheckboxLayout>
        </Form.Item>

        <Form.Item
            label='US citizenship required?'
            name='citizenshipRequirement'
            rules={[{ required: true, message: 'Please select your citizenship status' }]}
        >
            <Radio.Group>
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
            </Radio.Group>
        </Form.Item>

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

const CheckboxLayout = styled.div`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: repeat(4, auto);
`;