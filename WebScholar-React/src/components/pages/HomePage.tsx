import { Text } from '../elements/Text';
import { Header } from '../elements/Header';
import { useAppSelector } from '../../hooks';
import { PageContainer } from '../elements/PageContainer';
import { userState } from '../../state/reducers/userSlice';

export default function HomePage() {
  const user = useAppSelector(userState);

  return <>
    <PageContainer>
      <Header>Welcome back, {user.firstName + " " + user.lastName}</Header>
      <Text>See what's new...</Text>
      <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod maxime 
        dignissimos repudiandae enim nesciunt perspiciatis aut earum maiores ullam 
        eum eaque corporis temporibus culpa ut, illo sunt, dolores omnis tenetur?
      </Text>
    </PageContainer>
  </>
}
