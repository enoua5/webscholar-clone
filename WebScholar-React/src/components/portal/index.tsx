import Main from './main'
import NavigationBar from './navigation/NavigationBar'

function Portal() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <NavigationBar />
      <Main />
    </div>
  )
}

export default Portal