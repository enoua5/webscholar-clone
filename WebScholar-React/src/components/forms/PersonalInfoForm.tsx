import { useState } from 'react';
import styled from 'styled-components';
import { Button, Form, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { CheckCircle } from 'react-feather';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { PageContainer } from '../elements/PageContainer';
import { setUserForm, userState } from '../../state/reducers/userSlice';
import ContactInfoSection from '../sections/ContactInfoSection';
import PersonalInfoSection from '../sections/PersonalInfoSection';
import FinancialInfoSection from '../sections/FinancialInfoSection';
import dayjs from 'dayjs';

export default function PersonalInfoForm() {
  const dispatch = useAppDispatch();
  const [form] = useForm();
  const user = useAppSelector(userState);
  const [submitted, setSubmitted] = useState(false);
  const formProps = {form, user, submitted, setSubmitted };

  // TODO: call API to save form
  const handleSubmitSuccess = (values: any) => {
      const dateString = dayjs(values.birth).format('YYYY-MM-DD');
      const visa = values.visa[0]?.name;
      const submitValues = {...values, birth: dateString, visa: visa};
      dispatch(setUserForm({name: 'personalInfo', form: submitValues}))
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
        name="personalInfo"
        initialValues={{firstName: user.firstName, lastName: user.lastName, email: user.email, citizen: true}}
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

export const FormSubHeader = styled.div`
font-size: 16px;
font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
font-weight: 700;
width: 50%;
border-bottom: 1px solid #d9d9d9;
margin-bottom: 25px;
padding-bottom: 10px;
`;

export const SaveButton = styled(Button)`
  width: 120px;
  height: 50px;
  font-size: 18px;
  background-color: green !important;
  &:hover{
    background-color: #008000cd !important;
  }
`;

export const SavedText = styled.div`
  color: green;
  font-size: 20px;
  font-family: sans-serif;
`;