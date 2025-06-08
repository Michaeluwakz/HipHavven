import Image, { type ImageProps } from 'next/image';

// Omit props that we are setting internally, but allow others like className.
type LogoSpecificProps = Omit<ImageProps, 'src' | 'alt' | 'width' | 'height'>;

export function Logo(props: LogoSpecificProps) {
  return (
    <Image
      src="https://i.ibb.co/TDfgx0d5/APARTMENT-1.png"
      alt="HipHaven Logo" // Descriptive alt text for accessibility
      width={299} // Intrinsic width of the image
      height={60}  // Intrinsic height of the image
      priority // Consider adding priority if the logo is an LCP element
      {...props} // Spread the rest of the props, including className
    />
  );
}
