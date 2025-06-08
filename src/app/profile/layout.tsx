import type { ReactNode } from 'react';

export default function ProfileLayout({ children }: { children: ReactNode }) {
  // This layout is part of a profile section that is not currently used by guests.
  // Admin functionalities are managed elsewhere.
  return <>{children}</>;
}
