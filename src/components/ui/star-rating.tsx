'use client';

import { Star, StarHalf } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  size?: number;
  className?: string;
  iconClassName?: string;
}

export function StarRating({
  rating,
  totalStars = 5,
  size = 20,
  className,
  iconClassName,
}: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn('flex items-center', className)}>
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          size={size}
          className={cn('fill-primary text-primary', iconClassName)}
        />
      ))}
      {hasHalfStar && (
        <StarHalf
          key="half"
          size={size}
          className={cn('fill-primary text-primary', iconClassName)}
        />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star
          key={`empty-${i}`}
          size={size}
          className={cn('text-muted-foreground/50', iconClassName)}
        />
      ))}
    </div>
  );
}
