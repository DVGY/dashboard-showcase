// app/providers.jsx
'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode } from 'react';
import { queryClient } from './queryClient';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
