import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar, Avatar, Box, Button, Card, CardContent, Chip, Divider,
  InputAdornment, Stack, Tab, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Tabs, TextField, Toolbar,
  Typography, Fade,
} from '@mui/material';
import {
  CheckCircle, FitnessCenter, Home, Login, Logout, Search,
} from '@mui/icons-material';
import toast from 'react-hot-toast';
import { type RootState, type AppDispatch, recordCheckIn, recordCheckOut } from '../store';

/* ───── helpers ───── */
const arabicDays = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
const arabicMonths = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
];
const pad = (n: number) => String(n).padStart(2, '0');
const todayISO = () => new Date().toISOString().slice(0, 10);
const formatTime = (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
const formatArabicDate = (d: Date) =>
  `${arabicDays[d.getDay()]} ${d.getDate()} ${arabicMonths[d.getMonth()]} ${d.getFullYear()}`;

const personTypeLabel: Record<string, string> = { member: 'عضو', captain: 'كابتن', employee: 'موظف' };
const personTypeColor: Record<string, 'primary' | 'secondary' | 'info'> = {
  member: 'primary', captain: 'secondary', employee: 'info',
};

/* ───── component ───── */
export default function PublicAttendancePage() {
  const dispatch = useDispatch<AppDispatch>();
  const records = useSelector((s: RootState) => s.attendance.records);

  /* clock */
  const [now, setNow] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t); }, []);

  /* tabs */
  const [tab, setTab] = useState(0);

  /* member check-in */
  const [memberId, setMemberId] = useState('');
  const [memberSuccess, setMemberSuccess] = useState('');

  /* staff check-in/out */
  const [staffId, setStaffId] = useState('');

  /* today's records */
  const todayRecords = useMemo(
    () => records
      .filter(r => r.date === todayISO())
      .slice(-10)
      .reverse(),
    [records],
  );

  /* handlers */
  const handleMemberCheckIn = () => {
    if (!memberId.trim()) { toast.error('يرجى إدخال رقم العضوية أو رقم الهاتف'); return; }
    const name = `عضو ${memberId}`;
    dispatch(recordCheckIn({ personId: memberId, personName: name, personType: 'member', shift: new Date().getHours() < 14 ? 'day' : 'night' }));
    toast.success('تم تسجيل حضور العضو بنجاح! 🎉');
    setMemberSuccess(name);
    setMemberId('');
    setTimeout(() => setMemberSuccess(''), 3000);
  };

  const handleStaffCheckIn = () => {
    if (!staffId.trim()) { toast.error('يرجى إدخال رقم الموظف أو الكابتن'); return; }
    const name = `موظف ${staffId}`;
    dispatch(recordCheckIn({ personId: staffId, personName: name, personType: 'employee', shift: new Date().getHours() < 14 ? 'day' : 'night' }));
    toast.success('تم تسجيل الحضور بنجاح! 🎉');
    setStaffId('');
  };

  const handleStaffCheckOut = () => {
    if (!staffId.trim()) { toast.error('يرجى إدخال رقم الموظف أو الكابتن'); return; }
    dispatch(recordCheckOut({ personId: staffId }));
    toast.success('تم تسجيل الانصراف بنجاح!');
    setStaffId('');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f766e 0%, #065f46 50%, #064e3b 100%)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── AppBar ── */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'rgba(255,255,255,.08)', backdropFilter: 'blur(12px)' }}>
        <Toolbar>
          <Avatar sx={{ bgcolor: '#fff', color: 'primary.main', mr: 1.5, width: 42, height: 42 }}>
            <FitnessCenter />
          </Avatar>
          <Typography variant="h6" fontWeight={900} color="#fff" sx={{ flexGrow: 1 }}>
            GymPro — نظام تسجيل الحضور
          </Typography>
          <Button
            component={RouterLink}
            to="/"
            startIcon={<Home />}
            sx={{ color: '#fff', fontWeight: 700 }}
          >
            الصفحة الرئيسية
          </Button>
        </Toolbar>
      </AppBar>

      {/* ── Main Content ── */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', px: 2, py: 4, gap: 3 }}>
        {/* Clock */}
        <Stack alignItems="center" spacing={0.5}>
          <Typography variant="h2" fontWeight={900} color="#fff" sx={{ fontFamily: 'monospace', letterSpacing: 4 }}>
            {formatTime(now)}
          </Typography>
          <Typography variant="h5" color="rgba(255,255,255,.85)" fontWeight={600}>
            {formatArabicDate(now)}
          </Typography>
        </Stack>

        {/* Tabs Card */}
        <Card sx={{ width: '100%', maxWidth: 600, borderRadius: 4 }}>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="تسجيل حضور الأعضاء" sx={{ fontWeight: 700, fontSize: '1rem' }} />
            <Tab label="حضور وانصراف الموظفين والكباتن" sx={{ fontWeight: 700, fontSize: '1rem' }} />
          </Tabs>

          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            {/* Tab 1: Member Check-in */}
            {tab === 0 && (
              <Stack spacing={3} alignItems="center">
                <TextField
                  fullWidth
                  label="رقم العضوية أو رقم الهاتف"
                  value={memberId}
                  onChange={e => setMemberId(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleMemberCheckIn()}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start"><Search /></InputAdornment>
                    ),
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { fontSize: '1.15rem' } }}
                />
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handleMemberCheckIn}
                  sx={{ py: 1.8, fontSize: '1.2rem', fontWeight: 800, borderRadius: 3 }}
                >
                  تسجيل حضور ✓
                </Button>

                {/* Success animation */}
                <Fade in={!!memberSuccess} timeout={400}>
                  <Stack alignItems="center" spacing={1} sx={{ minHeight: 60 }}>
                    {memberSuccess && (
                      <>
                        <CheckCircle sx={{ color: 'success.main', fontSize: 48 }} />
                        <Typography variant="h6" color="success.main" fontWeight={700}>
                          {memberSuccess}
                        </Typography>
                      </>
                    )}
                  </Stack>
                </Fade>
              </Stack>
            )}

            {/* Tab 2: Staff Check-in / Check-out */}
            {tab === 1 && (
              <Stack spacing={3} alignItems="center">
                <TextField
                  fullWidth
                  label="رقم الموظف أو الكابتن"
                  value={staffId}
                  onChange={e => setStaffId(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') handleStaffCheckIn();
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start"><Search /></InputAdornment>
                    ),
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { fontSize: '1.15rem' } }}
                />
                <Stack direction="row" spacing={2} width="100%">
                  <Button
                    variant="contained"
                    color="success"
                    size="large"
                    fullWidth
                    startIcon={<Login />}
                    onClick={handleStaffCheckIn}
                    sx={{ py: 1.8, fontSize: '1.1rem', fontWeight: 800, borderRadius: 3 }}
                  >
                    تسجيل حضور
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="large"
                    fullWidth
                    startIcon={<Logout />}
                    onClick={handleStaffCheckOut}
                    sx={{ py: 1.8, fontSize: '1.1rem', fontWeight: 800, borderRadius: 3 }}
                  >
                    تسجيل انصراف
                  </Button>
                </Stack>
              </Stack>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card sx={{ width: '100%', maxWidth: 700, borderRadius: 4 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={800} mb={2}>
              آخر تسجيلات اليوم
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {todayRecords.length === 0 ? (
              <Typography color="text.secondary" textAlign="center" py={4}>
                لا توجد تسجيلات اليوم بعد
              </Typography>
            ) : (
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>الوقت</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>الاسم</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>النوع</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>الإجراء</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {todayRecords.map(r => (
                      <TableRow key={r.id} hover>
                        <TableCell sx={{ fontFamily: 'monospace' }}>
                          {r.checkIn || r.checkOut || '-'}
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Avatar sx={{ width: 30, height: 30, bgcolor: 'primary.main', fontSize: 14 }}>
                              {r.personName.charAt(0)}
                            </Avatar>
                            <Typography variant="body2" fontWeight={600}>{r.personName}</Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={personTypeLabel[r.personType] || r.personType}
                            color={personTypeColor[r.personType] || 'default'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={r.checkOut ? 'انصراف' : 'حضور'}
                            size="small"
                            sx={{
                              fontWeight: 700,
                              bgcolor: r.checkOut ? '#fff7ed' : '#ecfdf5',
                              color: r.checkOut ? '#d97706' : '#059669',
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
