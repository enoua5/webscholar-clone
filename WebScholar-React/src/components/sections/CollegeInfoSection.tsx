import { DatePicker, Form, Input, InputNumber, Radio, Select, Upload } from 'antd';
import { FormSubHeader } from '../forms/PersonalInfoForm';
import { InboxOutlined } from '@ant-design/icons';
import FiftyStatesDropdown from '../elements/FiftyStatesDropdown';

export default function CollegeInfoSection(props: any) {
  const { form } = props;
  const gradeLevel = Form.useWatch('gradeLevel', form);
  const firstSemester = Form.useWatch('freshmanFirstSemester', form);

  const uploadFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return <>
    <FormSubHeader>College</FormSubHeader>

    <Form.Item
      label='What college/university/technical school will you be attending during the upcoming semester?'
      name='college'
      rules={[{required: true, message: 'Please enter the name of the school you plan to attend'}]}
      labelCol={{span: 16}}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label='What speciality or major do you plan on pursuing?'
      name='major'
      labelCol={{span: 16}}
    >
      <Input />
    </Form.Item>

    <FiftyStatesDropdown 
      width={"35%"} 
      label={"What state is your college located in?"} 
      name={"collegeState"} 
      rules={[{required: true, message: "Please select a state"}]}
    />
    
    <Form.Item
      label='I will be attending as a '
      name='gradeLevel'
      rules={[{required: true, message: 'Please select your grade level'}]}
    >
      <Select placeholder='Select one' style={{width: "35%"}}>
        <Select.Option value='freshman'>Freshman</Select.Option>
        <Select.Option value='sophomore'>Sophomore</Select.Option>
        <Select.Option value='junior'>Junior</Select.Option>
        <Select.Option value='senior'>Senior</Select.Option>
      </Select>
    </Form.Item>

    {gradeLevel === 'freshman' &&
      <Form.Item
        label='Is this your first semester of college?'
        name='freshmanFirstSemester'
        rules={[{required: true, message: 'Please select an option'}]}
        labelCol={{span: 7}}
      >
        <Radio.Group>
          <Radio value='yes'>Yes</Radio>
          <Radio value='no'>No</Radio>
        </Radio.Group>
      </Form.Item>
    }

    {(gradeLevel !== 'freshman' || firstSemester === 'no') && <>
      <Form.Item
        label='College GPA (4.0 scale)'
        name='collegeGPA'
        tooltip='GPA (Grade Point Average) may be found on your college transcript'
        rules={[{required: true, message: 'Please enter your current college GPA'}]}
      >
        <InputNumber
          max={4}
          min={0}
          step={.01}
        />
      </Form.Item>

      <Form.Item 
        requiredMark={undefined} 
        label="Upload college transcript" 
        tooltip='You may use an official or unofficial copy of your most recent college transcript'
      >
      <Form.Item 
        name="collegeTranscript" 
        valuePropName="collegeTranscript" 
        getValueFromEvent={uploadFile} 
        noStyle
        rules={[{required: true, message: 'Please upload a copy of your most recent college transcript'}]}
        >
        <Upload.Dragger name="collegeTranscriptFile" action="/files" style={{width: "70%"}}> {/* need an endpoint to send files to (/files) */}
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
        </Upload.Dragger>
      </Form.Item>
      </Form.Item>
    </>}

    <Form.Item
      label='Estimated graduation date'
      name='collegeGraduationDate'
      tooltip='If you are unsure or feel this may date may change, leave this field blank'
    >
      <DatePicker 
        style={{width: "35%"}}
        allowClear={false}
        placeholder="YYYY-MM-DD"
      />
    </Form.Item>
  </>
}
