import { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  CheckCircle, Group, NotificationsNone, TrendingUp,
} from '@mui/icons-material';
import {
  Avatar, Box, Card, CardContent, Chip, Stack, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Typography,
} from '@mui/material';
import { type RootState } from '../../store';

function StatCard({ label, value, icon, color }: { label: string; value: string; icon: ReactNode; color: string }) {
  return (
    <Card className="stat-card">
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography color="text.secondary" variant="body2">{label}</Typography>
            <Typography variant="h5" mt={1}>{value}</Typography>
            <Typography variant="caption" color="success.main">+12.4% this month</Typography>
          </Box>
          <Avatar sx={{ bgcolor: `${color}18`, color }}>{icon}</Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
}

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

export default function DashboardHome() {
  const { t } = useTranslation();
  const members = useSelector((state: RootState) => state.members.items);

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4">{t('welcome')}</Typography>
        <Typography color="text.secondary">{t('overview')}</Typography>
      </Box>
      <Box className="stats-grid">
        <StatCard label={t('revenue')} value="EGP 486K" icon={<TrendingUp />} color="#0f766e" />
        <StatCard label={t('active')} value="1,102" icon={<Group />} color="#2563eb" />
        <StatCard label={t('expiring')} value="42" icon={<NotificationsNone />} color="#d97706" />
        <StatCard label={t('attendance')} value="184" icon={<CheckCircle />} color="#7c3aed" />
      </Box>
      <Box className="content-grid">
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight={800}>Revenue performance</Typography>
            <Box className="chart" mt={3}>
              {[45, 62, 52, 75, 68, 86, 78, 94].map((height, index) => (
                <Box key={index} className="chart-bar" sx={{ height: `${height}%` }} />
              ))}
            </Box>
            <Stack direction="row" justifyContent="space-between" mt={1}>
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'].map((month) => (
                <Typography key={month} variant="caption" color="text.secondary">{month}</Typography>
              ))}
            </Stack>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight={800}>Branch utilization</Typography>
            <Stack spacing={2.5} mt={3}>
              {([['Nasr City HQ', 92], ['New Cairo', 81], ['Zamalek', 76]] as [string, number][]).map(([branch, value]) => (
                <Box key={branch}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">{branch}</Typography>
                    <Typography variant="body2" fontWeight={700}>{value}%</Typography>
                  </Stack>
                  <Box className="progress"><Box sx={{ width: `${value}%` }} /></Box>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Box>
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={800} mb={2}>{t('recent')}</Typography>
          <MemberTable members={members.slice(0, 5)} />
        </CardContent>
      </Card>
    </Stack>
  );
}
