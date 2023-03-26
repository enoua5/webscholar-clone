import { useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Row } from 'antd';
import { CheckCircle } from 'react-feather';
import { EditButton } from '../sections/PersonalInfoSection';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setUserForm, userState } from '../../state/reducers/userSlice';
import { FormContainer, FormHeader, SaveButton, SavedText } from './PersonalInfoForm';

export default function AboutYouForm() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userState);
  const [submitted, setSubmitted] = useState(false);

  // should update values in redux and call API to save form
  const handleSubmitSuccess = (values: any) => {
      dispatch(setUserForm({name: 'about', form: values}));
      setSubmitted(true);
  };

  // just log failed values to console
  const handleSubmitFailure = (values: any) => {
    console.log("FORM SUBMISSION FAILED", values)
  };
  
  return <FormContainer>
    <Form
      name="aboutForm"
      disabled={submitted}
      style={{width: "100%"}}
      labelAlign='left'
      labelCol={{span: 6}}
      onFinish={handleSubmitSuccess}
      onFinishFailed={handleSubmitFailure}
      autoComplete='off'
      requiredMark='optional'
      labelWrap={true}
    >
      <FormHeader>
        About You
        {submitted && <EditButton onClick={() => setSubmitted(false)}>Edit</EditButton>}
      </FormHeader>

      {!submitted && <>
        <StyledText>{`${user.firstName}, tell us a little more about yourself. If you have a hard time, try answering one of the prompts.`}</StyledText>
        <Spacer />
        <PromptsListContainer>
          <Prompt>1. If you were president for a day, what would you do?</Prompt>
          <Prompt>2. If you could travel anywhere for a week where would you go? Why?</Prompt>
          <Prompt>3. If you could have any superpower, what power would you choose? Why?</Prompt>
        </PromptsListContainer>
        <Spacer />
      </>}
     

      <ItalicizedText><sup>*</sup>This information will not be used for all scholarship applications.</ItalicizedText>
      <Form.Item
        name='text'
      >
        <Input.TextArea
          autoSize={{minRows: 10, maxRows: 20}}
          size="large"
          />
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
  </FormContainer>
}

const StyledText = styled.div`
  font-size: 16px;
  font-weight: 600px;
`;

const ItalicizedText = styled.i`
  font-size: 12px;
  font-weight: 200;
  sup {
    font-size: .9em;
  }
`;

const Spacer = styled.div`
  height: 30px;
`;

const PromptsListContainer= styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Prompt = styled.div`
  font-size: 14px;
  font-weight: 500;
`;