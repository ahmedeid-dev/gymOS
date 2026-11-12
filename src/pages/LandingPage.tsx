import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  AppBar, Avatar, Box, Button, Card, CardContent, Chip, Container, Divider,
  Drawer, Grid, IconButton, List, ListItemButton, ListItemText, Stack,
  TextField, Toolbar, Typography, useMediaQuery,
} from '@mui/material';
import {
  Assessment, CalendarMonth, CheckCircle, Close, Email, FitnessCenter,
  Group, LocationOn, Menu, Phone, Security, Speed,
} from '@mui/icons-material';

const navLinks = [
  { label: 'الميزات', href: '#features' },
  { label: 'الأسعار', href: '#pricing' },
  { label: 'تواصل معنا', href: '#contact' },
];

const features = [
  { icon: <Group />, color: '#2563eb', title: 'إدارة الأعضاء', desc: 'تسجيل وإدارة بيانات الأعضاء والاشتراكات والتجديدات بسهولة' },
  { icon: <CheckCircle />, color: '#0f766e', title: 'نظام الحضور الذكي', desc: 'تسجيل حضور وانصراف الأعضاء والموظفين بنظام متطور' },
  { icon: <CalendarMonth />, color: '#7c3aed', title: 'إدارة الجداول', desc: 'جدولة الحصص والكلاسات وتتبع الحجوزات والسعة' },
  { icon: <Assessment />, color: '#d97706', title: 'التقارير والتحليلات', desc: 'تقارير مالية وتحليلات أداء شاملة لاتخاذ قرارات أذكى' },
  { icon: <Security />, color: '#dc2626', title: 'إدارة الموظفين', desc: 'متابعة الموظفين والكباتن، الشفتات، الإجازات، التأخيرات والغياب' },
  { icon: <Speed />, color: '#0891b2', title: 'نظام الشفتات', desc: 'إدارة شفتات نهارية وليلية مع تتبع ساعات العمل' },
];

const stats = [
  { value: '1,000+', label: 'جيم يستخدم النظام' },
  { value: '50,000+', label: 'عضو نشط' },
  { value: '99.9%', label: 'وقت التشغيل' },
  { value: '24/7', label: 'دعم فني' },
];

const plans = [
  {
    name: 'Basic',
    nameAr: 'الباقة الأساسية',
    price: 'EGP 299',
    period: '/شهرياً',
    features: ['حتى 200 عضو', 'تسجيل الحضور', 'تقارير أساسية', 'دعم بالإيميل'],
    highlighted: false,
    btnLabel: 'ابدأ الآن',
    btnVariant: 'outlined' as const,
  },
  {
    name: 'Professional',
    nameAr: 'الباقة الاحترافية',
    price: 'EGP 599',
    period: '/شهرياً',
    features: ['حتى 1000 عضو', 'نظام الحضور الذكي', 'إدارة الموظفين والشفتات', 'تقارير متقدمة', 'دعم أولوية'],
    highlighted: true,
    btnLabel: 'ابدأ الآن',
    btnVariant: 'contained' as const,
  },
  {
    name: 'Enterprise',
    nameAr: 'باقة المؤسسات',
    price: 'EGP 999',
    period: '/شهرياً',
    features: ['أعضاء غير محدودين', 'كل المميزات', 'فروع متعددة', 'API مخصص', 'مدير حساب مخصص'],
    highlighted: false,
    btnLabel: 'تواصل معنا',
    btnVariant: 'outlined' as const,
  },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function LandingPage() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:900px)');
  const [drawerOpen, setDrawerOpen] = useState(false);

  /* ── Navbar ── */
  const navbar = (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: 1, borderColor: 'divider', backdropFilter: 'blur(12px)', bgcolor: 'rgba(255,255,255,.85)' }}
    >
      <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto' }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ cursor: 'pointer' }} onClick={() => scrollTo('hero')}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 38, height: 38 }}><FitnessCenter fontSize="small" /></Avatar>
          <Typography fontWeight={900} variant="h6">GymPro</Typography>
        </Stack>

        <Box sx={{ flexGrow: 1 }} />

        {isMobile ? (
          <IconButton onClick={() => setDrawerOpen(true)}><Menu /></IconButton>
        ) : (
          <Stack direction="row" alignItems="center" spacing={1}>
            {navLinks.map((l) => (
              <Button key={l.href} color="inherit" onClick={() => scrollTo(l.href.slice(1))}>{l.label}</Button>
            ))}
            <Button variant="outlined" size="small" onClick={() => navigate('/attendance')}>تسجيل حضور</Button>
            <Button variant="contained" size="small" onClick={() => navigate('/login')}>تسجيل الدخول</Button>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );

  const mobileDrawer = (
    <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
      <Box sx={{ width: 260, p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography fontWeight={900}>GymPro</Typography>
          <IconButton onClick={() => setDrawerOpen(false)}><Close /></IconButton>
        </Stack>
        <List>
          {navLinks.map((l) => (
            <ListItemButton key={l.href} onClick={() => { scrollTo(l.href.slice(1)); setDrawerOpen(false); }}>
              <ListItemText primary={l.label} />
            </ListItemButton>
          ))}
        </List>
        <Divider sx={{ my: 1 }} />
        <Stack spacing={1} mt={1}>
          <Button variant="outlined" fullWidth onClick={() => { setDrawerOpen(false); navigate('/attendance'); }}>تسجيل حضور</Button>
          <Button variant="contained" fullWidth onClick={() => { setDrawerOpen(false); navigate('/login'); }}>تسجيل الدخول</Button>
        </Stack>
      </Box>
    </Drawer>
  );

  /* ── Hero ── */
  const hero = (
    <Box
      id="hero"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #0f766e08 0%, #f5f7fb 50%, #f59e0b08 100%)',
        pt: 10,
        pb: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, md: 7 }}>
            <Chip label="🏋️ نظام إدارة متكامل" sx={{ mb: 3, fontWeight: 600 }} />
            <Typography variant="h2" fontWeight={900} sx={{ lineHeight: 1.25, mb: 3 }}>
              نظام إدارة الجيم{'\n'}الأذكى في مصر
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 540, lineHeight: 1.8 }}>
              GymPro يوفر لك نظام ERP متكامل لإدارة الجيم - من الاشتراكات والحضور إلى الموظفين والتقارير المالية، كل شيء في مكان واحد
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" size="large" onClick={() => navigate('/register')}>ابدأ مجاناً</Button>
              <Button variant="outlined" size="large" onClick={() => navigate('/login')}>تسجيل الدخول</Button>
            </Stack>
          </Grid>

          {/* Dashboard mockup */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Card sx={{ p: 3, bgcolor: '#fff', borderRadius: 4 }}>
              <Typography variant="subtitle2" fontWeight={700} mb={2}>لوحة التحكم</Typography>
              <Grid container spacing={2}>
                {[
                  { label: 'الأعضاء النشطين', val: '1,102', color: '#0f766e' },
                  { label: 'الإيرادات', val: 'EGP 486K', color: '#2563eb' },
                  { label: 'الحضور اليوم', val: '184', color: '#7c3aed' },
                  { label: 'الاشتراكات الجديدة', val: '42', color: '#d97706' },
                ].map((s) => (
                  <Grid size={6} key={s.label}>
                    <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: `${s.color}0a`, border: `1px solid ${s.color}20` }}>
                      <Typography variant="caption" color="text.secondary">{s.label}</Typography>
                      <Typography variant="h6" fontWeight={800} sx={{ color: s.color }}>{s.val}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );

  /* ── Features ── */
  const featuresSection = (
    <Box id="features" sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <Typography variant="h4" fontWeight={800} mb={1}>كل ما تحتاجه لإدارة جيمك</Typography>
          <Typography color="text.secondary">أدوات متكاملة صُممت خصيصاً لأصحاب الجيمات في مصر والوطن العربي</Typography>
        </Box>
        <Grid container spacing={3}>
          {features.map((f) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={f.title}>
              <Card sx={{ height: '100%', transition: 'transform .2s', '&:hover': { transform: 'translateY(-4px)' } }}>
                <CardContent sx={{ p: 3 }}>
                  <Avatar sx={{ bgcolor: `${f.color}14`, color: f.color, mb: 2, width: 52, height: 52 }}>{f.icon}</Avatar>
                  <Typography variant="h6" fontWeight={700} mb={1}>{f.title}</Typography>
                  <Typography color="text.secondary" variant="body2">{f.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );

  /* ── Stats ── */
  const statsSection = (
    <Box sx={{ bgcolor: 'primary.main', color: '#fff', py: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={3} textAlign="center">
          {stats.map((s) => (
            <Grid size={{ xs: 6, md: 3 }} key={s.label}>
              <Typography variant="h3" fontWeight={900}>{s.value}</Typography>
              <Typography sx={{ opacity: .85, mt: .5 }}>{s.label}</Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );

  /* ── Pricing ── */
  const pricingSection = (
    <Box id="pricing" sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <Typography variant="h4" fontWeight={800} mb={1}>خطط أسعار مناسبة لكل جيم</Typography>
          <Typography color="text.secondary">اختر الخطة المناسبة لحجم عملك واحتياجاتك</Typography>
        </Box>
        <Grid container spacing={3} justifyContent="center">
          {plans.map((p) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={p.name}>
              <Card
                sx={{
                  height: '100%',
                  position: 'relative',
                  ...(p.highlighted && { border: '2px solid', borderColor: 'primary.main' }),
                }}
              >
                {p.highlighted && (
                  <Chip
                    label="الأكثر شعبية"
                    color="primary"
                    size="small"
                    sx={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)' }}
                  />
                )}
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="h6" fontWeight={700} mb={1}>{p.nameAr}</Typography>
                  <Typography variant="h4" fontWeight={900} color="primary">
                    {p.price}
                    <Typography component="span" variant="body2" color="text.secondary">{p.period}</Typography>
                  </Typography>
                  <Divider sx={{ my: 2.5 }} />
                  <Stack spacing={1.5} mb={3}>
                    {p.features.map((f) => (
                      <Stack direction="row" spacing={1} alignItems="center" key={f}>
                        <CheckCircle sx={{ fontSize: 18, color: 'primary.main' }} />
                        <Typography variant="body2">{f}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                  <Button variant={p.btnVariant} fullWidth size="large">{p.btnLabel}</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );

  /* ── Contact ── */
  const contactSection = (
    <Box id="contact" sx={{ py: 10, bgcolor: '#f8fafc' }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <Typography variant="h4" fontWeight={800} mb={1}>تواصل معنا</Typography>
          <Typography color="text.secondary">نحن هنا لمساعدتك في أي وقت</Typography>
        </Box>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Stack spacing={2.5}>
                  <TextField label="الاسم" fullWidth />
                  <TextField label="البريد الإلكتروني" type="email" fullWidth />
                  <TextField label="الرسالة" multiline rows={4} fullWidth />
                  <Button variant="contained" size="large">إرسال</Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2}>
              {[
                { icon: <Email />, text: 'info@gympro.app' },
                { icon: <Phone />, text: '+20 100 123 4567' },
                { icon: <LocationOn />, text: 'مدينة نصر، القاهرة، مصر' },
              ].map((c) => (
                <Card key={c.text}>
                  <CardContent>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ bgcolor: 'primary.main' }}>{c.icon}</Avatar>
                      <Typography>{c.text}</Typography>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );

  /* ── Footer ── */
  const footer = (
    <Box sx={{ bgcolor: '#1a1a2e', color: '#fff', py: 6 }}>
      <Container maxWidth="lg">
        <Stack alignItems="center" spacing={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36 }}><FitnessCenter fontSize="small" /></Avatar>
            <Typography fontWeight={900}>GymPro</Typography>
          </Stack>
          <Typography variant="body2" sx={{ opacity: .7 }}>GymPro - نظام إدارة الجيم الأذكى</Typography>
          <Typography variant="caption" sx={{ opacity: .5 }}>© 2026 GymPro. جميع الحقوق محفوظة</Typography>
        </Stack>
      </Container>
    </Box>
  );

  return (
    <Box dir="rtl">
      {navbar}
      {mobileDrawer}
      {hero}
      {featuresSection}
      {statsSection}
      {pricingSection}
      {contactSection}
      {footer}
    </Box>
  );
}
