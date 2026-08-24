import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { menuItems, getMenuItemBySlug } from '@/data/menu';
import { DishDetailClient } from './DishDetailClient';

interface Props {
  params: { id: string };
}

export function generateStaticParams() {
  return menuItems.map((item) => ({ id: item.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const dish = getMenuItemBySlug(params.id);
  if (!dish) return { title: 'Dish not found' };
  return {
    title: dish.name,
    description: dish.description,
    openGraph: {
      title: dish.name,
      description: dish.description,
      images: [{ url: dish.image }],
    },
  };
}

export default function DishDetailPage({ params }: Props) {
  const dish = getMenuItemBySlug(params.id);
  if (!dish) notFound();
  return <DishDetailClient dish={dish} />;
}
