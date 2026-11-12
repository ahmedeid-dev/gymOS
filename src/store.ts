import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

// === Existing Types ===
type User = { name: string; email: string; role: string };
type Member = { id: string; name: string; plan: string; branch: string; status: 'Active' | 'Expiring' | 'Frozen'; visits: number; expiry: string };

// === NEW Types ===
export type StaffMember = {
  id: string; name: string; role: 'captain' | 'employee';
  department: string; shift: 'day' | 'night'; phone: string; joinDate: string;
};

export type AttendanceRecord = {
  id: string; personId: string; personName: string;
  personType: 'member' | 'captain' | 'employee';
  date: string; checkIn: string | null; checkOut: string | null;
  status: 'present' | 'late' | 'absent' | 'sick' | 'leave' | 'permission' | 'day-off';
  shift: 'day' | 'night'; lateMinutes: number; notes: string;
};

export type LeaveRequest = {
  id: string; staffId: string; staffName: string;
  type: 'annual' | 'sick' | 'permission' | 'emergency';
  startDate: string; endDate: string;
  status: 'pending' | 'approved' | 'rejected'; reason: string;
};

// Demo members (keep existing)
const demoMembers: Member[] = [
  { id: 'M-1042', name: 'Omar Hassan', plan: 'Gold Annual', branch: 'Nasr City HQ', status: 'Active', visits: 148, expiry: '2026-02-10' },
  { id: 'M-1043', name: 'Sara Ahmed', plan: 'Monthly', branch: 'New Cairo', status: 'Active', visits: 42, expiry: '2026-01-02' },
  { id: 'M-1044', name: 'Karim Adel', plan: 'Quarterly', branch: 'Zamalek', status: 'Active', visits: 96, expiry: '2026-01-15' },
  { id: 'M-1045', name: 'Laila Mostafa', plan: 'VIP PT', branch: 'Nasr City HQ', status: 'Expiring', visits: 178, expiry: '2026-06-01' },
  { id: 'M-1046', name: 'Youssef Ali', plan: 'Monthly', branch: 'New Cairo', status: 'Frozen', visits: 18, expiry: '2026-01-01' },
];

// NEW demo staff
const demoStaff: StaffMember[] = [
  { id: 'S-001', name: 'أحمد محمد', role: 'captain', department: 'تدريب', shift: 'day', phone: '01001234567', joinDate: '2024-01-15' },
  { id: 'S-002', name: 'محمد علي', role: 'captain', department: 'تدريب', shift: 'night', phone: '01112345678', joinDate: '2024-03-01' },
  { id: 'S-003', name: 'فاطمة حسن', role: 'employee', department: 'استقبال', shift: 'day', phone: '01223456789', joinDate: '2024-06-10' },
  { id: 'S-004', name: 'خالد إبراهيم', role: 'employee', department: 'صيانة', shift: 'night', phone: '01034567890', joinDate: '2025-01-20' },
  { id: 'S-005', name: 'نورا سعيد', role: 'captain', department: 'تدريب', shift: 'day', phone: '01245678901', joinDate: '2025-04-01' },
  { id: 'S-006', name: 'ياسر أحمد', role: 'employee', department: 'استقبال', shift: 'day', phone: '01056789012', joinDate: '2025-07-15' },
  { id: 'S-007', name: 'هدى عبدالله', role: 'captain', department: 'تدريب', shift: 'night', phone: '01167890123', joinDate: '2024-09-01' },
  { id: 'S-008', name: 'عمرو حسين', role: 'employee', department: 'إدارة', shift: 'day', phone: '01278901234', joinDate: '2024-02-01' },
];

// Generate today's date string
const today = new Date().toISOString().split('T')[0];

// NEW demo attendance records for today
const demoAttendance: AttendanceRecord[] = [
  { id: 'A-001', personId: 'S-001', personName: 'أحمد محمد', personType: 'captain', date: today, checkIn: '06:55', checkOut: '15:00', status: 'present', shift: 'day', lateMinutes: 0, notes: '' },
  { id: 'A-002', personId: 'S-003', personName: 'فاطمة حسن', personType: 'employee', date: today, checkIn: '07:20', checkOut: '15:30', status: 'late', shift: 'day', lateMinutes: 20, notes: 'زحمة مرور' },
  { id: 'A-003', personId: 'S-005', personName: 'نورا سعيد', personType: 'captain', date: today, checkIn: '07:00', checkOut: null, status: 'present', shift: 'day', lateMinutes: 0, notes: '' },
  { id: 'A-004', personId: 'S-006', personName: 'ياسر أحمد', personType: 'employee', date: today, checkIn: '07:45', checkOut: null, status: 'late', shift: 'day', lateMinutes: 45, notes: '' },
  { id: 'A-005', personId: 'S-008', personName: 'عمرو حسين', personType: 'employee', date: today, checkIn: '06:58', checkOut: null, status: 'present', shift: 'day', lateMinutes: 0, notes: '' },
  { id: 'A-006', personId: 'S-004', personName: 'خالد إبراهيم', personType: 'employee', date: today, checkIn: null, checkOut: null, status: 'absent', shift: 'night', lateMinutes: 0, notes: '' },
  { id: 'A-007', personId: 'S-002', personName: 'محمد علي', personType: 'captain', date: today, checkIn: null, checkOut: null, status: 'sick', shift: 'night', lateMinutes: 0, notes: 'إجازة مرضية - إنفلونزا' },
  { id: 'A-008', personId: 'S-007', personName: 'هدى عبدالله', personType: 'captain', date: today, checkIn: null, checkOut: null, status: 'leave', shift: 'night', lateMinutes: 0, notes: 'إجازة سنوية' },
  { id: 'A-009', personId: 'M-1042', personName: 'Omar Hassan', personType: 'member', date: today, checkIn: '08:30', checkOut: null, status: 'present', shift: 'day', lateMinutes: 0, notes: '' },
  { id: 'A-010', personId: 'M-1043', personName: 'Sara Ahmed', personType: 'member', date: today, checkIn: '09:15', checkOut: null, status: 'present', shift: 'day', lateMinutes: 0, notes: '' },
  { id: 'A-011', personId: 'S-003', personName: 'فاطمة حسن', personType: 'employee', date: today, checkIn: null, checkOut: null, status: 'permission', shift: 'day', lateMinutes: 0, notes: 'استئذان ساعتين - موعد طبيب' },
];

const demoLeaves: LeaveRequest[] = [
  { id: 'L-001', staffId: 'S-007', staffName: 'هدى عبدالله', type: 'annual', startDate: today, endDate: today, status: 'approved', reason: 'إجازة سنوية' },
  { id: 'L-002', staffId: 'S-002', staffName: 'محمد علي', type: 'sick', startDate: today, endDate: today, status: 'approved', reason: 'إنفلونزا' },
];

// === Slices ===
// Keep existing authSlice exactly as is
const authSlice = createSlice({
  name: 'auth',
  initialState: { user: JSON.parse(localStorage.getItem('gympro-user') || 'null') as User | null },
  reducers: {
    signIn: (state, action: PayloadAction<User>) => { state.user = action.payload; localStorage.setItem('gympro-user', JSON.stringify(action.payload)); },
    signOut: (state) => { state.user = null; localStorage.removeItem('gympro-user'); },
  },
});

// Keep existing membersSlice exactly as is
const membersSlice = createSlice({
  name: 'members',
  initialState: { items: demoMembers },
  reducers: {
    addMember: (state, action: PayloadAction<Member>) => { state.items.unshift(action.payload); },
  },
});

// NEW attendance slice
const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: {
    records: demoAttendance,
    staff: demoStaff,
    leaves: demoLeaves,
  },
  reducers: {
    recordCheckIn: (state, action: PayloadAction<{ personId: string; personName: string; personType: 'member' | 'captain' | 'employee'; shift?: 'day' | 'night' }>) => {
      const now = new Date();
      const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      const shiftStart = action.payload.shift === 'night' ? 18 : 7;
      const lateMinutes = Math.max(0, (now.getHours() * 60 + now.getMinutes()) - shiftStart * 60);
      state.records.unshift({
        id: `A-${Date.now()}`,
        personId: action.payload.personId,
        personName: action.payload.personName,
        personType: action.payload.personType,
        date: now.toISOString().split('T')[0],
        checkIn: time,
        checkOut: null,
        status: lateMinutes > 0 ? 'late' : 'present',
        shift: action.payload.shift || 'day',
        lateMinutes,
        notes: '',
      });
    },
    recordCheckOut: (state, action: PayloadAction<{ personId: string }>) => {
      const now = new Date();
      const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      const todayStr = now.toISOString().split('T')[0];
      const record = state.records.find(r => r.personId === action.payload.personId && r.date === todayStr && r.checkIn && !r.checkOut);
      if (record) record.checkOut = time;
    },
    updateAttendanceStatus: (state, action: PayloadAction<{ id: string; status: AttendanceRecord['status']; notes?: string }>) => {
      const record = state.records.find(r => r.id === action.payload.id);
      if (record) {
        record.status = action.payload.status;
        if (action.payload.notes !== undefined) record.notes = action.payload.notes;
      }
    },
    addLeaveRequest: (state, action: PayloadAction<Omit<LeaveRequest, 'id' | 'status'>>) => {
      state.leaves.unshift({ ...action.payload, id: `L-${Date.now()}`, status: 'pending' });
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export const { addMember } = membersSlice.actions;
export const { recordCheckIn, recordCheckOut, updateAttendanceStatus, addLeaveRequest } = attendanceSlice.actions;
export const store = configureStore({ reducer: { auth: authSlice.reducer, members: membersSlice.reducer, attendance: attendanceSlice.reducer } });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
