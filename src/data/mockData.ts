import { Product, Category } from '@/types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Racing Tees',
    slug: 'racing-tees',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop'
  },
  {
    id: '2',
    name: 'Speed Jackets',
    slug: 'speed-jackets',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop'
  },
  {
    id: '3',
    name: 'Racing Caps',
    slug: 'racing-caps',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop'
  },
  {
    id: '4',
    name: 'F1 Accessories',
    slug: 'f1-accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop'
  },
  {
    id: '5',
    name: 'Limited Edition',
    slug: 'limited-edition',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=400&fit=crop'
  }
];

export const products: Product[] = [
  // Racing Tees
  {
    id: '1',
    name: 'Monaco Grand Prix Tee',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    category: 'racing-tees',
    description: 'Premium cotton racing tee inspired by the legendary Monaco circuit',
    inStock: true
  },
  {
    id: '2',
    name: 'Silverstone Racing Shirt',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=500&fit=crop',
    category: 'racing-tees',
    description: 'Moisture-wicking performance tee with iconic Silverstone branding',
    inStock: true
  },
  {
    id: '3',
    name: 'Speed Demon Vintage Tee',
    price: 94.99,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=500&fit=crop',
    category: 'racing-tees',
    description: 'Vintage-inspired racing tee with distressed F1 graphics',
    inStock: true
  },
  {
    id: '4',
    name: 'Circuit Champion Tee',
    price: 84.99,
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&h=500&fit=crop',
    category: 'racing-tees',
    description: 'Championship-winning design celebrating F1 heritage',
    inStock: false
  },
  {
    id: '5',
    name: 'Podium Performance Tee',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1583743089695-4b816a340f82?w=500&h=500&fit=crop',
    category: 'racing-tees',
    description: 'Limited edition podium celebration tee',
    inStock: true
  },
  {
    id: '6',
    name: 'Track Day Essential',
    price: 74.99,
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&h=500&fit=crop',
    category: 'racing-tees',
    description: 'Essential racing tee for track enthusiasts',
    inStock: true
  }
];