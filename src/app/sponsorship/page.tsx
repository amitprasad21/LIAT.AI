'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SponsorshipPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/#sponsorship');
  }, [router]);

  return (
    <div className="text-center py-24 text-text-secondary uppercase tracking-[0.2em] font-sans text-xs">
      Routing to Presentation slide...
    </div>
  );
}
