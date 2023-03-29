import React, { useState } from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import { PageContainer } from '../elements/PageContainer';
import { Header } from '../elements/Header';
import ReportHistoryTable from '../elements/ReportHistoryTable';
import ProgressReportForm from '../forms/ProgressReportForm';

const ProgressPage = () => {

    interface DataType {
        key: string;
        date: string;
        subject: string;
        scholarship: string;
    }    

    interface Values {
        date: Date;
        subject: string;
        report: string;
        scholarship: string;
    }    

    const [openReportModal, setOpenReportModal] = useState(false);

    const [dataSource, setDataSource] = useState<DataType[]>([
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
    ])

    const handleCreateReport = (values: Values) => {
        const newDataSource = [
            ...dataSource,
            {
                key: (dataSource.length + 1).toString(),
                scholarship: values.scholarship,
                subject: values.subject,
                date: values.date.toISOString(),
            },
        ];
        setDataSource(newDataSource);
        setOpenReportModal(false);
    };    

    // const onCreate = (values: any) => {
    //     console.log('Received values of form: ', values);
    //     setOpenReportModal(false);
    // };

    return (
        <>
            <Header style={{ paddingBottom: "20px", marginTop: "-20px" }}>Progress Reports</Header>
            <PageContainer>
                <ReportHistoryHeader style={{display: "flex", alignContent: ""}}>
                    <h5>Report History</h5>
                </ReportHistoryHeader>
                <div>
                    <ReportHistoryTable dataSource={dataSource}/>
                </div>
                <div>
                    <Button
                        type='primary'
                        onClick={() => {
                            setOpenReportModal(true);
                        }}
                    >
                        New Report
                    </Button>
                    <ProgressReportForm
                        open={openReportModal}
                        onCreate={handleCreateReport}
                        onCancel={() => {
                            setOpenReportModal(false);
                        }}
                    />
                </div>
            </PageContainer>
        </>
    )
}

export default ProgressPage;

const ReportHistoryHeader = styled.div`
    font-size: 36px;
    font-weight: 200;
    font-family: sans-serif;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
`

const ContentHeaderDiv = styled.div`
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
`