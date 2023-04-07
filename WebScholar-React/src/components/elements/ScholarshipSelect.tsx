import React from 'react'
import { Select, Form } from 'antd'
import { useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks';
import { Scholarship, scholarshipList } from '../../state/reducers/scholarshipSlice';

const ScholarshipSelect = () => {
    const scholarships = useAppSelector(scholarshipList);
    const [scholarshipSelect, setScholarshipSelect] = useState<string>();

    const { Option } = Select;

    const scholarshipOptions = scholarships.map(scholarship => (
        <Option key={scholarship.id} value={scholarship.title}>
            {scholarship.title}
        </Option>
    ))

    console.log("title ", scholarshipSelect)
    return (
        <Form.Item
            name="scholarshipSelect"
            label="Scholarship"
            rules={[{ required: true, message: "Please select a scholarship" }]}
        >

            <Select
                showSearch
                placeholder="Select a Scholarship"
                optionFilterProp="title" // scholarship.title?
                // onChange={value => {
                //     setScholarshipSelect(value)
                //     console.log("Value: ", value)
                // }}
                // value={scholarshipSelect}

                filterOption={(input, scholarship) =>
                    (scholarship?.title ?? '').toLowerCase().includes(input.toLowerCase())
                }
            // options={displayValues}
            >
                {scholarshipOptions}
            </Select>
        </Form.Item>
    )
}

export default ScholarshipSelect;
