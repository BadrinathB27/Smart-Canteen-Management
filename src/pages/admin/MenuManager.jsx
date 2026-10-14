import React, { useState } from 'react';
import { useCanteen } from '../../context/CanteenContext';
import { CATEGORIES } from '../../data/initialMenu';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  Search, 
  Clock, 
  DollarSign, 
  Sliders, 
  Image as ImageIcon,
  AlertTriangle 
} from 'lucide-react';

export const MenuManager = () => {
  const { menu, addMenuItem, updateMenuItem, deleteMenuItem, toggleAvailability } = useCanteen();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Modal State for Add / Edit
  const [modalMode, setModalMode] = useState(null); // 'add' | 'edit' | null
  const [editingItem, setEditingItem] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'Breakfast',
    price: '',
    prepTime: '',
    description: '',
    isVeg: true,
    isAvailable: true,
    dailyPrepared: 50,
    image: ''
  });

  const [formErrors, setFormErrors] = useState({});

  const handleOpenAdd = () => {
    setFormData({
      name: '',
      category: 'Breakfast',
      price: '',
      prepTime: '8',
      description: '',
      isVeg: true,
      isAvailable: true,
      dailyPrepared: 50,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80'
    });
    setFormErrors({});
    setModalMode('add');
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      price: item.price.toString(),
      prepTime: (item.prepTime || 8).toString(),
      description: item.description,
      isVeg: item.isVeg,
      isAvailable: item.isAvailable,
      dailyPrepared: (item.dailyPrepared || 50).toString(),
      image: item.image
    });
    setFormErrors({});
    setModalMode('edit');
  };

  const handleCloseModal = () => {
    setModalMode(null);
    setEditingItem(null);
    setFormErrors({});
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Food name is required';
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
      errs.price = 'Valid price is required';
    }
    if (!formData.prepTime || isNaN(formData.prepTime) || Number(formData.prepTime) <= 0) {
      errs.prepTime = 'Valid prep time in minutes is required';
    }
    if (!formData.description.trim()) errs.description = 'Description is required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }

    if (modalMode === 'add') {
      addMenuItem(formData);
    } else if (modalMode === 'edit' && editingItem) {
      updateMenuItem({
        ...editingItem,
        ...formData
      });
    }
    handleCloseModal();
  };

  const handleDelete = (item) => {
    if (window.confirm(`Are you sure you want to delete "${item.name}" from the menu?`)) {
      deleteMenuItem(item.id);
    }
  };

  // Filtered Menu
  const filteredItems = menu.filter((item) => {
    const matchesCat = categoryFilter === 'All' || item.category === categoryFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  return (
    <div className="animate-fade-in">
      {/* Top Action Bar */}
      <div
        style={{
          background: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          padding: '1.25rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '1.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}
      >
        <div style={{ display: 'flex', gap: '0.75rem', flex: 1, minWidth: '260px', flexWrap: 'wrap' }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
            <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search dishes to edit/manage..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '32px', fontSize: '0.85rem', width: '100%', borderRadius: '9999px' }}
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ borderRadius: '9999px', fontSize: '0.85rem', padding: '0.45rem 1rem' }}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'All' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>

        {/* Add Item Button */}
        <button
          onClick={handleOpenAdd}
          style={{
            background: '#f97316',
            color: 'white',
            padding: '0.55rem 1.25rem',
            borderRadius: '9999px',
            fontWeight: 700,
            fontSize: '0.88rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            boxShadow: '0 4px 10px rgba(249, 115, 22, 0.3)'
          }}
        >
          <Plus size={16} /> Add New Dish
        </button>
      </div>

      {/* Menu Management Table */}
      <div className="data-table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Dish</th>
              <th>Category</th>
              <th>Price</th>
              <th>Prep Time</th>
              <th>Daily Target</th>
              <th>Stock Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id}>
                {/* Dish info & thumb */}
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '44px', height: '44px', borderRadius: '8px', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.src =
                          'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80';
                      }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>{item.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        {item.isVeg ? '🌱 Veg' : '🍗 Non-Veg'} • {item.calories || 300} kcal
                      </div>
                    </div>
                  </div>
                </td>

                <td>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569' }}>
                    {item.category}
                  </span>
                </td>

                <td>
                  <strong style={{ color: '#0f172a' }}>₹{item.price}</strong>
                </td>

                <td>
                  <span style={{ fontSize: '0.82rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Clock size={12} /> {item.prepTime || 8}m
                  </span>
                </td>

                <td>
                  <span style={{ fontSize: '0.82rem', color: '#475569' }}>
                    {item.dailyPrepared || 50} units
                  </span>
                </td>

                {/* Stock Toggle Switch */}
                <td>
                  <button
                    onClick={() => toggleAvailability(item.id)}
                    style={{
                      background: item.isAvailable ? '#ecfdf5' : '#fef2f2',
                      color: item.isAvailable ? '#059669' : '#dc2626',
                      border: `1px solid ${item.isAvailable ? '#a7f3d0' : '#fecaca'}`,
                      padding: '0.3rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                    title="Click to toggle Available vs Out of Stock"
                  >
                    {item.isAvailable ? (
                      <>
                        <Check size={13} /> In Stock
                      </>
                    ) : (
                      <>
                        <X size={13} /> Out of Stock
                      </>
                    )}
                  </button>
                </td>

                {/* Edit & Delete Actions */}
                <td>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button
                      onClick={() => handleOpenEdit(item)}
                      style={{
                        background: '#f1f5f9',
                        color: '#334155',
                        padding: '0.35rem 0.65rem',
                        borderRadius: '6px',
                        fontSize: '0.78rem'
                      }}
                      title="Edit Item"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      style={{
                        background: '#fee2e2',
                        color: '#b91c1c',
                        padding: '0.35rem 0.65rem',
                        borderRadius: '6px',
                        fontSize: '0.78rem'
                      }}
                      title="Delete Item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Add / Edit Food Item */}
      {modalMode && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                {modalMode === 'add' ? 'Add New Food Item' : `Edit "${editingItem?.name}"`}
              </h3>
              <button className="close-btn" onClick={handleCloseModal}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-body">
              {/* Dish Name */}
              <div className="form-field">
                <label className="form-label">Dish Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Masala Dosa, Chicken Roll"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                {formErrors.name && <span className="form-error">{formErrors.name}</span>}
              </div>

              {/* Category & Diet */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-field">
                  <label className="form-label">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="Breakfast">Breakfast</option>
                    <option value="Meals">Meals</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Beverages">Beverages</option>
                  </select>
                </div>

                <div className="form-field">
                  <label className="form-label">Diet Type</label>
                  <select
                    value={formData.isVeg ? 'veg' : 'nonveg'}
                    onChange={(e) => setFormData({ ...formData, isVeg: e.target.value === 'veg' })}
                  >
                    <option value="veg">🌱 Vegetarian</option>
                    <option value="nonveg">🍗 Non-Vegetarian</option>
                  </select>
                </div>
              </div>

              {/* Price & Prep Time */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-field">
                  <label className="form-label">Price (₹) *</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="e.g. 60"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                  {formErrors.price && <span className="form-error">{formErrors.price}</span>}
                </div>

                <div className="form-field">
                  <label className="form-label">Prep Time (mins) *</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="e.g. 8"
                    value={formData.prepTime}
                    onChange={(e) => setFormData({ ...formData, prepTime: e.target.value })}
                  />
                  {formErrors.prepTime && <span className="form-error">{formErrors.prepTime}</span>}
                </div>
              </div>

              {/* Daily Prepared Target */}
              <div className="form-field">
                <label className="form-label">Daily Prepared Inventory (for Demand Analysis)</label>
                <input
                  type="number"
                  min="5"
                  value={formData.dailyPrepared}
                  onChange={(e) => setFormData({ ...formData, dailyPrepared: e.target.value })}
                />
              </div>

              {/* Image URL */}
              <div className="form-field">
                <label className="form-label">Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>

              {/* Description */}
              <div className="form-field">
                <label className="form-label">Description *</label>
                <textarea
                  rows="3"
                  placeholder="Appetizing description of ingredients and taste..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
                {formErrors.description && <span className="form-error">{formErrors.description}</span>}
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  style={{
                    background: '#f1f5f9',
                    color: '#475569',
                    padding: '0.6rem 1.25rem',
                    borderRadius: '8px',
                    fontWeight: 600
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    background: '#f97316',
                    color: 'white',
                    padding: '0.6rem 1.4rem',
                    borderRadius: '8px',
                    fontWeight: 700
                  }}
                >
                  {modalMode === 'add' ? 'Save & Add Item' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
