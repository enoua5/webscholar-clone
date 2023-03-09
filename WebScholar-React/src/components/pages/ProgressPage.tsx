import React, { useState } from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import { PageContainer } from '../elements/PageContainer';
import { Header } from '../elements/Header';
import ReportHistoryTable from '../elements/ReportHistoryTable';
import ProgressReportForm from '../forms/ProgressReportForm';

const ProgressPage = () => {

    const [openReportModal, setOpenReportModal] = useState(false);

    const onCreate = (values: any) => {
        console.log('Received values of form: ', values);
        setOpenReportModal(false);
    };

    return (
        <>
            <Header style={{ paddingBottom: "20px", marginTop: "-20px" }}>Progress Reports</Header>
            <PageContainer>
                <ReportHistoryHeader style={{display: "flex", alignContent: ""}}>
                    <h5>Report History</h5>
                </ReportHistoryHeader>
                <div>
                    <ReportHistoryTable />
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
                        onCreate={onCreate}
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