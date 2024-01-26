import { Box } from '@/components/ui/box';
import { LinkIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import companylogo from '@/assets/Nirmaan-logos.jpg';

export const Footer = () => {
  return (
    <footer>
      <Box className='flex p-4 bg-slate-50 gap-4'>
        <Box>
          <Image
            className='rounded-full'
            height={40}
            src={companylogo}
            alt='logo org'
          />
        </Box>
        <Box className='flex flex-col gap-1'>
          <Link
            href={
              'https://www.upwork.com/freelancers/~01a6105a278e84d6f9?viewMode=1'
            }
            target='_blank'
            className='font-semibold'
          >
            <LinkIcon className='inline' /> &nbsp; Click to Visit Profile
          </Link>
          <h1 className='text-xs text-slate-500'>
            Copyright &copy; Nirmaan Labs. All Rights Reserved 2024
          </h1>
        </Box>
        <Box className='flex flex-col gap-1'>
          <h1 className='font-semibold'>About the Company</h1>
          <p className='text-xs text-slate-500'>
            Gaurav Yadav is a Web Developer Freelancer at Upwork.
          </p>
        </Box>
      </Box>
    </footer>
  );
};
