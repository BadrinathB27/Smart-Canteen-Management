import React, { useState, useMemo } from 'react';
import { useCanteen } from '../../context/CanteenContext';
import { FoodCard } from './FoodCard';
import { CATEGORIES } from '../../data/initialMenu';
import { Search, X, SlidersHorizontal, Leaf, Utensils } from 'lucide-react';

export const MenuSection = () => {
  const { menu } = useCanteen();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'price-asc' | 'price-desc' | 'prep-time'

  // Filter & Sort Logic
  const filteredMenu = useMemo(() => {
    return menu
      .filter((item) => {
        // Category check
        const matchesCategory =
          selectedCategory === 'All' || item.category === selectedCategory;

        // Search check
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query);

        // Veg filter
        const matchesVeg = !vegOnly || item.isVeg === true;

        return matchesCategory && matchesSearch && matchesVeg;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'prep-time') return (a.prepTime || 10) - (b.prepTime || 10);
        // Default: popularity by orderCount
        return (b.orderCount || 0) - (a.orderCount || 0);
      });
  }, [menu, selectedCategory, searchQuery, vegOnly, sortBy]);

  // Counts per category
  const categoryCounts = useMemo(() => {
    const counts = { All: menu.length };
    CATEGORIES.forEach((cat) => {
      if (cat !== 'All') {
        counts[cat] = menu.filter((item) => item.category === cat).length;
      }
    });
    return counts;
  }, [menu]);

  return (
    <section id="menu-section" className="animate-fade-in">
      {/* Controls Card: Search, Category Filters, Veg toggle, Sort */}
      <div className="menu-controls-card">
        <div className="search-and-sort">
          {/* Search Box */}
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search dishes (e.g. Dosa, Biryani, Chai, Burger)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search menu items"
            />
            {searchQuery && (
              <button
                className="search-clear-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Filters: Veg Only Toggle & Sort Dropdown */}
          <div className="filter-row">
            <button
              className={`veg-toggle-btn ${vegOnly ? 'active' : ''}`}
              onClick={() => setVegOnly(!vegOnly)}
              title="Show only Vegetarian dishes"
            >
              <Leaf size={14} color={vegOnly ? '#059669' : '#64748b'} />
              <span>Pure Veg Only</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <SlidersHorizontal size={14} color="#64748b" />
              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort dishes"
              >
                <option value="popular">Most Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="prep-time">Fastest Prep Time</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="category-pills-row" role="tablist">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                className={`category-pill ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
                <span className="category-count">
                  {categoryCounts[cat] || 0}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Menu Header with Results Count */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
          {selectedCategory === 'All' ? "Today's Complete Menu" : `${selectedCategory} Specials`}
        </h3>
        <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>
          Showing {filteredMenu.length} {filteredMenu.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* Food Cards Grid or Empty State */}
      {filteredMenu.length > 0 ? (
        <div className="food-grid">
          {filteredMenu.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div
          style={{
            background: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '3.5rem 1.5rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#fff7ed',
              color: '#f97316',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Utensils size={28} />
          </div>
          <h4 style={{ fontSize: '1.15rem', color: '#0f172a' }}>No dishes found matching your filter</h4>
          <p style={{ color: '#64748b', fontSize: '0.9rem', maxWidth: '400px' }}>
            Try clearing your search query or selecting a different category from above.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setVegOnly(false);
            }}
            style={{
              background: '#f97316',
              color: 'white',
              padding: '0.5rem 1.25rem',
              borderRadius: '9999px',
              fontWeight: 600,
              fontSize: '0.85rem'
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};
