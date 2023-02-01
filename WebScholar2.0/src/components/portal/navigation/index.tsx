import React from 'react'

function Navigation() {
  return (
    <div style={{ display: "flex", borderBottom: "1px solid #d9d9d9", height: "50px", justifyContent: "space-between", alignItems: "center", padding: "0 10px"}}>
      <div style={{display: "flex", gap: "25px"}}>
        <div>WebScholar</div>
        <div>Home</div>
        <div>About</div>
        <div>Help</div>
      </div>
      <div style={{display: "flex", gap: "25px"}}>
        <div>Login</div>
        <div>Register</div>
      </div>
    </div>
  )
}

export default Navigation