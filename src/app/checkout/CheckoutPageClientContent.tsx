
'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { sampleProperties } from "@/lib/constants";
import Image from 'next/image';
import { CreditCard } from 'lucide-react';

export default function CheckoutPageClientContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const propertyId = searchParams.get('propertyId');
  const property = sampleProperties.find(p => p.id === propertyId) || sampleProperties[0]; // Fallback to first property

  const subtotal = property.pricePerNight * 5; // Assuming 5 nights for demo
  const taxes = subtotal * 0.1; // 10% tax
  const serviceFee = 5000; // Adjusted for Naira context
  const total = subtotal + taxes + serviceFee;

  const handlePayment = () => {
    // In a real app, payment processing would happen here.
    // For demo, we'll generate a mock booking ID and navigate.
    const mockBookingId = `BKNG${Date.now().toString().slice(-6)}${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
    router.push(`/booking-confirmation?propertyId=${property.id}&bookingId=${mockBookingId}`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold font-headline mb-8 text-center">Complete Your Booking</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Payment Information</CardTitle>
              <CardDescription>Enter your payment details to secure your booking.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="cardName">Name on Card</Label>
                <Input id="cardName" placeholder="John Doe" />
              </div>
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="•••• •••• •••• ••••" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input id="expiryDate" placeholder="MM/YY" />
                </div>
                <div>
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="•••" />
                </div>
              </div>
               <div>
                <Label htmlFor="couponCode">Coupon Code (Optional)</Label>
                <div className="flex space-x-2">
                  <Input id="couponCode" placeholder="Enter coupon code" className="flex-grow"/>
                  <Button variant="outline">Apply</Button>
                </div>
              </div>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Billing Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div>
                <Label htmlFor="address">Street Address</Label>
                <Input id="address" placeholder="123 Main St" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Anytown" />
                </div>
                <div>
                  <Label htmlFor="state">State / Province</Label>
                  <Input id="state" placeholder="CA" />
                </div>
                <div>
                  <Label htmlFor="zip">ZIP / Postal Code</Label>
                  <Input id="zip" placeholder="90210" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-xl">Booking Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                <Image src={property.imageUrl} alt={property.name} width={100} height={80} className="rounded-md object-cover" data-ai-hint={property.imageHint}/>
                <div>
                  <h3 className="font-semibold">{property.name}</h3>
                  <p className="text-sm text-muted-foreground">{property.location}</p>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Price per night:</span>
                  <span>₦{property.pricePerNight.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Nights:</span>
                  <span>5 (Demo)</span>
                </div>
                 <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes (10%):</span>
                  <span>₦{taxes.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Fee:</span>
                  <span>₦{serviceFee.toLocaleString()}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="lg" onClick={handlePayment}>
                <CreditCard className="mr-2 h-5 w-5" /> Pay ₦{total.toLocaleString()}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
