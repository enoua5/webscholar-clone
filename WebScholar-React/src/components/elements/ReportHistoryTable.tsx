import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
    key: string;
    date: string;
    subject: string;
    scholarship: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: "Scholarship",
        dataIndex: "scholarship",
        key: "scholarship"
    },
    {
        title: "Subject",
        dataIndex: "subject",
        key: "subject"
    },
    {
        title: "Date",
        dataIndex: "date",
        key: "date"
    }
]

const dataSource: DataType[] = [
    {
        key: '1',
        scholarship: 'Scholarship',
        subject: 'Monkey',
        date: '4/20/2069'
    },
    {
        key: '2',
        scholarship: 'Scholarship2',
        subject: 'Thanos Was Right',
        date: '4/26/2019'
    },
    {
        key: '3',
        scholarship: 'Scholarship3',
        subject: 'New Phone, Who Dis?',
        date: '2/20/2020'
    },
];

const ReportHistoryTable: React.FC = () => <Table columns={columns} dataSource={dataSource} />;

export default ReportHistoryTable;