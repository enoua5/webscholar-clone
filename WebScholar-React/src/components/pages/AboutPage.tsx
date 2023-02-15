import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks'
import { setNavigationState } from '../../state/reducers/navigationSlice';
import { PageContainer } from '../elements/PageContainer'

export default function AboutPage() {
  const dispatch = useAppDispatch();

  useEffect(()=> {
    dispatch(setNavigationState({
      menu: "About",
      submenu: "",
      popoutOpen: false
    }))
  })
  return <>
    <PageContainer>
      <div>What is WebScholar?</div>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error tempora excepturi 
        ea facilis eum, doloremque sit magnam eaque, perspiciatis aut molestiae ipsum quasi
        aliquid perferendis? Eveniet iusto quisquam officia laudantium. Lorem ipsum dolor 
        sit amet consectetur adipisicing elit. Necessitatibus explicabo dignissimos dicta 
        quae perspiciatis, provident ex odit iure ut distinctio asperiores in itaque? Iusto 
        dignissimos vel provident nulla, accusamus facilis.
      </div>
    </PageContainer>
  </>
}
