import React from 'react';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, className }) => {
  return (
    <main
      className={cn(
        'flex justify-center items-center h-screen bg-background',
        className
      )}
    >
      {children}
    </main>
  );
};

export default MainLayout;
