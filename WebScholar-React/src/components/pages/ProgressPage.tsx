import React, { useState } from 'react';
import { Button } from 'antd';
import ProgressReportForm from '../forms/ProgressReportForm';

const ProgressPage = () => {

    const [openReportModal, setOpenReportModal] = useState(false);

    const onCreate = (values: any) => {
        console.log('Received values of form: ', values);
        setOpenReportModal(false);
    };

    return (
        <>
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
        </>
    )
}

export default ProgressPage;