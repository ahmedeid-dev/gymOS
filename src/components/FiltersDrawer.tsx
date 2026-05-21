import {
  Drawer,
  Grid
} from '@mui/material';
import SubmitButton from './buttons/SubmitButton';

export default function FiltersDrawer({
  children,
  openDrawer,
}: {
  children: React.ReactNode
  openDrawer: boolean
}) {
  return (
    <Drawer
      variant="persistent"
      anchor={"right"}
      open={openDrawer}
      onClose={() => false}
      sx={{
        width: 280,
        flexShrink: 0,
        position: 'relative',
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
          position: 'relative',
        },
      }}
    >
      <Grid
        component={"form"}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          p: 2,
        }}
        container
        spacing={2}
      >
        <Grid
          sx={{
            overflowY: "auto",
          }}
          container size={{ xs: 12 }}>
          {children}
        </Grid>
        <Grid size={{ xs: 12 }}>
          <SubmitButton
            label='Submit'
            onSubmit={() => console.log("clicked")}
          />
        </Grid>
      </Grid>
    </Drawer>
  )
}
