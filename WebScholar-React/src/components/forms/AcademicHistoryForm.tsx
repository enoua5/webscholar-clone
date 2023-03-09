import { Form, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import { useState } from 'react';
import { CheckCircle } from 'react-feather';
import { useAppDispatch } from '../../hooks';
import { setUserForm } from '../../state/reducers/userSlice';
import CollegeInfoSection from '../sections/CollegeInfoSection';
import HighSchoolInfoSection from '../sections/HighSchoolInfoSection';
import { EditButton } from '../sections/PersonalInfoSection';
import { FormContainer, FormHeader, SaveButton, SavedText } from './PersonalInfoForm'

export default function AcademicHistoryForm() {
  const [form] = useForm();
  const dispatch = useAppDispatch();
  const [submitted, setSubmitted] = useState(false);
  const formProps = {form, submitted, setSubmitted};

  // TODO: call API to save form
  const handleSubmitSuccess = (values: any) => {
    const highSchoolGraduationDate = dayjs(values.highSchoolGraduation).format('YYYY-MM-DD');
    const collegeGraduationDate = dayjs(values.collegeGraduation).format('YYYY-MM-DD');
    const highSchoolTranscript = values.highSchoolTranscript[0]?.name;
    const collegeTranscript = values.collegeTranscript[0]?.name;
    const submitValues = {
      ...values, 
      highSchoolGraduationDate: highSchoolGraduationDate, 
      collegeGraduationDate: collegeGraduationDate, 
      highSchoolTranscript: highSchoolTranscript, 
      collegeTranscript: collegeTranscript
    }

    dispatch(setUserForm({name: 'academicInfo', form: submitValues}))
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
        labelCol={{span: 7}}
        form={form}
        name="academicInfo"
        onFinish={handleSubmitSuccess}
        onFinishFailed={handleSubmitFailure}
        autoComplete='off'
        requiredMark='optional'
        labelWrap={true}
      >
        <FormHeader>
          Education
          {submitted && <EditButton onClick={e => setSubmitted(false)}>Edit</EditButton>}
        </FormHeader>

        <HighSchoolInfoSection {...formProps} />
        <CollegeInfoSection {...formProps} />

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
