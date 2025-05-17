import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';

export interface BlogPostCardProps {
  title: string;
  subtitle?: string;
  description: string; // Or an excerpt
  imageUrl: string;
  href: string;
  imageAlt?: string;
}

export default function BlogPostCard({ 
  title,
  subtitle,
  description,
  imageUrl,
  href,
  imageAlt = 'Blog post image'
}: BlogPostCardProps) {
  return (
    <Link href={href} className="group block" passHref legacyBehavior={false}>
      <Card className="h-full flex flex-col overflow-hidden transition-shadow duration-300 group-hover:shadow-xl rounded-lg pt-0">
        <div className="relative aspect-[1/1] w-full overflow-hidden rounded-t-lg leading-none text-[0px]">
          <Image 
            src={imageUrl}
            alt={imageAlt || title}
            fill
            className="block object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardContent className="p-4 sm:p-6">
          <CardTitle className="text-xl lg:text-2xl font-semibold mb-1 group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          {subtitle && (
            <p className="text-sm text-muted-foreground mb-2">
              {subtitle}
            </p>
          )}
          <CardDescription className="text-sm line-clamp-3">
            {description}
          </CardDescription>
        </CardContent>
        <CardFooter className="p-4 sm:p-6 mt-auto">
          <div className="flex items-center text-sm font-medium text-primary group-hover:underline">
            Read more
            <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
} 