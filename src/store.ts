import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = { name: string; email: string; role: string };
type Member = { id: string; name: string; plan: string; branch: string; status: 'Active' | 'Expiring' | 'Frozen'; visits: number; expiry: string };

const demoMembers: Member[] = [
  { id: 'M-1042', name: 'Omar Hassan', plan: 'Gold Annual', branch: 'Nasr City HQ', status: 'Active', visits: 148, expiry: '2026-02-10' },
  { id: 'M-1043', name: 'Sara Ahmed', plan: 'Monthly', branch: 'New Cairo', status: 'Active', visits: 42, expiry: '2026-01-02' },
  { id: 'M-1044', name: 'Karim Adel', plan: 'Quarterly', branch: 'Zamalek', status: 'Active', visits: 96, expiry: '2026-01-15' },
  { id: 'M-1045', name: 'Laila Mostafa', plan: 'VIP PT', branch: 'Nasr City HQ', status: 'Expiring', visits: 178, expiry: '2026-06-01' },
  { id: 'M-1046', name: 'Youssef Ali', plan: 'Monthly', branch: 'New Cairo', status: 'Frozen', visits: 18, expiry: '2026-01-01' },
];

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: JSON.parse(localStorage.getItem('gympro-user') || 'null') as User | null },
  reducers: {
    signIn: (state, action: PayloadAction<User>) => { state.user = action.payload; localStorage.setItem('gympro-user', JSON.stringify(action.payload)); },
    signOut: (state) => { state.user = null; localStorage.removeItem('gympro-user'); },
  },
});

const membersSlice = createSlice({
  name: 'members',
  initialState: { items: demoMembers },
  reducers: {
    addMember: (state, action: PayloadAction<Member>) => { state.items.unshift(action.payload); },
  },
});

export const { signIn, signOut } = authSlice.actions;
export const { addMember } = membersSlice.actions;
export const store = configureStore({ reducer: { auth: authSlice.reducer, members: membersSlice.reducer } });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
