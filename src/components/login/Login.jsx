import { useState } from 'react'
import { toast } from 'react-toastify'
import './login.css'

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [avatar, setAvatar] = useState({
        file: null,
        url: ''
    });
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        
        if (!isLogin && !formData.username.trim()) {
            newErrors.username = 'Username is required';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!isLogin && !avatar.file) {
            newErrors.avatar = 'Please upload a profile picture';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAvatar = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                toast.error('File size should be less than 5MB');
                return;
            }
            if (!file.type.startsWith('image/')) {
                toast.error('Please upload an image file');
                return;
            }
            setAvatar({
                file,
                url: URL.createObjectURL(file)
            });
            setErrors(prev => ({ ...prev, avatar: null }));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            // Add your authentication logic here
            console.log('Form submitted:', { ...formData, avatar: avatar.file });
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            toast.success(isLogin ? 'Login successful!' : 'Account created successfully!');
            // Add navigation logic here
        } catch (error) {
            toast.error(error.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = () => {
        setIsLogin(prev => !prev);
        setErrors({});
        setFormData({
            email: '',
            password: '',
            username: ''
        });
        setAvatar({
            file: null,
            url: ''
        });
    };

    return (
        <div className='login'>
            <div className="item">
                <h2>{isLogin ? 'Welcome back' : 'Create an account'}</h2>
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <label htmlFor="file" className={errors.avatar ? 'error' : ''}>
                                <img src={avatar.url || './avatar.png'} alt="Profile" />
                                {avatar.url ? 'Change picture' : 'Upload an image'}
                                {errors.avatar && <span className="error-text">{errors.avatar}</span>}
                            </label>
                            <input 
                                type="file" 
                                id='file' 
                                style={{display: 'none'}} 
                                onChange={handleAvatar}
                                accept="image/*"
                            />
                            <div className="input-group">
                                <input 
                                    type="text" 
                                    placeholder='Enter your username' 
                                    name='username'
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    className={errors.username ? 'error' : ''}
                                />
                                {errors.username && <span className="error-text">{errors.username}</span>}
                            </div>
                        </>
                    )}
                    <div className="input-group">
                        <input 
                            type="text" 
                            placeholder='Enter your email' 
                            name='email'
                            value={formData.email}
                            onChange={handleInputChange}
                            className={errors.email ? 'error' : ''}
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>
                    <div className="input-group">
                        <input 
                            type="password" 
                            placeholder='Enter your password' 
                            name='password'
                            value={formData.password}
                            onChange={handleInputChange}
                            className={errors.password ? 'error' : ''}
                        />
                        {errors.password && <span className="error-text">{errors.password}</span>}
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Please wait...' : (isLogin ? 'Sign in' : 'Sign up')}
                    </button>
                </form>
                <p className="toggle-mode">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button type="button" onClick={toggleMode} className="link-button">
                        {isLogin ? 'Sign up' : 'Sign in'}
                    </button>
                </p>
            </div>
        </div>
    )
}

export default Login