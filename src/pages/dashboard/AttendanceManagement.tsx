import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar, Box, Button, Card, CardContent, Chip, Dialog, DialogActions,
  DialogContent, DialogTitle, MenuItem, Stack, Tab, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Tabs, TextField,
  Typography,
} from '@mui/material';
import {
  AccessTime, Add, BeachAccess, Cancel, CheckCircle, Search,
} from '@mui/icons-material';
import toast from 'react-hot-toast';
import {
  type RootState, type AppDispatch,
  updateAttendanceStatus, addLeaveRequest,
} from '../../store';

/* ───── helpers ───── */
const todayISO = () => new Date().toISOString().slice(0, 10);

const statusLabel: Record<string, string> = {
  present: 'حاضر', late: 'متأخر', absent: 'غائب',
  sick: 'إجازة مرضية', leave: 'إجازة', permission: 'استئذان', 'day-off': 'يوم إجازة',
};
const statusColor: Record<string, 'success' | 'warning' | 'error' | 'info' | 'default' | 'secondary'> = {
  present: 'success', late: 'warning', absent: 'error',
  sick: 'info', leave: 'default', permission: 'secondary', 'day-off': 'default',
};
const roleLabel: Record<string, string> = { captain: 'كابتن', employee: 'موظف', member: 'عضو' };
const roleColor: Record<string, 'primary' | 'secondary' | 'default'> = {
  captain: 'primary', employee: 'secondary', member: 'default',
};
const shiftLabel: Record<string, string> = { day: 'نهاري', night: 'ليلي' };
const shiftColor: Record<string, 'info' | 'warning'> = { day: 'info', night: 'warning' };

const tabFilters: Record<number, string | null> = {
  0: null, 1: 'present', 2: 'late', 3: 'absent', 4: 'sick', 5: 'leave', 6: 'permission',
};

/* ───── stat card ───── */
function StatCard({ label, value, icon, color }: { label: string; value: number; icon: React.ReactNode; color: string }) {
  return (
    <Card>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography color="text.secondary" variant="body2">{label}</Typography>
            <Typography variant="h4" fontWeight={800} mt={1}>{value}</Typography>
          </Box>
          <Avatar sx={{ bgcolor: `${color}18`, color, width: 48, height: 48 }}>{icon}</Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
}

/* ───── main component ───── */
export default function AttendanceManagement() {
  const dispatch = useDispatch<AppDispatch>();
  const records = useSelector((s: RootState) => s.attendance.records);
  const staff = useSelector((s: RootState) => s.attendance.staff);

  /* filter state */
  const [dateFilter, setDateFilter] = useState(todayISO());
  const [typeFilter, setTypeFilter] = useState('all');
  const [shiftFilter, setShiftFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState(0);

  /* leave dialog */
  const [dialogOpen, setDialogOpen] = useState(false);
  const [leaveStaffId, setLeaveStaffId] = useState('');
  const [leaveStaffName, setLeaveStaffName] = useState('');
  const [leaveType, setLeaveType] = useState<'annual' | 'sick' | 'permission' | 'emergency'>('annual');
  const [leaveStart, setLeaveStart] = useState(todayISO());
  const [leaveEnd, setLeaveEnd] = useState(todayISO());
  const [leaveReason, setLeaveReason] = useState('');

  /* today's counts */
  const todayRecords = useMemo(() => records.filter(r => r.date === dateFilter), [records, dateFilter]);

  const presentCount = todayRecords.filter(r => r.status === 'present').length;
  const lateCount = todayRecords.filter(r => r.status === 'late').length;
  const absentCount = todayRecords.filter(r => r.status === 'absent').length;
  const leaveCount = todayRecords.filter(r => ['leave', 'sick', 'permission'].includes(r.status)).length;

  /* filtered records */
  const filteredRecords = useMemo(() => {
    let result = todayRecords;

    /* tab filter */
    const tabStatus = tabFilters[activeTab];
    if (tabStatus) {
      result = result.filter(r => r.status === tabStatus);
    }

    /* type filter */
    if (typeFilter === 'captain') result = result.filter(r => r.personType === 'captain');
    else if (typeFilter === 'employee') result = result.filter(r => r.personType === 'employee');

    /* shift filter */
    if (shiftFilter === 'day') result = result.filter(r => r.shift === 'day');
    else if (shiftFilter === 'night') result = result.filter(r => r.shift === 'night');

    /* status filter (overrides tab when not 'all') */
    if (statusFilter !== 'all') {
      result = result.filter(r => r.status === statusFilter);
    }

    return result;
  }, [todayRecords, activeTab, typeFilter, shiftFilter, statusFilter]);

  /* leave submit */
  const handleLeaveSubmit = () => {
    if (!leaveStaffId) { toast.error('يرجى اختيار الموظف'); return; }
    if (!leaveReason.trim()) { toast.error('يرجى إدخال السبب'); return; }
    dispatch(addLeaveRequest({
      staffId: leaveStaffId,
      staffName: leaveStaffName,
      type: leaveType,
      startDate: leaveStart,
      endDate: leaveEnd,
      reason: leaveReason,
    }));
    toast.success('تم إضافة الإجازة/الاستئذان بنجاح!');
    setDialogOpen(false);
    setLeaveStaffId('');
    setLeaveStaffName('');
    setLeaveType('annual');
    setLeaveReason('');
  };

  return (
    <Stack spacing={3}>
      {/* Header */}
      <Box>
        <Typography variant="h4">إدارة الحضور والانصراف</Typography>
        <Typography color="text.secondary">متابعة حضور وانصراف الموظفين والكباتن</Typography>
      </Box>

      {/* Stats Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 2 }}>
        <StatCard label="الحاضرون اليوم" value={presentCount} icon={<CheckCircle />} color="#0f766e" />
        <StatCard label="المتأخرون" value={lateCount} icon={<AccessTime />} color="#d97706" />
        <StatCard label="الغائبون" value={absentCount} icon={<Cancel />} color="#dc2626" />
        <StatCard label="في إجازة" value={leaveCount} icon={<BeachAccess />} color="#2563eb" />
      </Box>

      {/* Filter Bar */}
      <Card>
        <CardContent>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ md: 'center' }}>
            <TextField
              label="التاريخ"
              type="date"
              size="small"
              value={dateFilter}
              onChange={e => setDateFilter(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ minWidth: 160 }}
            />
            <TextField
              label="النوع"
              select
              size="small"
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              sx={{ minWidth: 130 }}
            >
              <MenuItem value="all">الكل</MenuItem>
              <MenuItem value="captain">كابتن</MenuItem>
              <MenuItem value="employee">موظف</MenuItem>
            </TextField>
            <TextField
              label="الشفت"
              select
              size="small"
              value={shiftFilter}
              onChange={e => setShiftFilter(e.target.value)}
              sx={{ minWidth: 130 }}
            >
              <MenuItem value="all">الكل</MenuItem>
              <MenuItem value="day">نهاري</MenuItem>
              <MenuItem value="night">ليلي</MenuItem>
            </TextField>
            <TextField
              label="الحالة"
              select
              size="small"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              sx={{ minWidth: 160 }}
            >
              <MenuItem value="all">الكل</MenuItem>
              <MenuItem value="present">حاضر</MenuItem>
              <MenuItem value="late">متأخر</MenuItem>
              <MenuItem value="absent">غائب</MenuItem>
              <MenuItem value="sick">إجازة مرضية</MenuItem>
              <MenuItem value="leave">إجازة</MenuItem>
              <MenuItem value="permission">استئذان</MenuItem>
            </TextField>
            <Button variant="contained" startIcon={<Search />} sx={{ minWidth: 100 }}>
              بحث
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={() => setDialogOpen(true)}
            >
              إضافة إجازة/استئذان
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Card>
        <Tabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          variant="scrollable"
          scrollButtons="auto"
          textColor="primary"
          indicatorColor="primary"
          sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}
        >
          <Tab label="الكل" sx={{ fontWeight: 700 }} />
          <Tab label="الحاضرون" sx={{ fontWeight: 700 }} />
          <Tab label="المتأخرون" sx={{ fontWeight: 700 }} />
          <Tab label="الغائبون" sx={{ fontWeight: 700 }} />
          <Tab label="إجازة مرضية" sx={{ fontWeight: 700 }} />
          <Tab label="إجازات" sx={{ fontWeight: 700 }} />
          <Tab label="استئذان" sx={{ fontWeight: 700 }} />
        </Tabs>

        {/* Table */}
        <CardContent>
          {filteredRecords.length === 0 ? (
            <Typography color="text.secondary" textAlign="center" py={6}>
              لا توجد سجلات مطابقة
            </Typography>
          ) : (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>الاسم</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>الدور</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>الشفت</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>وقت الحضور</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>وقت الانصراف</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>الحالة</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>التأخير</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>ملاحظات</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRecords.map(r => (
                    <TableRow key={r.id} hover>
                      <TableCell sx={{ fontWeight: 700 }}>{r.personName}</TableCell>
                      <TableCell>
                        <Chip
                          label={roleLabel[r.personType] || r.personType}
                          color={roleColor[r.personType] || 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={shiftLabel[r.shift] || r.shift}
                          color={shiftColor[r.shift] || 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell sx={{ fontFamily: 'monospace' }}>
                        {r.checkIn || '-'}
                      </TableCell>
                      <TableCell sx={{ fontFamily: 'monospace' }}>
                        {r.checkOut || '-'}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={statusLabel[r.status] || r.status}
                          color={statusColor[r.status] || 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {r.lateMinutes > 0 ? (
                          <Typography variant="body2" color="warning.main" fontWeight={600}>
                            {r.lateMinutes} دقيقة
                          </Typography>
                        ) : (
                          <Typography variant="body2" color="text.secondary">-</Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {r.notes || '-'}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* Add Leave / Permission Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 800 }}>إضافة إجازة / استئذان</DialogTitle>
        <DialogContent sx={{ display: 'grid', gap: 2.5, pt: '16px !important' }}>
          <TextField
            label="اختيار الموظف/الكابتن"
            select
            fullWidth
            value={leaveStaffId}
            onChange={e => {
              setLeaveStaffId(e.target.value);
              const found = staff.find(s => s.id === e.target.value);
              setLeaveStaffName(found ? found.name : '');
            }}
          >
            {staff.length === 0 && <MenuItem value="" disabled>لا يوجد موظفين مسجلين</MenuItem>}
            {staff.map(s => (
              <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="نوع الإجازة"
            select
            fullWidth
            value={leaveType}
            onChange={e => setLeaveType(e.target.value as 'annual' | 'sick' | 'permission' | 'emergency')}
          >
            <MenuItem value="annual">إجازة سنوية</MenuItem>
            <MenuItem value="sick">إجازة مرضية</MenuItem>
            <MenuItem value="permission">استئذان</MenuItem>
            <MenuItem value="emergency">طارئة</MenuItem>
          </TextField>
          <Stack direction="row" spacing={2}>
            <TextField
              label="تاريخ البداية"
              type="date"
              fullWidth
              value={leaveStart}
              onChange={e => setLeaveStart(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="تاريخ النهاية"
              type="date"
              fullWidth
              value={leaveEnd}
              onChange={e => setLeaveEnd(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Stack>
          <TextField
            label="السبب"
            multiline
            rows={3}
            fullWidth
            value={leaveReason}
            onChange={e => setLeaveReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setDialogOpen(false)}>إلغاء</Button>
          <Button variant="contained" onClick={handleLeaveSubmit}>حفظ</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
