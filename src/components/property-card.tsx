
import Image from 'next/image';
import Link from 'next/link';
import type { Property } from '@/lib/constants';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/ui/star-rating';
import { MapPin, BedDouble, Bath, Heart } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-xl">
      <CardHeader className="p-0 relative">
        <Link href={`/properties/${property.id}`} className="block aspect-[3/2] w-full">
           <Image
            src={property.imageUrl}
            alt={property.name}
            width={600}
            height={400}
            className="object-cover w-full h-full"
            data-ai-hint={property.imageHint}
          />
        </Link>
        <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-background/70 hover:bg-background/90 rounded-full">
          <Heart className="h-5 w-5 text-destructive-foreground/70 hover:fill-destructive hover:text-destructive" />
          <span className="sr-only">Favorite</span>
        </Button>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link href={`/properties/${property.id}`}>
          <CardTitle className="text-xl font-headline mb-1 hover:text-primary transition-colors">{property.name}</CardTitle>
        </Link>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          {property.location}
        </div>
        <div className="flex items-center space-x-3 text-sm text-muted-foreground mb-3">
            <span className="flex items-center"><BedDouble size={16} className="mr-1"/> {property.bedrooms} beds</span>
            <span className="flex items-center"><Bath size={16} className="mr-1"/> {property.bathrooms} baths</span>
        </div>
        <div className="flex items-center mb-3">
          <StarRating rating={property.rating} size={18} />
          <span className="ml-2 text-sm text-muted-foreground">({property.rating.toFixed(1)})</span>
        </div>
        <div className="space-x-1 space-y-1">
          {property.amenities.slice(0, 3).map((amenity) => (
            <Badge key={amenity} variant="secondary" className="font-normal">
              {amenity}
            </Badge>
          ))}
          {property.amenities.length > 3 && (
            <Badge variant="secondary" className="font-normal">
              +{property.amenities.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center border-t">
        <div>
          <span className="text-lg font-bold text-foreground">₦{property.pricePerNight.toLocaleString()}</span>
          <span className="text-sm text-muted-foreground"> / night</span>
        </div>
        <Button asChild>
          <Link href={`/checkout?propertyId=${property.id}`}>Book Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
