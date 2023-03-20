import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

interface DataType {
    key: string;
    date: string;
    subject: string;
    scholarship: string;
}

interface ReportHistoryTableProps {
    dataSource: DataType[]
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


const ReportHistoryTable: React.FC<ReportHistoryTableProps> = ({ dataSource }) => <Table columns={columns} dataSource={dataSource} />;

export default ReportHistoryTable;