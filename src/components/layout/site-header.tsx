

import Link from 'next/link';
import { Logo } from '@/components/logo';
import { MainNav } from '@/components/layout/main-nav';
import { Button } from '@/components/ui/button';
import { User, LogIn, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { mainNavItems } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { ThemeToggleButton } from '@/components/theme-toggle-button';

export default function SiteHeader() {
  const isAdminLoggedIn = false; // Placeholder for admin auth state

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Logo className="h-[88px] w-auto" />
        </Link>

        {/* Desktop Navigation & Login */}
        <div className="hidden md:flex items-center space-x-4">
          <MainNav />
          <div className="flex items-center space-x-2">
            <ThemeToggleButton />
            {/* For admin login, you might have a different button or route */}
            <Button variant="outline" className="h-9">
              <LogIn className="mr-2 h-4 w-4" />
              Admin Login
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Trigger & Sheet */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggleButton />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] p-0">
              <nav className="flex flex-col h-full p-6">
                <Link href="/" className="mb-8 flex items-center">
                  <Logo className="h-10 w-auto" />
                </Link>
                <div className="flex-grow flex flex-col space-y-4">
                  {mainNavItems.map((item) => (
                    item.href && (
                      <Link
                        key={item.title}
                        href={item.href}
                        className={cn(
                          'text-lg font-medium transition-colors hover:text-primary text-foreground/80 py-2',
                          item.disabled && 'cursor-not-allowed opacity-80'
                        )}
                      >
                        {item.title}
                      </Link>
                    )
                  ))}
                </div>
                <div className="mt-auto border-t pt-6">
                  {/* For admin login in mobile sheet */}
                  <Button variant="outline" className="w-full justify-start text-lg py-3">
                    <LogIn className="mr-3 h-5 w-5" />
                    Admin Login
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
