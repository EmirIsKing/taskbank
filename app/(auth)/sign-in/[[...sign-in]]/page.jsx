'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectSignIn() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/'); // Redirects to homepage
  }, [router]);

  return null; // Renders nothing
}
