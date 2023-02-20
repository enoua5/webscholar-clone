import { useState } from 'react';
import { Button, Form, Input, Row } from 'antd';
import { FormContainer, FormHeader, SaveButton, SavedText } from './PersonalInfoForm';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { CheckCircle } from 'react-feather';
import { EditButton } from '../sections/PersonalInfoSection';

export default function ExtracurricularActivityForm() {

  const [submitted, setSubmitted] = useState(false);

    // should update values in redux and call API to save form
    const handleSubmitSuccess = (values: any) => {
      console.log("FORM SUBMITTED SUCCESSFULLY: ", values);
      setSubmitted(true);
    };
  
    // just log failed values to console
    const handleSubmitFailure = (values: any) => {
      console.log("FORM SUBMISSION FAILED", values)
    };

  return <>
    <FormContainer>
      <Form
        name="extracurricular"
        onFinish={handleSubmitSuccess}
        onFinishFailed={handleSubmitFailure}
        style={{width: "100%"}}
        disabled={submitted}
      >

        <FormHeader>
          Extracurricular Activies
          {submitted && <EditButton onClick={e => setSubmitted(false)}>Edit</EditButton>}
        </FormHeader>

        <Form.List name="activities">
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  label={`Activity ${index + 1}`}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[{required: true, whitespace: true, message: "Please input activity name/type or delete this field.",  }]}
                    noStyle
                  >
                    <Input.TextArea 
                      placeholder="Name - short description" 
                      autoSize={{minRows: 2, maxRows: 5}}
                      style={{ width: '60%' }} 
                    />
                  </Form.Item>
                  {!submitted && <DynamicDeleteButton onClick={() => remove(field.name)} />}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{ width: '200px' }}
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>

        {!submitted ? 
          <SaveButton type='primary' htmlType='submit'>Save</SaveButton>
        :
          <Row style={{gap: "15px"}}>
            <CheckCircle style={{color: "green", fontSize: "20px"}}/>
            <SavedText>Changes saved successfully!</SavedText>
          </Row>
        }

      </Form>
    </FormContainer>
  </>
}

const DynamicDeleteButton = styled(MinusCircleOutlined)`
  font-size: 24px;
  margin: 15px;
  color: #999;
`;