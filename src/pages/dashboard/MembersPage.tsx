import { type FormEvent, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Add, Search } from '@mui/icons-material';
import {
  Box, Button, Card, CardContent, Chip, Dialog, DialogActions, DialogContent,
  DialogTitle, InputAdornment, Stack, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TextField, Typography,
} from '@mui/material';
import toast from 'react-hot-toast';
import { addMember, type AppDispatch, type RootState } from '../../store';

function MemberTable({ members }: { members: RootState['members']['items'] }) {
  const { t } = useTranslation();
  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            {['ID', t('name'), t('plan'), t('branch'), t('status'), t('visits')].map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id} hover>
              <TableCell>{member.id}</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>{member.name}</TableCell>
              <TableCell>{member.plan}</TableCell>
              <TableCell>{member.branch}</TableCell>
              <TableCell>
                <Chip size="small" label={member.status} color={member.status === 'Active' ? 'success' : member.status === 'Expiring' ? 'warning' : 'default'} />
              </TableCell>
              <TableCell>{member.visits}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function MembersPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const members = useSelector((state: RootState) => state.members.items);
  const [query, setQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const filtered = useMemo(
    () => members.filter((member) =>
      member.name.toLowerCase().includes(query.toLowerCase()) ||
      member.id.toLowerCase().includes(query.toLowerCase())
    ),
    [members, query]
  );

  const addNewMember = (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !email.includes('@')) return toast.error(t('invalid'));
    dispatch(addMember({
      id: `M-${1050 + Math.floor(Math.random() * 100)}`,
      name,
      plan: 'Monthly',
      branch: 'Nasr City HQ',
      status: 'Active',
      visits: 0,
      expiry: '2027-01-01',
    }));
    setDialogOpen(false);
    setName('');
    setEmail('');
    toast.success(t('save'));
  };

  return (
    <>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" gap={2}>
          <Box>
            <Typography variant="h4">{t('members')}</Typography>
            <Typography color="text.secondary">{members.length} members in your organization</Typography>
          </Box>
          <Button variant="contained" startIcon={<Add />} onClick={() => setDialogOpen(true)}>{t('add')}</Button>
        </Stack>
        <Card>
          <CardContent>
            <TextField
              fullWidth
              size="small"
              placeholder={t('search')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><Search /></InputAdornment> }}
            />
            <Box mt={2}>
              <MemberTable members={filtered} />
            </Box>
          </CardContent>
        </Card>
      </Stack>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <Box component="form" onSubmit={addNewMember}>
          <DialogTitle>{t('add')}</DialogTitle>
          <DialogContent sx={{ display: 'grid', gap: 2, pt: '12px !important' }}>
            <TextField label={t('name')} value={name} onChange={(e) => setName(e.target.value)} autoFocus />
            <TextField label={t('email')} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>{t('cancel')}</Button>
            <Button type="submit" variant="contained">{t('save')}</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
