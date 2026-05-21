import {
  Box,
  Button,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Typography,
  alpha,
} from '@mui/material';
import type { MouseEvent } from 'react';

function handleClick(event: MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function Breadcrumbs({
  icons
}: {
  icons: any[]
}) {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: alpha(theme.palette.primary.main, 1),
        padding: theme.spacing(2),
        position: "sticky",
        width: "100%",
        top: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        "&  *": {
          margin: theme.spacing(0, 0.5),
          fontWeight: theme.typography.fontWeightBold,
          color: theme.palette.primary.contrastText,
        },
      })}
      role="presentation" onClick={handleClick}>
      <MuiBreadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          MUI
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          Core
        </Link>
        <Typography sx={{ color: 'text.primary' }}>Breadcrumbs</Typography>
      </MuiBreadcrumbs>
      <Box sx={{ flexGrow: 1 }} />
      {icons?.map(({ label, icon, onClick }, index) => (
        <Button
          key={index + Math.random()}
          underline="hover"
          color="inherit"
          sx={{ marginRight: 2 }}
          onClick={onClick}
        >
          {label}
          {icon}
        </Button>
      ))}
    </Box>
  );
}
