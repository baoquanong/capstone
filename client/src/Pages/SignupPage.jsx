import React from 'react'

function SignupPage() {
  return (
    <div>
      <label>Username
      <input type="text" name="name"/>
      </label>
      <br/>
      <label>Password
      <input type="password" name="password"/>
      </label>
      <br/>
      <label>Email
      <input type="email" name="email"/>
      </label>
      <br/>

    </div>
  )
}

export default SignupPage