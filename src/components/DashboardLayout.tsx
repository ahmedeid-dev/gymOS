import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Assessment, CalendarMonth, Dashboard, FitnessCenter, Group,
  Logout, Menu, NotificationsNone, Settings, EventAvailable,
} from '@mui/icons-material';
import {
  AppBar, Avatar, Box, Button, Divider, Drawer, IconButton, List, ListItemButton,
  ListItemIcon, ListItemText, Stack, Toolbar, Tooltip, Typography, useMediaQuery,
} from '@mui/material';
import { signOut, type AppDispatch, type RootState } from '../store';

const drawerWidth = 260;
const navItems = [
  { key: 'dashboard', path: '/dashboard', icon: <Dashboard /> },
  { key: 'members', path: '/dashboard/members', icon: <Group /> },
  { key: 'attendance', path: '/dashboard/attendance', icon: <EventAvailable /> },
  { key: 'classes', path: '/dashboard/classes', icon: <CalendarMonth /> },
  { key: 'reports', path: '/dashboard/reports', icon: <Assessment /> },
  { key: 'settings', path: '/dashboard/settings', icon: <Settings /> },
];

// Keep the Arabic labels
const navLabels: Record<string, string> = {
  dashboard: 'لوحة التحكم',
  members: 'الأعضاء',
  attendance: 'الحضور والانصراف',
  classes: 'الحصص والجداول',
  reports: 'التقارير',
  settings: 'الإعدادات',
};

export default function DashboardLayout() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width:900px)');
  const [mobileOpen, setMobileOpen] = useState(false);

  // If not logged in, redirect to login
  if (!user) {
    window.location.href = '/login';
    return null;
  }

  const changeLanguage = () => {
    const next = i18n.language === 'en' ? 'ar' : 'en';
    void i18n.changeLanguage(next);
    localStorage.setItem('gympro-lang', next);
    document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
  };

  const handleLogout = () => {
    dispatch(signOut());
    navigate('/');
  };

  const currentPath = location.pathname;

  const drawer = (
    <Box sx={{ width: drawerWidth, p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ px: 1, py: 2, mb: 2 }}>
        <Avatar sx={{ bgcolor: 'primary.main' }}><FitnessCenter /></Avatar>
        <Box>
          <Typography fontWeight={900}>GymPro</Typography>
          <Typography variant="caption" color="text.secondary">Manage. Track. Grow.</Typography>
        </Box>
      </Stack>
      <List sx={{ flex: 1 }}>
        {navItems.map((item) => (
          <ListItemButton
            key={item.key}
            selected={currentPath === item.path || (item.path !== '/dashboard' && currentPath.startsWith(item.path))}
            onClick={() => { navigate(item.path); setMobileOpen(false); }}
            sx={{ borderRadius: 2, mb: 0.5 }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={navLabels[item.key] || item.key} />
          </ListItemButton>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />
      <Button fullWidth color="inherit" startIcon={<Logout />} onClick={handleLogout}>
        {t('logout')}
      </Button>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar position="fixed" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton onClick={() => setMobileOpen(!mobileOpen)} sx={{ display: { md: 'none' }, mr: 1 }}><Menu /></IconButton>
          <Typography variant="h6" fontWeight={900} sx={{ flexGrow: 1, display: { md: 'none' } }}>GymPro</Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }} />
          <Tooltip title={t('language')}><Button onClick={changeLanguage} color="inherit">{i18n.language === 'en' ? 'عربي' : 'English'}</Button></Tooltip>
          <IconButton><NotificationsNone /></IconButton>
          <Avatar sx={{ width: 34, height: 34, bgcolor: 'primary.main' }}>{user.name[0]}</Avatar>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{ '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', borderRight: 0 } }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, sm: 3, md: 4 }, mt: 8, maxWidth: 1600, mx: 'auto', width: '100%' }}>
        <Outlet />
      </Box>
    </Box>
  );
}
