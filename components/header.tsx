'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  ChevronRight,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { MobileMenu } from '@/components/mobile-menu';
import { ContactPopover } from '@/components/contact-popover';

const navItems = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'About',
    href: '/about',
  },
  {
    name: 'Blogs',
    href: '/blogs',
  },
  {
    name: 'Library',
    href: '/library',
  },
  {
    name: 'Contact',
    href: '/contact',
  },
  {
    name: 'Admission',
    href: '/admission',
  },
];

export function Header() {
  const pathname = usePathname();

  // HIDE HEADER ON ADMIN PAGE
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-blue-100 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        
        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <Image
            src="/vihaanlogo.png"
            alt="Vihaan Education Academy Logo"
            width={48}
            height={48}
            className="h-12 w-12 rounded-2xl object-contain"
          />

          <div>
            <h1 className="text-lg font-bold text-gray-900 sm:text-2xl">
              Vihaan Education
            </h1>

            <p className="text-xs text-gray-500">
              Academy
            </p>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
              >
                <Button
                  variant="ghost"
                  className={`rounded-xl px-5 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                  }`}
                >
                  {item.name}
                </Button>
              </Link>
            );
          })}

          <Link href="/admin">
            <Button
              variant="outline"
              className="border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              Admin
            </Button>
          </Link>

          <Link href="/admission">
            <Button className="gap-2 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600">
              Apply Now

              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>

          <div className="ml-2">
            <ContactPopover />
          </div>
        </nav>

        {/* MOBILE MENU + CONTACT */}
        <div className="flex items-center gap-2 lg:hidden">
          <ContactPopover />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}