import { useState } from 'react'

import './login.css'

const Login = () => {
    const [avatar, setAvatar] = useState({
        file: null,
        url: ''
    })

    const handleAvatar = (e) => {
        if(e.target.files[0]) {
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    }

    const handleLogin = (e) => {
        e.preventDefault()        
    }

  return (
    <div className='login'>
        <div className="item">
            <h2>Welcome, back</h2>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder='Enter your email' name='email'/>
                <input type="password" placeholder='Enter your password' name='password'/>
                <button>Sign in</button>
            </form>
        </div>
        <div className="separator"></div>
        <div className="item">
            <h2>Create an account</h2>
            <form>
                <label htmlFor="file">
                    <img src={avatar.url || './avatar.png'} alt="" />
                    Upload an image
                </label>
                <input type="file" id='file' style={{display: 'none'}} onChange={handleAvatar}/>
                <input type="text" placeholder='Enter your username' name='username'/>
                <input type="text" placeholder='Enter your email' name='email'/>
                <input type="password" placeholder='Enter your password' name='password'/>
                <button>Sign up</button>
            </form>
        </div>
    </div>
  )
}
export default Login