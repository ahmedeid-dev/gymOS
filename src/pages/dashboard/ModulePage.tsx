import { type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Assessment } from '@mui/icons-material';
import { Avatar, Box, Card, CardContent, Stack, Typography } from '@mui/material';

function StatCard({ label, value, icon, color }: { label: string; value: string; icon: ReactNode; color: string }) {
  return (
    <Card className="stat-card">
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography color="text.secondary" variant="body2">{label}</Typography>
            <Typography variant="h5" mt={1}>{value}</Typography>
          </Box>
          <Avatar sx={{ bgcolor: `${color}18`, color }}>{icon}</Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
}

const modules: Record<string, { title: string; description: string; metrics: [string, string][] }> = {
  classes: {
    title: 'Classes & calendar',
    description: 'Manage bookings, capacity and coach schedules across branches.',
    metrics: [['Today classes', '18'], ['Booked seats', '312'], ['Utilization', '84%']],
  },
  reports: {
    title: 'Reports & analytics',
    description: 'Turn operational data into clear decisions for your team.',
    metrics: [['Monthly revenue', 'EGP 486K'], ['Net margin', '56.3%'], ['Retention', '85.8%']],
  },
  settings: {
    title: 'Workspace settings',
    description: 'Control branches, roles, language and organization preferences.',
    metrics: [['Branches', '3'], ['Team members', '24'], ['Currency', 'EGP']],
  },
};

export default function ModulePage() {
  const location = useLocation();
  // Extract the last segment of the path to determine which module to show
  const segments = location.pathname.split('/');
  const view = segments[segments.length - 1] || 'reports';
  const module = modules[view] || modules.reports;

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4">{module.title}</Typography>
        <Typography color="text.secondary">{module.description}</Typography>
      </Box>
      <Box className="stats-grid">
        {module.metrics.map(([label, value]) => (
          <StatCard key={label} label={label} value={value} icon={<Assessment />} color="#0f766e" />
        ))}
      </Box>
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={800} mb={2}>Module workspace</Typography>
          <Typography color="text.secondary">
            The workflow is ready for API integration. Connect this module to your backend through <code>src/services/api.ts</code>.
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
}
