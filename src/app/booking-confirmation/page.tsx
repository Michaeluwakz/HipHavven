
import { Suspense } from 'react';
import BookingConfirmationClientContent from './BookingConfirmationClientContent';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';

function BookingConfirmationLoading() {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card className="shadow-xl">
        <CardHeader className="text-center items-center">
          <Skeleton className="h-12 w-12 rounded-full mx-auto bg-muted" />
          <Skeleton className="h-8 w-3/4 mt-4 mx-auto bg-muted" />
          <Skeleton className="h-4 w-1/2 mt-2 mx-auto bg-muted" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <Skeleton className="h-4 w-1/3 mb-1 mx-auto bg-muted" />
            <Skeleton className="h-6 w-1/2 mx-auto bg-muted" />
          </div>
          <Skeleton className="h-px w-full bg-muted" />
          <Skeleton className="h-6 w-1/4 bg-muted" />
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 border rounded-lg bg-card/50">
            <Skeleton className="w-full h-[90px] sm:w-[120px] rounded-md bg-muted" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-3/4 bg-muted" />
              <Skeleton className="h-4 w-1/2 bg-muted" />
              <Skeleton className="h-4 w-2/3 bg-muted" />
            </div>
          </div>
          <Skeleton className="h-px w-full bg-muted" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full bg-muted" />
            <Skeleton className="h-4 w-full bg-muted" />
            <Skeleton className="h-4 w-3/4 mt-2 bg-muted" />
          </div>
        </CardContent>
        <div className="flex flex-col sm:flex-row gap-3 pt-6 justify-center p-6">
          <Skeleton className="h-10 w-full sm:w-auto sm:px-16 bg-muted rounded-md" />
        </div>
      </Card>
    </div>
  );
}

export default function BookingConfirmationPage() {
  return (
    <Suspense fallback={<BookingConfirmationLoading />}>
      <BookingConfirmationClientContent />
    </Suspense>
  );
}
