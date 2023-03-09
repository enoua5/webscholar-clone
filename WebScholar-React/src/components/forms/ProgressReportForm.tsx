import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Form, Row, DatePicker, Modal, Input, DatePickerProps } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { CheckCircle } from 'react-feather';
import { useAppSelector } from '../../hooks';
import { PageContainer } from '../elements/PageContainer';
import { userState } from '../../state/reducers/userSlice';
import { FormContainer } from './PersonalInfoForm';

interface Values {
    date: Date;
    subject: string;
    report: string;
    scholarship: string;
}

interface ReportCreateFormProps {
    open: boolean;
    onCreate: (values: Values) => void;
    onCancel: () => void;
}

const { TextArea } = Input;

const ProgressReportForm: React.FC<ReportCreateFormProps> = ({
    open,
    onCreate,
    onCancel,
}) => {

    const [form] = useForm();
    const user = useAppSelector(userState);
    const [submitted, setSubmitted] = useState(false);
    const formProps = { form, user, submitted, setSubmitted };

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString)
    }

    return (
        <>
            <Modal
                open={open}
                title="Progress Report Form"
                okText="Submit"
                cancelText="Cancel"
                onCancel={onCancel}
                onOk={() => {
                    form.validateFields().then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                        .catch((info) => {
                            console.log("Validate Failed: ", info)
                        });
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name='progressReportForm'
                    // initialValues={{ date: new Date().toLocaleDateString() }}
                >
                    <Form.Item
                        name="date"
                        label="Date"
                        rules={[{ required: true }]}
                    >
                        <DatePicker onChange={onChange} />
                    </Form.Item>
                    <Form.Item
                        name="subject"
                        label="Subject"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="report"
                        label="Report Body"
                        rules={[{ required: true }]}
                    >
                        <TextArea 
                        showCount
                        maxLength={1500}
                        style={{ height: 300, resize: 'none' }}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default ProgressReportForm;

// const StyledModal = styled(Modal)`
//     width: 500px;
//     background-color: dimgray;
// `
