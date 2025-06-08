
'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from '@/components/ui/separator';
import { sampleProperties } from "@/lib/constants";
import { CheckCircle2, Home } from 'lucide-react';

export default function BookingConfirmationClientContent() {
  const searchParams = useSearchParams();
  const propertyId = searchParams.get('propertyId');
  const mockBookingId = searchParams.get('bookingId') || 'BKNG12345XYZ'; // Fallback if not passed
  const property = sampleProperties.find(p => p.id === propertyId) || sampleProperties[0]; // Fallback

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card className="shadow-xl">
        <CardHeader className="text-center items-center">
          <div className="mx-auto bg-green-100 rounded-full p-3 w-fit">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
          <CardTitle className="text-3xl font-headline mt-4">Booking Confirmed!</CardTitle>
          <CardDescription>
            Thank you for booking with HipHaven. Your shortlet is confirmed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Your Booking ID is:</p>
            <p className="text-lg font-semibold text-primary">{mockBookingId}</p>
          </div>
          
          <Separator />

          <h3 className="text-lg font-semibold font-headline">Your Stay:</h3>
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 border rounded-lg bg-card/50">
            <Image 
              src={property.imageUrl} 
              alt={property.name} 
              width={120} 
              height={90} 
              className="rounded-md object-cover w-full sm:w-auto max-w-xs sm:max-w-none"
              data-ai-hint={property.imageHint} 
            />
            <div>
              <h4 className="font-semibold text-md">{property.name}</h4>
              <p className="text-sm text-muted-foreground">{property.location}</p>
              <p className="text-sm text-muted-foreground">
                5 Nights (Demo) - Dates can be added later
              </p>
            </div>
          </div>
          
          <Separator />
          
          <div className="text-sm text-muted-foreground">
            <p>An email confirmation with all your booking details has been sent to your registered email address (this is a demo, so no email is actually sent).</p>
            <p className="mt-2">If you have any questions, please don't hesitate to contact our support team or the host directly via your messages.</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3 pt-6 justify-center">
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Browse More Properties
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
