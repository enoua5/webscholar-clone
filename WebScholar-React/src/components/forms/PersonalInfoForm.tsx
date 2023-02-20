import { useState } from 'react';
import styled from 'styled-components';
import { Button, Form, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { CheckCircle } from 'react-feather';
import { useAppSelector } from '../../hooks';
import { PageContainer } from '../elements/PageContainer';
import { userState } from '../../state/reducers/userSlice';
import ContactInfoSection from '../sections/ContactInfoSection';
import PersonalInfoSection from '../sections/PersonalInfoSection';
import FinancialInfoSection from '../sections/FinancialInfoSection';

export default function PersonalInfoForm() {
  const [form] = useForm();
  const user = useAppSelector(userState);
  const [submitted, setSubmitted] = useState(false);
  const formProps = {form, user, submitted, setSubmitted };

  // should update values in redux and call API to save form
  const handleSubmitSuccess = (values: any) => {
      console.log("FORM SUBMITTED SUCCESSFULLY: ", values);
      setSubmitted(true);
  };

  // just log failed values to console
  const handleSubmitFailure = (values: any) => {
    console.log("FORM SUBMISSION FAILED", values)
  };

  return (
    <FormContainer>
      <Form
        disabled={submitted}
        style={{width: "100%"}}
        labelAlign='left'
        labelCol={{span: 6}}
        form={form}
        name="student"
        initialValues={{firstName: user.firstName, lastName: user.lastName, email: user.email}}
        onFinish={handleSubmitSuccess}
        onFinishFailed={handleSubmitFailure}
        autoComplete='off'
        requiredMark='optional'
        labelWrap={true}
      >
        <PersonalInfoSection {...formProps} />
        <ContactInfoSection {...formProps}/>
        <FinancialInfoSection {...formProps}/>
        
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
    </FormContainer>
  )
}

export const FormContainer = styled(PageContainer)`
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 10px;
  min-width: 0px;
  padding: 20px 50px;
`;

export const FormHeader = styled.div`
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

const SaveButton = styled(Button)`
  width: 120px;
  height: 50px;
  font-size: 18px;
`;

const SavedText = styled.div`
  color: green;
  font-size: 20px;
  font-family: sans-serif;
`;