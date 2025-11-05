import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';

interface CategoryCardProps {
  title: string;
  image: string;
  link: string;
  subtitle?: string;
}

export const CategoryCard = ({ title, image, link, subtitle }: CategoryCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <Link to={link} className="block p-4">
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <div className="aspect-square bg-muted mb-4 overflow-hidden rounded">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        {subtitle && (
          <p className="text-sm text-muted-foreground mb-2">{subtitle}</p>
        )}
        <span className="text-sm text-primary hover:underline">Shop now</span>
      </Link>
    </Card>
  );
};
