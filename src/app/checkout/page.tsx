
import { Suspense } from 'react';
import CheckoutPageClientContent from './CheckoutPageClientContent';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from '@/components/ui/label'; // Added for skeleton

function CheckoutLoading() {
  return (
    <div className="max-w-4xl mx-auto">
      <Skeleton className="h-9 w-3/4 md:w-1/2 mx-auto mb-8 bg-muted" /> {/* Page Title */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {/* Payment Information Card Skeleton */}
          <Card>
            <CardHeader>
              <Skeleton className="h-7 w-1/2 bg-muted" /> {/* Card Title */}
              <Skeleton className="h-4 w-3/4 mt-1 bg-muted" /> {/* Card Description */}
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Skeleton className="h-4 w-1/4 mb-1 bg-muted" /> {/* Label */}
                <Skeleton className="h-10 w-full bg-muted" /> {/* Input */}
              </div>
              <div>
                <Skeleton className="h-4 w-1/4 mb-1 bg-muted" /> {/* Label */}
                <Skeleton className="h-10 w-full bg-muted" /> {/* Input */}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Skeleton className="h-4 w-1/3 mb-1 bg-muted" /> {/* Label */}
                  <Skeleton className="h-10 w-full bg-muted" /> {/* Input */}
                </div>
                <div>
                  <Skeleton className="h-4 w-1/3 mb-1 bg-muted" /> {/* Label */}
                  <Skeleton className="h-10 w-full bg-muted" /> {/* Input */}
                </div>
              </div>
              <div>
                <Skeleton className="h-4 w-1/3 mb-1 bg-muted" /> {/* Label */}
                <div className="flex space-x-2">
                  <Skeleton className="h-10 flex-grow bg-muted" /> {/* Input */}
                  <Skeleton className="h-10 w-20 bg-muted" /> {/* Button */}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Billing Address Card Skeleton */}
          <Card>
            <CardHeader>
              <Skeleton className="h-7 w-1/2 bg-muted" /> {/* Card Title */}
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Skeleton className="h-4 w-1/4 mb-1 bg-muted" /> {/* Label */}
                <Skeleton className="h-10 w-full bg-muted" /> {/* Input */}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Skeleton className="h-4 w-1/3 mb-1 bg-muted" /> {/* Label */}
                  <Skeleton className="h-10 w-full bg-muted" /> {/* Input */}
                </div>
                <div>
                  <Skeleton className="h-4 w-1/3 mb-1 bg-muted" /> {/* Label */}
                  <Skeleton className="h-10 w-full bg-muted" /> {/* Input */}
                </div>
                <div>
                  <Skeleton className="h-4 w-1/3 mb-1 bg-muted" /> {/* Label */}
                  <Skeleton className="h-10 w-full bg-muted" /> {/* Input */}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Summary Card Skeleton */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-3/4 bg-muted" /> {/* Card Title */}
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                <Skeleton className="w-[100px] h-[80px] rounded-md bg-muted" /> {/* Image */}
                <div className="space-y-1 w-full">
                  <Skeleton className="h-5 w-3/4 bg-muted" /> {/* Property Name */}
                  <Skeleton className="h-4 w-1/2 bg-muted" /> {/* Property Location */}
                </div>
              </div>
              <Skeleton className="h-px w-full my-4 bg-muted" /> {/* Separator */}
              <div className="space-y-2 text-sm">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-4 w-1/3 bg-muted" />
                    <Skeleton className="h-4 w-1/4 bg-muted" />
                  </div>
                ))}
                <Skeleton className="h-px w-full my-2 bg-muted" /> {/* Separator */}
                <div className="flex justify-between">
                  <Skeleton className="h-6 w-1/3 bg-muted font-bold" />
                  <Skeleton className="h-6 w-1/4 bg-muted font-bold" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-12 w-full bg-muted" /> {/* Button */}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}


export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutLoading />}>
      <CheckoutPageClientContent />
    </Suspense>
  );
}
