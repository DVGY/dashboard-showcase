import { Box } from '@/components/ui/box';

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default function Page() {
  return (
    <Box className='dashboard-container'>
      <Box className='welcome-usr-msg'>Welcome to Dashboard page</Box>
    </Box>
  );
}
