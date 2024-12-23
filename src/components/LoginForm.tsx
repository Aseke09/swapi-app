import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { LoginCredentials } from '../types/types';


export const LoginForm = () => {
    const { register, handleSubmit } = useForm<LoginCredentials>();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (data: LoginCredentials) => {
        dispatch(login(data));
        navigate('/');
    }

    return (
        <div className='container mt-5'>
          <div className='row justify-content-center'>
            <div className='col-md-6'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-3'>
                  <label className='form-label'>UserName</label>
                  <input
                    {...register('username')}
                    className='form-control'
                    placeholder='Enter username'
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Password</label>
                  <input
                    {...register('password')}
                    type="password"
                    className='form-control'
                    placeholder='Enter password'
                  />
                </div>
                <button type='submit' className='btn btn-primary'>Login</button>
              </form>
            </div>
          </div>
        </div>
    )
}