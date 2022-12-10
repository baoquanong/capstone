import React from 'react'

function LoginPage() {
  return (
    <div className='container-fluid  ' >
      <br/>
     <label className="d-flex justify-content-center ">Username
     <input type="text" name="name" />
     </label>
     <label className="d-flex justify-content-center">Password
     <input type="password" name="password"/>
     </label>

    </div>
  )
}

export default LoginPage