import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Appshell } from '@/components/ui/appshell/appshell';
import { AppshellHeader } from '@/components/ui/appshell/appshellheader';
import { AppshellNavbar } from '@/components/ui/appshell/appshellnavbar';
import { AppshellFooter } from '@/components/ui/appshell/appshellfooter';
import { AppshellMain } from '@/components/ui/appshell/appshellmain';
import { Header } from '@/app/_header/header';
import { Navbar } from '@/app/_navbar/navbar';
import { Footer } from './_footer/footer';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dashboard App Showcase',
  description: 'By Gaurav Yadav for Upwork Portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <Appshell
            headerHeight={{ height: '4.5rem' }}
            navbarWidth={{ width: '15rem' }}
            navbarMinimizedWidth={{ width: '4rem' }}
          >
            <AppshellHeader>
              <Header />
            </AppshellHeader>
            <AppshellNavbar>
              <Navbar />
            </AppshellNavbar>
            <AppshellMain className='h-max-content'> {children} </AppshellMain>
            <AppshellFooter>
              <Footer />
            </AppshellFooter>
          </Appshell>
        </Providers>
      </body>
    </html>
  );
}
