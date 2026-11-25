import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {api} from '../api';
import {Field} from '../components';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', {email, password});
      localStorage.setItem('token', res.data.token);
        navigate('/activities');
    } catch {
        setError('Credenciales invalidas');
    }
    };

    //en 