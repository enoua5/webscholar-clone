import { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { FormContainer, FormHeader, SaveButton, SavedText } from './PersonalInfoForm';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { CheckCircle } from 'react-feather';
import { EditButton } from '../sections/PersonalInfoSection';

export default function AwardsForm() {

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
        name="awards"
        onFinish={handleSubmitSuccess}
        onFinishFailed={handleSubmitFailure}
        style={{width: "100%"}}
        disabled={submitted}
        labelAlign="left"
        labelCol={{span: 5}}
        requiredMark="optional"
      >

        <FormHeader>
          Awards and Accomplishments
          {submitted && <EditButton onClick={e => setSubmitted(false)}>Edit</EditButton>}
        </FormHeader>

        <Form.List name="awards">
          {(fields, { add, remove }, { errors }) => (
            <>
            {fields.length === 0 && <EmptyMessage submitted={submitted} />}
              {fields.map((field, index) => (
                <Row>
                  <Column>
                    <Form.Item
                      required={false}
                      key={`${field.key}-${index}`}
                    >
                      <Form.Item
                        {...field}
                        label="Name"
                        labelCol={{span: 5}}
                        name={[field.name, 'name']}
                        key={`${field.key}-name`}
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[{required: true, whitespace: true, message: "Please enter a name or remove this award/accomplishment",  }]}
                      >
                        <Input 
                          placeholder='Name' 
                        />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        label="Description"
                        labelCol={{span: 5}}
                        name={[field.name, 'description']}
                        key={`${field.key}-description`}
                        validateTrigger={['onChange', 'onBlur']}
                        >
                        <Input.TextArea 
                          placeholder="Description" 
                          autoSize={{minRows: 3, maxRows: 7}}
                          />
                      </Form.Item>
                    </Form.Item>
                  </Column>
                  {!submitted && <DynamicDeleteButton onClick={() => remove(field.name)} />}
                </Row>
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

function EmptyMessage(props: {submitted: boolean}){
  if(props.submitted) return <StyledText>
    No awards or accomplishments.
  </StyledText>

  return <StyledText>
    This information is not required. You may fill this out at any time.
  </StyledText>
}

const DynamicDeleteButton = styled(MinusCircleOutlined)`
  font-size: 24px;
  margin: 15px;
  color: #999;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledText = styled.div`
  font-size: 16px;
  padding: 10px;
  font-weight: 600;
`;