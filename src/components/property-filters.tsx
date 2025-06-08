
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, SlidersHorizontal, Star, Building, Search, ChevronDown, MapPin } from 'lucide-react';
import { allAmenities, allPropertyTypes } from '@/lib/constants';
import { cn } from '@/lib/utils';

export type Filters = {
  location: string;
  priceRange: [number, number];
  amenities: string[];
  dateRange: { from?: Date; to?: Date };
  rating: number;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
};

interface PropertyFiltersProps {
  onFilterChange: (filters: Filters) => void;
  defaultFilters?: Partial<Filters>;
}

const initialFilters: Filters = {
  location: '',
  priceRange: [10000, 1000000], // Adjusted for Naira
  amenities: [],
  dateRange: {},
  rating: 0,
  propertyType: '',
  bedrooms: 0,
  bathrooms: 0,
};

export default function PropertyFilters({ onFilterChange, defaultFilters }: PropertyFiltersProps) {
  const [filters, setFilters] = useState<Filters>({ ...initialFilters, ...defaultFilters });
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const handleInputChange = (field: keyof Filters, value: any) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      amenities: checked
        ? [...prev.amenities, amenity]
        : prev.amenities.filter((a) => a !== amenity),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(filters);
  };
  
  const handleReset = () => {
    setFilters(initialFilters);
    onFilterChange(initialFilters);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 bg-card rounded-lg shadow-md space-y-4">
        <div>
          <Label htmlFor="search-location" className="block text-sm font-medium mb-1 flex items-center">
            <MapPin size={16} className="mr-2 text-primary"/>Location
          </Label>
          <Input
            id="search-location"
            placeholder="Search destinations (e.g., Lekki, Ikoyi)"
            value={filters.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="h-12 text-base w-full"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
          <div>
            <Label htmlFor="check-in-date-main" className="block text-sm font-medium mb-1 flex items-center">
                <CalendarIcon size={16} className="mr-2 text-primary"/>Check-in
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="check-in-date-main"
                  variant="outline"
                  className="w-full h-12 justify-start text-left font-normal text-base"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.dateRange.from ? format(filters.dateRange.from, 'PPP') : <span>Add date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={filters.dateRange.from}
                  onSelect={(date) => handleInputChange('dateRange', { ...filters.dateRange, from: date })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label htmlFor="check-out-date-main" className="block text-sm font-medium mb-1 flex items-center">
                <CalendarIcon size={16} className="mr-2 text-primary"/>Check-out
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="check-out-date-main"
                  variant="outline"
                  className="w-full h-12 justify-start text-left font-normal text-base"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.dateRange.to ? format(filters.dateRange.to, 'PPP') : <span>Add date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={filters.dateRange.to}
                  onSelect={(date) => handleInputChange('dateRange', { ...filters.dateRange, to: date })}
                  initialFocus
                  disabled={{ before: filters.dateRange.from }}
                />
              </PopoverContent>
            </Popover>
          </div>
          <Button type="submit" size="lg" className="w-full h-12 md:mt-0 mt-4 sm:col-start-1 md:col-start-3">
            <Search className="mr-2 h-5 w-5" /> Search
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowMoreFilters(!showMoreFilters)}
            className="w-full h-12 md:mt-0 mt-0"
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            {showMoreFilters ? 'Hide' : 'More'} Filters
            <ChevronDown className={cn('ml-auto h-4 w-4 shrink-0 transition-transform duration-200', showMoreFilters && 'rotate-180')} />
          </Button>
        </div>
      </div>

      {showMoreFilters && (
        <div className="p-6 bg-card rounded-lg shadow-md space-y-6 border data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
          <h3 className="text-xl font-semibold flex items-center font-headline text-secondary">
            <SlidersHorizontal size={20} className="mr-3 text-primary"/>Advanced Filters
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="propertyType" className="flex items-center mb-1"><Building size={16} className="mr-2"/>Property Type</Label>
              <Select
                value={filters.propertyType}
                onValueChange={(value) => handleInputChange('propertyType', value)}
              >
                <SelectTrigger id="propertyType">
                  <SelectValue placeholder="Any type" />
                </SelectTrigger>
                <SelectContent>
                  {allPropertyTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="flex items-center mb-1">
                <span className="mr-2 font-semibold text-base">₦</span>
                Price Range: ₦{filters.priceRange[0].toLocaleString()} - ₦{filters.priceRange[1].toLocaleString()}
              </Label>
              <Slider
                value={[filters.priceRange[0], filters.priceRange[1]]} // Ensure Slider is controlled
                min={10000}
                max={2000000} // Adjusted max for Naira
                step={10000}   // Adjusted step for Naira
                onValueChange={(value) => handleInputChange('priceRange', value as [number, number])}
                className="mt-3"
              />
            </div>

            <div>
              <Label htmlFor="rating" className="flex items-center mb-1"><Star size={16} className="mr-2"/>Minimum Rating: {filters.rating > 0 ? `${filters.rating} stars` : 'Any'}</Label>
              <Select
                value={String(filters.rating)}
                onValueChange={(value) => handleInputChange('rating', Number(value))}
              >
                <SelectTrigger id="rating">
                  <SelectValue placeholder="Any rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Any rating</SelectItem>
                  {[1,2,3,4,5].map(r => <SelectItem key={r} value={String(r)}>{r} Star{r > 1 ? 's' : ''} & Up</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="lg:col-span-3">
              <Label className="flex items-center mb-2"><SlidersHorizontal size={16} className="mr-2"/>Amenities</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-2 max-h-40 overflow-y-auto p-2 border rounded-md">
                {allAmenities.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      id={`amenity-${amenity}`}
                      checked={filters.amenities.includes(amenity)}
                      onCheckedChange={(checked) => handleAmenityChange(amenity, !!checked)}
                    />
                    <Label htmlFor={`amenity-${amenity}`} className="font-normal text-sm">{amenity}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={handleReset}>
              Reset All Filters
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}
