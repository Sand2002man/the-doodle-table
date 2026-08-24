'use client';

import { useMemo, useState, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { menuItems } from '@/data/menu';
import { categoryLabels } from '@/data/restaurant';
import { DishCard } from '@/components/menu/DishCard';
import { DishModal } from '@/components/menu/DishModal';
import type { MenuItem, MenuCategory } from '@/types';
import { cn } from '@/lib/utils';

type SortKey = 'popular' | 'price-asc' | 'price-desc' | 'newest';

const filterCategories: { value: string; label: string }[] = [
  { value: 'all', label: 'All' },
  ...Object.entries(categoryLabels).map(([value, label]) => ({ value, label })),
];

const dietaryFilters = [
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'spicy', label: 'Spicy' },
  { value: 'popular', label: 'Popular' },
];

function MenuBrowserInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialCategory = searchParams.get('category') || 'all';
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(initialCategory);
  const [dietary, setDietary] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>('popular');
  const [priceMax, setPriceMax] = useState(800);
  const [showFilters, setShowFilters] = useState(false);
  const [selected, setSelected] = useState<MenuItem | null>(null);

  const setCategoryAndUrl = useCallback(
    (cat: string) => {
      setCategory(cat);
      const params = new URLSearchParams(searchParams.toString());
      if (cat === 'all') params.delete('category');
      else params.set('category', cat);
      const q = params.toString();
      router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const toggleDietary = (val: string) => {
    setDietary((prev) =>
      prev.includes(val) ? prev.filter((d) => d !== val) : [...prev, val]
    );
  };

  const filtered = useMemo(() => {
    let items = [...menuItems];

    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.ingredients.some((ing) => ing.toLowerCase().includes(q))
      );
    }

    if (category !== 'all') {
      items = items.filter((i) =>
        i.category.includes(category as MenuCategory)
      );
    }

    if (dietary.includes('vegetarian')) {
      items = items.filter((i) => i.dietary.includes('vegetarian'));
    }
    if (dietary.includes('vegan')) {
      items = items.filter((i) => i.dietary.includes('vegan'));
    }
    if (dietary.includes('spicy')) {
      items = items.filter((i) => i.spiceLevel >= 2);
    }
    if (dietary.includes('popular')) {
      items = items.filter((i) => i.isPopular);
    }

    items = items.filter((i) => i.price <= priceMax);

    switch (sort) {
      case 'price-asc':
        items.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        items.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        items.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        items.sort(
          (a, b) =>
            (b.isPopular ? 1 : 0) + (b.isSignature ? 1 : 0) -
            ((a.isPopular ? 1 : 0) + (a.isSignature ? 1 : 0))
        );
    }

    return items;
  }, [search, category, dietary, sort, priceMax]);

  const clearFilters = () => {
    setSearch('');
    setCategoryAndUrl('all');
    setDietary([]);
    setSort('popular');
    setPriceMax(800);
  };

  const hasActive =
    search || category !== 'all' || dietary.length > 0 || priceMax < 800;

  return (
    <div>
      {/* Search + controls */}
      <div className="sticky top-[4.5rem] z-30 -mx-4 mb-8 border-b border-cream-300/80 bg-cream-50/95 px-4 py-4 backdrop-blur-md sm:mx-0 sm:rounded-3xl sm:border sm:px-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-soft" />
            <label htmlFor="menu-search" className="sr-only">
              Search dishes
            </label>
            <input
              id="menu-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search dishes, ingredients..."
              className="input-field !rounded-full !py-2.5 pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="input-field !w-auto !rounded-full !py-2.5 text-sm"
              aria-label="Sort menu"
            >
              <option value="popular">Popular</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="newest">Newest</option>
            </select>
            <button
              onClick={() => setShowFilters((s) => !s)}
              className={cn(
                'inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition',
                showFilters || hasActive
                  ? 'border-terracotta bg-terracotta-muted text-terracotta-dark'
                  : 'border-cream-300 bg-white text-charcoal-light hover:border-terracotta/40'
              )}
              aria-expanded={showFilters}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>
          </div>
        </div>

        {/* Category chips */}
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {filterCategories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategoryAndUrl(cat.value)}
              className={cn(
                'shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition sm:text-sm',
                category === cat.value
                  ? 'bg-charcoal text-cream-50'
                  : 'bg-beige text-charcoal-light hover:bg-beige-dark'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {showFilters && (
          <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-cream-300 bg-white/80 p-4 sm:flex-row sm:items-end">
            <div className="flex-1">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-charcoal-muted">
                Dietary
              </p>
              <div className="flex flex-wrap gap-2">
                {dietaryFilters.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => toggleDietary(f.value)}
                    className={cn(
                      'rounded-full px-3 py-1.5 text-xs font-medium transition',
                      dietary.includes(f.value)
                        ? 'bg-sage text-white'
                        : 'bg-beige text-charcoal-light hover:bg-beige-dark'
                    )}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="sm:w-48">
              <label
                htmlFor="price-range"
                className="mb-2 block text-xs font-medium uppercase tracking-wide text-charcoal-muted"
              >
                Max price: ₹{priceMax}
              </label>
              <input
                id="price-range"
                type="range"
                min={100}
                max={800}
                step={20}
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-terracotta"
              />
            </div>
            {hasActive && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-1 text-sm text-terracotta hover:underline"
              >
                <X className="h-3.5 w-3.5" /> Clear
              </button>
            )}
          </div>
        )}
      </div>

      <p className="mb-5 text-sm text-charcoal-muted">
        {filtered.length} dish{filtered.length !== 1 ? 'es' : ''}
      </p>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-cream-300 bg-beige-light/50 px-6 py-20 text-center">
          <p className="font-display text-2xl text-charcoal">
            Hmm... nothing delicious matched that search.
          </p>
          <p className="mt-2 text-sm text-charcoal-muted">
            Try a different filter or clear your search.
          </p>
          <button onClick={clearFilters} className="btn-primary mt-6">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((dish, i) => (
            <DishCard
              key={dish.id}
              dish={dish}
              index={i % 6}
              onOpen={setSelected}
            />
          ))}
        </div>
      )}

      <DishModal
        dish={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}

export function MenuBrowser() {
  return (
    <Suspense
      fallback={
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-96 animate-pulse rounded-3xl bg-beige"
            />
          ))}
        </div>
      }
    >
      <MenuBrowserInner />
    </Suspense>
  );
}
