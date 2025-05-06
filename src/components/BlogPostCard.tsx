import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
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
    <Link href={href} className="group block">
      <Card className="h-full overflow-hidden transition-shadow duration-300 group-hover:shadow-xl">
        <CardHeader className="p-0">
          <div className="relative aspect-video w-full overflow-hidden">
            <Image 
              src={imageUrl}
              alt={imageAlt || title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </CardHeader>
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
        {/* Optionally, a CardFooter could be added here for tags, read time, etc. */}
      </Card>
    </Link>
  );
} 