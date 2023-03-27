import { Input, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks';
import { Scholarship, scholarshipList } from '../../state/reducers/scholarshipSlice';

const { Search } = Input;
export default function ScholarshipSearchPage() {
  const [filterValue, setFilterValue] = useState<string>("");
  const scholarships = useAppSelector(scholarshipList);
  const [displayValues, setDisplayValues] = useState(scholarships);

  function applyFilter(value: string){
    const filterValue = value.toLowerCase();
    return setDisplayValues(scholarships.filter(scholarship => {
      if ((scholarship.title).toLowerCase().includes(filterValue)) return true;
      if (scholarship.description.toLowerCase().includes(filterValue)) return true;
      else return false;
    }))
  }

  return <>
  <SearchBar
    value={filterValue}
    onChange={e => setFilterValue(e.target.value)}
    placeholder='Search'
    size='large'
    enterButton
    onSearch={e => applyFilter(e)}
    allowClear
  />
  <Table
    dataSource={displayValues}
    columns={columns}
    pagination={{position: ['bottomRight']}}
  />
  </>
}

const columns: ColumnsType<Scholarship> = [
  {
    title: 'Name',
    key: 'title',
    dataIndex: 'title',
    width: '20%',
  },
  {
    title: 'Type',
    key: 'type',
    dataIndex: 'type',
    render: (list: string[]) => list.map((type, index) => {
      if(index === list.length - 1) return type;
      else return type + ", ";
    }),
    filters: [
      {
        text: 'Scholarship',
        value: 'Scholarship',
      },
      {
        text: 'Fellowship',
        value: 'Fellowship'
      }, {
        text: 'Loan',
        value: 'Loan'
      },
      {
        text: 'Grant',
        value: 'Grant'
      }, {
        text: 'Prize',
        value: 'Prize'
      }
    ],
    onFilter: (value: string | number | boolean, record: Scholarship) => record.type.filter(t => t === value).length > 0,
  },
  {
    title: 'Amount',
    key: 'amount',
    dataIndex: 'amount',
    render: (value: number) => `$${(value).toFixed(2)}`,
    sorter: (a, b) => a.amount - b.amount
  },
  {
    title: 'Deadline',
    key: 'deadline',
    dataIndex: 'deadline',
    render: (date: string) => dayjs(date).format('MM/DD/YYYY'),
    sorter: (a, b) => {
      if(dayjs(a.deadline) < dayjs(b.deadline)) return -1;
      else if(dayjs(a.deadline) > dayjs(b.deadline)) return 1;
      else return 0;
    }
  },
  {
    title: 'Requirements',
    key: 'requirements',
    dataIndex: 'requirements',
    render: (list: string[]) => list.map((requirement: string, index: number) => {
      if(index === list.length - 1) return requirement;
      else return requirement + ", ";
    })
  },
  {
    title: 'Description',
    key: 'description',
    dataIndex: 'description',
  }
]
 


const SearchBar = styled(Search)`
  width: 500px;
  padding: 30px;
  padding-left: 0;
`;