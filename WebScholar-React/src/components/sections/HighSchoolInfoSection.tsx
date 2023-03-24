import styled from 'styled-components';
import { InboxOutlined } from '@ant-design/icons';
import { FormSubHeader } from '../forms/PersonalInfoForm';
import { DatePicker, Form, Input, InputNumber, Upload } from 'antd';
import FiftyStatesDropdown from '../elements/FiftyStatesDropdown';

export default function HighSchoolInfoSection(props: any) {

  const uploadFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return <>
    <FormSubHeader>High School</FormSubHeader>
    <Form.Item
      label='Name of High School'
      name='highSchool'
      rules={[{required: true, message: 'Please enter the name of your high school'}]}
    >
      <StyledInput/>
    </Form.Item>

    <FiftyStatesDropdown 
      width={"35%"} 
      label={"What state is your high school located in?"} 
      name={"highSchoolState"} 
      rules={[{required: true, message: "Please select a state"}]}
    />

    <Form.Item
      label='High School graduation date'
      name='highSchoolGraduationDate'
      tooltip='If you are still currently attending high school, what is your expected graduation date?'
      rules={[{required: true, message: 'Please enter the graduation date'}]}
    >
      <DatePicker 
        style={{width: "35%"}}
        allowClear={false}
        placeholder="YYYY-MM-DD"
        format='YYYY-MM-DD'
      />
    </Form.Item>

    <Form.Item
      label='High School GPA (4.0 scale)'
      name='highSchoolGPA'
      tooltip='GPA (Grade Point Average) can be found on your high school transcript'
      rules={[{required: true, message: 'Please enter your GPA '}]}
    >
      <InputNumber 
        step={0.01}
        min={0}
        max={4.0}
      />
    </Form.Item>
    
    <Form.Item 
      label='Upload copy of High School transcript'
      tooltip='You may use an official or unoffical copy of your most recent high school transcript' 
      requiredMark={undefined}
    >
      <Form.Item 
        name="highSchoolTranscript" 
        valuePropName="highSchoolTranscript" 
        getValueFromEvent={uploadFile} 
        noStyle
        rules={[{required: true, message: 'Please upload your most current official or unofficial high school transcript'}]}
        >
        <Upload.Dragger name="highSchoolTranscriptFile" action="/files" style={{width: "70%"}}> {/* need an endpoint to send files to (/files) */}
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
        </Upload.Dragger>
      </Form.Item>
    </Form.Item>
  </>
}

const StyledInput = styled(Input)`
  width: 70%;
`;