import { FormEvent, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Avatar, Box, Button, Card, CardContent, Stack, TextField, Typography,
} from '@mui/material';
import { CheckCircle, FitnessCenter } from '@mui/icons-material';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return toast.error('يرجى إدخال بريد إلكتروني صحيح');
    toast.success('تم إرسال رابط الاستعادة إلى بريدك الإلكتروني');
    setSent(true);
  };

  return (
    <Box className="login-page">
      <Card sx={{ width: 'min(440px, 100%)' }}>
        <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
          {/* Logo */}
          <Stack alignItems="center" spacing={1} mb={4}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 58, height: 58 }}>
              <FitnessCenter />
            </Avatar>
            <Typography variant="h4">GymPro</Typography>
          </Stack>

          {sent ? (
            /* Success state */
            <Stack alignItems="center" spacing={2}>
              <Box
                sx={{
                  textAlign: 'center',
                  p: 3,
                  borderRadius: 3,
                  bgcolor: '#0f766e0a',
                  border: '1px solid #0f766e20',
                  width: '100%',
                }}
              >
                <CheckCircle sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
                <Typography variant="h6" fontWeight={700}>تم إرسال الرابط بنجاح!</Typography>
                <Typography color="text.secondary" variant="body2" mt={1}>
                  تحقق من بريدك الإلكتروني
                </Typography>
              </Box>
              <Typography
                component={RouterLink}
                to="/login"
                variant="body2"
                color="primary"
                fontWeight={700}
                sx={{ mt: 2, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                العودة لتسجيل الدخول
              </Typography>
            </Stack>
          ) : (
            /* Form state */
            <>
              <Box textAlign="center" mb={3}>
                <Typography variant="h5" fontWeight={800} mb={1}>استعادة كلمة المرور</Typography>
                <Typography color="text.secondary" variant="body2">
                  أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة تعيين كلمة المرور
                </Typography>
              </Box>

              <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2.5 }}>
                <TextField
                  label="البريد الإلكتروني"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  fullWidth
                />
                <Button type="submit" variant="contained" size="large" fullWidth>
                  إرسال رابط الاستعادة
                </Button>
              </Box>

              <Stack alignItems="center" mt={3}>
                <Typography
                  component={RouterLink}
                  to="/login"
                  variant="body2"
                  color="primary"
                  fontWeight={700}
                  sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                  العودة لتسجيل الدخول
                </Typography>
              </Stack>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
