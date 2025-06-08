'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavItem } from '@/lib/constants';
import { mainNavItems } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {mainNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            pathname === item.href ? 'text-primary' : 'text-foreground/80',
            item.disabled && 'cursor-not-allowed opacity-80'
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
