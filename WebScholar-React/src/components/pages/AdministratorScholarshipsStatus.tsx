import { scholarshipList } from '../../state/reducers/scholarshipSlice';
import { useAppSelector } from '../../hooks';
import { Card } from 'antd';

export default function AdministratorScholarshipsStatus() {
    const scholarships = useAppSelector(scholarshipList);

    return <>
        <div>
            {
                scholarships.map((scholarshipItem, i) =>
                    <Card>
                        <h1>{scholarshipItem.title} Scholarship</h1>
                        <h4>Organized by: {scholarshipItem.organization}</h4>
                        <p>Award Type: {scholarshipItem.type.length <= 1 ?
                            (scholarshipItem.type)
                            :
                            (scholarshipItem.type.map((typeArrayItem, i) =>
                                i + 1 === scholarshipItem.type.length ? (typeArrayItem) : (typeArrayItem + '/')
                            ))
                        }
                        </p>
                        <p>Scholarship Amount: ${scholarshipItem.amount}</p>
                        <p>Application Deadline: {scholarshipItem.deadline}</p>
                        <p>Description: {scholarshipItem.description}</p>
                        <p>Requirements:</p>
                        <ul>{scholarshipItem.requirements.map(requirement => <li>{requirement}</li>)}</ul>
                        <p>Available For:</p>
                        <ul>{scholarshipItem.levels.map(level => <li>{level} Students</li>)}</ul>
                    </Card>
                )
            }
        </div>
    </>
}

