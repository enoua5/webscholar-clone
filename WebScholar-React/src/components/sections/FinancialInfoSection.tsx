import dayjs from "dayjs";
import styled from "styled-components";
import { Col, Form, Input, InputNumber, Radio } from "antd";
import { FormHeader } from "../forms/PersonalInfoForm";


export default function FinancialInfoSection(props: any) {
  const { form } = props;
  const taxStatus = Form.useWatch('taxStatus', form);
  const employmentStatus = Form.useWatch('employmentStatus', form);
  const financialAid = Form.useWatch('financialAid', form);
  const previousYear = dayjs().subtract(1, 'year').format('YYYY');

  return <>
    <FormHeader style={{paddingTop: "15px"}}>Financial Information</FormHeader>

    <Form.Item
      label='Have you applied for Financial Aid?'
      name='financialAid'
      rules={[{required: true, message: 'Please select an option'}]}
    >
      <Radio.Group>
        <Radio value={true}>Yes</Radio>
        <Radio value={false}>No</Radio>
      </Radio.Group>
    </Form.Item>

    {financialAid === false &&
      <Form.Item
        label='Why not?'
        name='noFinancialAidReason'
        rules={[{required: false}]}
      >
        <Input.TextArea 
          autoSize={{minRows: 1, maxRows: 3}}
        />
      </Form.Item>
    }

    <Form.Item
      labelCol={{span: 14}}
      label='Are you receiving other financial aid or support for the upcoming academic year?'
      name='additionalAid'
      rules={[{required: true, message: 'Please select an option'}]}
    >
      <Radio.Group>
        <Radio value={true}>Yes</Radio>
        <Radio value={false}>No</Radio>
        <Radio value={'unsure'}>I don't know</Radio>
      </Radio.Group>
    </Form.Item>

    <Form.Item 
      label='Tax Status'
      name='taxStatus'
      tooltip={`This is based off of your taxes from the previous year (${previousYear})`}
      rules={[{ required: true, message: 'Please select your current status' }]}
      labelCol={{span: 3}}
    >
      <Radio.Group >
        <Col>
          <Radio value='independent'>Independent Student - <i>filed your own taxes last year / not claimed as a dependent on another tax return</i></Radio>
          <Radio value='dependent'>Dependent Student - <i>your parent/guardian filed taxes and claimed you as a dependent on their return</i></Radio>
        </Col>
      </Radio.Group>
    </Form.Item>

    <Form.Item
      labelCol={{span: taxStatus === 'independent' ? 7 : 11}}
      label={taxStatus === 'independent' ? 'Total number of dependents you claimed' : 'Total number of dependents claimed by your parent/guardian'}
      name='dependentsClaimed'
      rules={[{required: true, message: 'Please enter the total number of dependents claimed'}]}
    >
      <InputNumber style={{width: "100px"}} min={0} step={1} />
    </Form.Item>

    <Form.Item
      label='Are you currently employed?'
      name='employmentStatus'
      rules={[{required: true, message: 'Please select your employment status'}]}
    >
      <Radio.Group>
        <Radio value='employed'>Yes</Radio>
        <Radio value='unemployed'>No</Radio>
      </Radio.Group>
    </Form.Item>

    {employmentStatus === 'employed' &&
      <Form.Item
        label='Hours'
        name='employmentAmount'
        rules={[{required: employmentStatus === 'yes' ? true : false, message: 'Please enter your work hours'}]}
      >
        <Radio.Group>
          <Radio value='full time'>Full time (&gt; 35 hours)</Radio>
          <Radio value='part time'>Part time (&lt; 35 hours)</Radio>
        </Radio.Group>
      </Form.Item>
    }
  </>
}

const StyledInput = styled(Input)`
  width: 70%;
`;