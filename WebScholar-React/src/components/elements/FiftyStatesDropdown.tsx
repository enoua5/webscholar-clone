import { Select } from 'antd';

export default function FiftyStatesDropdown(props: any) {
  const { width } = props;
  return <>
    <Select style={{width: width ? width : ''}}> 
      {FiftyStates.map(state => {
        return <Select.Option key={state.value} value={state.value}>{state.label}</Select.Option>
      })}
    </Select>
  </>
}

const FiftyStates = [
  { value: "AL", label: "Alabama"},
  { value: "AK", label: "Alaska"},
  { value: "AZ", label: "Arizona"},
  { value: "AR", label: "Arkansas"},
  { value: "CA", label: "California"},
  { value: "CO", label: "Colorado"},
  { value: "CT", label: "Connecticut"},
  { value: "DE", label: "Delaware"},
  { value: "FL", label: "Florida"},
  { value: "GA", label: "Georgia"},
  { value: "HI", label: "Hawaii"},
  { value: "ID", label: "Idaho"},
  { value: "IL", label: "Illinois"},
  { value: "IN", label: "Indiana"},
  { value: "IA", label: "Iowa"},
  { value: "KS", label: "Kansas"},
  { value: "KY", label: "Kentucky"},
  { value: "LA", label: "Louisiana"},
  { value: "ME", label: "Maine"},
  { value: "MD", label: "Maryland"},
  { value: "MA", label: "Massachusetts"},
  { value: "MI", label: "Michigan"},
  { value: "MN", label: "Minnesota"},
  { value: "MS", label: "Mississippi"},
  { value: "MO", label: "Missouri"},
  { value: "MT", label: "Montana"},
  { value: "NE", label: "Nebraska"},
  { value: "NV", label: "Nevada"},
  { value: "NH", label: "New Hampshire"},
  { value: "NJ", label: "New Jersey"},
  { value: "NM", label: "New Mexico"},
  { value: "NY", label: "New York"},
  { value: "NC", label: "North Carolina"},
  { value: "ND", label: "North Dakota"},
  { value: "OH", label: "Ohio"},
  { value: "OK", label: "Oklahoma"},
  { value: "OR", label: "Oregon"},
  { value: "PA", label: "Pennsylvania"},
  { value: "RI", label: "Rhode Island"},
  { value: "SC", label: "South Carolina"},
  { value: "SD", label: "South Dakota"},
  { value: "TN", label: "Tennessee"},
  { value: "TX", label: "Texas"},
  { value: "UT", label: "Utah"},
  { value: "VT", label: "Vermont"},
  { value: "VA", label: "Virginia"},
  { value: "WA", label: "Washington"},
  { value: "WV", label: "West Virginia"},
  { value: "WI", label: "Wisconsin"},
  { value: "WY", label: "Wyoming"},
  ]