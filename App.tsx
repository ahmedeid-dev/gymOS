import { FormEvent, ReactNode, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  Add, Assessment, CalendarMonth, CheckCircle, Close, Dashboard, FitnessCenter, Group,
  Logout, Menu, NotificationsNone, Search, Settings, TrendingUp,
} from '@mui/icons-material';
import {
  AppBar, Avatar, Box, Button, Card, CardContent, Chip, Dialog, DialogActions,
  DialogContent, DialogTitle, Divider, Drawer, IconButton, InputAdornment, List, ListItemButton,
  ListItemIcon,   ListItemText, Stack, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TextField, Toolbar, Tooltip, Typography, useMediaQuery,
} from '@mui/material';
import toast from 'react-hot-toast';
import { addMember, signIn, signOut, type AppDispatch, type RootState } from './src/store';

const drawerWidth = 250;
const navItems = [
  { key: 'dashboard', icon: <Dashboard /> },
  { key: 'members', icon: <Group /> },
  { key: 'classes', icon: <CalendarMonth /> },
  { key: 'reports', icon: <Assessment /> },
  { key: 'settings', icon: <Settings /> },
];

function Login() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!email.includes('@') || password.length < 4) return toast.error(t('invalid'));
    dispatch(signIn({ name: 'Ahmed Eid', email, role: 'Administrator' }));
    toast.success(t('login'));
  };
  return (
    <Box className="login-page">
      <Card sx={{ width: 'min(440px, 100%)' }}>
        <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
          <Stack alignItems="center" spacing={1} mb={4}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 58, height: 58 }}><FitnessCenter /></Avatar>
            <Typography variant="h4">GymPro</Typography>
            <Typography color="text.secondary">{t('loginHint')}</Typography>
          </Stack>
          <Box component="form" onSubmit={submit} sx={{ display: 'grid', gap: 2 }}>
            <TextField label={t('emailLabel')} type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
            <TextField label={t('password')} type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
            <Button type="submit" variant="contained" size="large">{t('login')}</Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

function StatCard({ label, value, icon, color }: { label: string; value: string; icon: ReactNode; color: string }) {
  return <Card><CardContent><Stack direction="row" justifyContent="space-between" alignItems="flex-start"><Box><Typography color="text.secondary" variant="body2">{label}</Typography><Typography variant="h5" mt={1}>{value}</Typography><Typography variant="caption" color="success.main">+12.4% this month</Typography></Box><Avatar sx={{ bgcolor: `${color}18`, color }}>{icon}</Avatar></Stack></CardContent></Card>;
}

function DashboardView() {
  const { t } = useTranslation();
  const members = useSelector((state: RootState) => state.members.items);
  return <Stack spacing={3}>
    <Box><Typography variant="h4">{t('welcome')}</Typography><Typography color="text.secondary">{t('overview')}</Typography></Box>
    <Box className="stats-grid">
      <StatCard label={t('revenue')} value="EGP 486K" icon={<TrendingUp />} color="#0f766e" />
      <StatCard label={t('active')} value="1,102" icon={<Group />} color="#2563eb" />
      <StatCard label={t('expiring')} value="42" icon={<NotificationsNone />} color="#d97706" />
      <StatCard label={t('attendance')} value="184" icon={<CheckCircle />} color="#7c3aed" />
    </Box>
    <Box className="content-grid">
      <Card><CardContent><Typography variant="h6" fontWeight={800}>Revenue performance</Typography><Box className="chart" mt={3}>{[45, 62, 52, 75, 68, 86, 78, 94].map((height, index) => <Box key={index} className="chart-bar" sx={{ height: `${height}%` }} />)}</Box><Stack direction="row" justifyContent="space-between" mt={1}>{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'].map((month) => <Typography key={month} variant="caption" color="text.secondary">{month}</Typography>)}</Stack></CardContent></Card>
      <Card><CardContent><Typography variant="h6" fontWeight={800}>Branch utilization</Typography><Stack spacing={2.5} mt={3}>{[['Nasr City HQ', 92], ['New Cairo', 81], ['Zamalek', 76]].map(([branch, value]) => <Box key={branch as string}><Stack direction="row" justifyContent="space-between"><Typography variant="body2">{branch}</Typography><Typography variant="body2" fontWeight={700}>{value}%</Typography></Stack><Box className="progress"><Box sx={{ width: `${value}%` }} /></Box></Box>)}</Stack></CardContent></Card>
    </Box>
    <Card><CardContent><Typography variant="h6" fontWeight={800} mb={2}>{t('recent')}</Typography><MemberTable members={members.slice(0, 5)} /></CardContent></Card>
  </Stack>;
}

function MemberTable({ members }: { members: RootState['members']['items'] }) {
  const { t } = useTranslation();
  return <TableContainer><Table size="small"><TableHead><TableRow>{['ID', t('name'), t('plan'), t('branch'), t('status'), t('visits')].map((header) => <TableCell key={header}>{header}</TableCell>)}</TableRow></TableHead><TableBody>{members.map((member) => <TableRow key={member.id} hover><TableCell>{member.id}</TableCell><TableCell sx={{ fontWeight: 700 }}>{member.name}</TableCell><TableCell>{member.plan}</TableCell><TableCell>{member.branch}</TableCell><TableCell><Chip size="small" label={member.status} color={member.status === 'Active' ? 'success' : member.status === 'Expiring' ? 'warning' : 'default'} /></TableCell><TableCell>{member.visits}</TableCell></TableRow>)}</TableBody></Table></TableContainer>;
}

function MembersView({ onAdd }: { onAdd: () => void }) {
  const { t } = useTranslation();
  const members = useSelector((state: RootState) => state.members.items);
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => members.filter((member) => member.name.toLowerCase().includes(query.toLowerCase()) || member.id.toLowerCase().includes(query.toLowerCase())), [members, query]);
  return <Stack spacing={3}><Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" gap={2}><Box><Typography variant="h4">{t('members')}</Typography><Typography color="text.secondary">{members.length} members in your organization</Typography></Box><Button variant="contained" startIcon={<Add />} onClick={onAdd}>{t('add')}</Button></Stack><Card><CardContent><TextField fullWidth size="small" placeholder={t('search')} value={query} onChange={(e) => setQuery(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><Search /></InputAdornment> }} /><Box mt={2}><MemberTable members={filtered} /></Box></CardContent></Card></Stack>;
}

function ModuleView({ view }: { view: string }) {
  const modules: Record<string, { title: string; description: string; metrics: [string, string][] }> = {
    classes: { title: 'Classes & calendar', description: 'Manage bookings, capacity and coach schedules across branches.', metrics: [['Today classes', '18'], ['Booked seats', '312'], ['Utilization', '84%']] },
    reports: { title: 'Reports & analytics', description: 'Turn operational data into clear decisions for your team.', metrics: [['Monthly revenue', 'EGP 486K'], ['Net margin', '56.3%'], ['Retention', '85.8%']] },
    settings: { title: 'Workspace settings', description: 'Control branches, roles, language and organization preferences.', metrics: [['Branches', '3'], ['Team members', '24'], ['Currency', 'EGP']] },
  };
  const module = modules[view] || modules.reports;
  return <Stack spacing={3}><Box><Typography variant="h4">{module.title}</Typography><Typography color="text.secondary">{module.description}</Typography></Box><Box className="stats-grid">{module.metrics.map(([label, value]) => <StatCard key={label} label={label} value={value} icon={<Assessment />} color="#0f766e" />)}</Box><Card><CardContent><Typography variant="h6" fontWeight={800} mb={2}>Module workspace</Typography><Typography color="text.secondary">The workflow is ready for API integration. Connect this module to your backend through <code>src/services/api.ts</code>.</Typography></CardContent></Card></Stack>;
}

export default function App() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const isMobile = useMediaQuery('(max-width:900px)');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [view, setView] = useState('dashboard');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  if (!user) return <Login />;

  const addNewMember = (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !email.includes('@')) return toast.error(t('invalid'));
    dispatch(addMember({ id: `M-${1050 + Math.floor(Math.random() * 100)}`, name, plan: 'Monthly', branch: 'Nasr City HQ', status: 'Active', visits: 0, expiry: '2027-01-01' }));
    setDialogOpen(false); setName(''); setEmail(''); toast.success(t('save'));
  };
  const changeLanguage = () => { const next = i18n.language === 'en' ? 'ar' : 'en'; void i18n.changeLanguage(next); localStorage.setItem('gympro-lang', next); document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr'; };
  const drawer = <Box sx={{ width: drawerWidth, p: 2 }}><Stack direction="row" alignItems="center" spacing={1.5} sx={{ px: 1, py: 2, mb: 2 }}><Avatar sx={{ bgcolor: 'primary.main' }}><FitnessCenter /></Avatar><Box><Typography fontWeight={900}>GymPro</Typography><Typography variant="caption" color="text.secondary">Manage. Track. Grow.</Typography></Box></Stack><List>{navItems.map((item) => <ListItemButton key={item.key} selected={view === item.key} onClick={() => { setView(item.key); setMobileOpen(false); }} sx={{ borderRadius: 2, mb: .5 }}><ListItemIcon>{item.icon}</ListItemIcon><ListItemText primary={item.key[0].toUpperCase() + item.key.slice(1)} /></ListItemButton>)}</List><Divider sx={{ my: 2 }} /><Button fullWidth color="inherit" startIcon={<Logout />} onClick={() => dispatch(signOut())}>{t('logout')}</Button></Box>;
  return <Box sx={{ display: 'flex', minHeight: '100vh' }}><AppBar position="fixed" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider', zIndex: (theme) => theme.zIndex.drawer + 1 }}><Toolbar><IconButton onClick={() => setMobileOpen(!mobileOpen)} sx={{ display: { md: 'none' }, mr: 1 }}><Menu /></IconButton><Typography variant="h6" fontWeight={900} sx={{ flexGrow: 1, display: { md: 'none' } }}>GymPro</Typography><Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }} /><Tooltip title={t('language')}><Button onClick={changeLanguage} color="inherit">{i18n.language === 'en' ? 'عربي' : 'English'}</Button></Tooltip><IconButton><NotificationsNone /></IconButton><Avatar sx={{ width: 34, height: 34, bgcolor: 'primary.main' }}>{user.name[0]}</Avatar></Toolbar></AppBar><Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}><Drawer variant={isMobile ? 'temporary' : 'permanent'} open={isMobile ? mobileOpen : true} onClose={() => setMobileOpen(false)} ModalProps={{ keepMounted: true }} sx={{ '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', borderRight: 0 } }}>{drawer}</Drawer></Box><Box component="main" sx={{ flexGrow: 1, p: { xs: 2, sm: 3, md: 4 }, mt: 8, maxWidth: 1600, mx: 'auto', width: '100%' }}>{view === 'dashboard' && <DashboardView />}{view === 'members' && <MembersView onAdd={() => setDialogOpen(true)} />}{view !== 'dashboard' && view !== 'members' && <ModuleView view={view} />}</Box><Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm"><Box component="form" onSubmit={addNewMember}><DialogTitle>{t('add')}</DialogTitle><DialogContent sx={{ display: 'grid', gap: 2, pt: '12px !important' }}><TextField label={t('name')} value={name} onChange={(e) => setName(e.target.value)} autoFocus /><TextField label={t('email')} type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></DialogContent><DialogActions><Button onClick={() => setDialogOpen(false)}>{t('cancel')}</Button><Button type="submit" variant="contained">{t('save')}</Button></DialogActions></Box></Dialog><IconButton aria-label="close" sx={{ display: 'none' }}><Close /></IconButton></Box>;
}
