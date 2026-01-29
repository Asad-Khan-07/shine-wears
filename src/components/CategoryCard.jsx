import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
export default function CategoryCard({ category }) {
const slugify = (text = '') =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');

    
    return (
      <Link
      to={`/category/${slugify(category.category_name)}`}
      // to={`/category/${category.category_name}`}
      className="group relative block overflow-hidden"
    >
        {/* <Skeleton className="h-4 w-[250px]" /> */}
      <div className="aspect-[4/5] relative">
        {/* Background Image */}
        <img
          src={category.img_url}
          alt={category.category_name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <h3 className="text-3xl text-background luxury-heading mb-2 transform group-hover:-translate-y-2 transition-transform duration-300">
            {category.category_name}
          </h3>
          <p className="text-background/70 text-sm mb-4 transform group-hover:-translate-y-2 transition-transform duration-300 delay-75">
            {category.description}
          </p>
          <div className="flex items-center text-secondary text-sm tracking-widest uppercase transform group-hover:-translate-y-2 transition-transform duration-300 delay-100">
            <span>Explore</span>
            <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
}
