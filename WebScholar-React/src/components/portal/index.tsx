import Main from './main'
import Navigation from './navigation'

function Portal() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Navigation />
      <Main />
    </div>
  )
}

export default Portal