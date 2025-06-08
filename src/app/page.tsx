
'use client';

import { useState, useEffect, useCallback } from 'react';
import PropertyCard from '@/components/property-card';
import PropertyFilters, { type Filters } from '@/components/property-filters';
import { sampleProperties, type Property } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function HomePage() {
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(sampleProperties);
  const [allFilters, setAllFilters] = useState<Partial<Filters>>({});
  const [visibleCount, setVisibleCount] = useState(6); // Initial number of properties to show
  const [showFilters, setShowFilters] = useState(true); // Filters are visible by default on larger screens

  const applyFilters = useCallback((properties: Property[], filters: Partial<Filters>): Property[] => {
    return properties.filter(property => {
      if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
      if (filters.priceRange) {
        if (property.pricePerNight < filters.priceRange[0] || property.pricePerNight > filters.priceRange[1]) return false;
      }
      if (filters.amenities && filters.amenities.length > 0) {
        if (!filters.amenities.every(amenity => property.amenities.includes(amenity))) return false;
      }
      if (filters.dateRange?.from || filters.dateRange?.to) {
        // Placeholder for date availability logic - for now, we don't filter by date
      }
      if (filters.rating && property.rating < filters.rating) return false;
      if (filters.propertyType && property.type !== filters.propertyType) return false;
      // Add bedrooms and bathrooms filtering if needed
      return true;
    });
  }, []);


  useEffect(() => {
    const newFilteredProperties = applyFilters(sampleProperties, allFilters);
    setFilteredProperties(newFilteredProperties);
    setVisibleCount(6); // Reset visible count on filter change
  }, [allFilters, applyFilters]);

  const handleFilterChange = (filters: Filters) => {
    setAllFilters(filters);
  };

  const loadMoreProperties = () => {
    setVisibleCount(prevCount => prevCount + 6);
  };
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) { // Tailwind's `md` breakpoint
        setShowFilters(false);
      } else {
        setShowFilters(true);
      }
    };
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <div className="space-y-8">
      <section className="text-center py-8 bg-secondary/30 rounded-lg shadow">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-secondary mb-3">Find Your Perfect Haven</h1>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
          Discover premium short-term rentals for unforgettable stays. Luxury, comfort, and style await.
        </p>
      </section>

      <section>
         <Button 
          variant="outline" 
          className="w-full md:hidden mb-4 flex items-center justify-between"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
          <ChevronDown className={cn('h-4 w-4 transition-transform', showFilters && 'rotate-180')} />
        </Button>
        {showFilters && <PropertyFilters onFilterChange={handleFilterChange} defaultFilters={allFilters}/>}
      </section>

      <section>
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.slice(0, visibleCount).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-2">No Properties Found</h2>
            <p className="text-muted-foreground">Try adjusting your filters or check back later.</p>
          </div>
        )}
        {visibleCount < filteredProperties.length && (
          <div className="mt-8 text-center">
            <Button onClick={loadMoreProperties} size="lg">
              Load More Properties
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}

