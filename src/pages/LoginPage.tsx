import { FormEvent, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Avatar, Box, Button, Card, CardContent, Divider, Stack, TextField, Typography,
} from '@mui/material';
import { FitnessCenter } from '@mui/icons-material';
import toast from 'react-hot-toast';
import { signIn, type AppDispatch } from '../store';

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return toast.error('يرجى إدخال بريد إلكتروني صحيح');
    if (password.length < 4) return toast.error('كلمة المرور يجب أن تكون 4 أحرف على الأقل');
    dispatch(signIn({ name: 'مدير النظام', email, role: 'Administrator' }));
    toast.success('تم تسجيل الدخول بنجاح');
    navigate('/dashboard');
  };

  const handleGoogleLogin = () => {
    dispatch(signIn({ name: 'Google User', email: 'user@gmail.com', role: 'Member' }));
    toast.success('تم تسجيل الدخول بنجاح');
    navigate('/dashboard');
  };

  return (
    <Box className="login-page">
      <Card sx={{ width: 'min(480px, 100%)' }}>
        <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
          {/* Logo */}
          <Stack alignItems="center" spacing={1} mb={4}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 58, height: 58 }}>
              <FitnessCenter />
            </Avatar>
            <Typography variant="h4">GymPro</Typography>
            <Typography color="text.secondary">سجل دخولك للوحة التحكم</Typography>
          </Stack>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2.5 }}>
            <TextField
              label="البريد الإلكتروني"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              fullWidth
            />
            <TextField
              label="كلمة المرور"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              fullWidth
            />
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box />
              <Typography
                component={RouterLink}
                to="/forgot-password"
                variant="body2"
                color="primary"
                sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                نسيت كلمة المرور؟
              </Typography>
            </Stack>
            <Button type="submit" variant="contained" size="large" fullWidth>
              تسجيل الدخول
            </Button>
          </Box>

          {/* Divider */}
          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">أو</Typography>
          </Divider>

          {/* Google button */}
          <Button
            variant="outlined"
            fullWidth
            size="large"
            onClick={handleGoogleLogin}
            startIcon={
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.9 33.1 29.4 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.2-2.7-.4-3.9z"/>
                <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.5 15.9 18.9 13 24 13c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
                <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.2 26.7 36 24 36c-5.4 0-9.9-3.5-11.5-8.3l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
                <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C36.7 39.5 44 34 44 24c0-1.3-.2-2.7-.4-3.9z"/>
              </svg>
            }
          >
            التسجيل بحساب Google
          </Button>

          {/* Links */}
          <Stack alignItems="center" mt={3} spacing={1}>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Typography variant="body2" color="text.secondary">ليس لديك حساب؟</Typography>
              <Typography
                component={RouterLink}
                to="/register"
                variant="body2"
                color="primary"
                fontWeight={700}
                sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                سجل الآن
              </Typography>
            </Stack>
            <Typography
              component={RouterLink}
              to="/"
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
              العودة للصفحة الرئيسية
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
