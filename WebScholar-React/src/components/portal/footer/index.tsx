import React from 'react'

function Footer() {
  const thisYear: number = new Date().getFullYear();
  return (
    <>
    <div style={{width: "100%", textAlign: "left", borderTop: "1px solid #d9d9d9", paddingTop: "15px", marginTop: "15px"}}>
      &copy; {thisYear  + " - WebScholar - CS 4760"}
    </div>
    </>
  )
}

export default Footer