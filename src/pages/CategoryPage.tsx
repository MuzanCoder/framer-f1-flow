import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { products, categories } from '@/data/mockData';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { ShoppingCart, Heart, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const addItem = useCartStore((state) => state.addItem);
  const { toast } = useToast();

  const category = categories.find(cat => cat.slug === slug);
  const categoryProducts = products.filter(product => product.category === slug);

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-rajdhani font-bold mb-4">Category Not Found</h1>
          <Link to="/">
            <Button className="btn-racing">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-muted/30 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
            <span className="text-muted-foreground">/</span>
            <span className="font-medium">{category.name}</span>
          </nav>
        </div>
      </div>

      {/* Category Header */}
      <section className="py-20 bg-hero-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-rajdhani font-bold mb-4">
            {category.name.toUpperCase()}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Premium racing apparel for champions who demand excellence
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-rajdhani font-semibold">
              {categoryProducts.length} Products
            </h2>
            <Link to="/products">
              <Button variant="outline">View All Products</Button>
            </Link>
          </div>

          {categoryProducts.length === 0 ? (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
                <h3 className="text-2xl font-rajdhani font-semibold mb-4">No products available</h3>
                <p className="text-muted-foreground mb-6">
                  Check back soon for new racing gear in this category.
                </p>
                <Link to="/products">
                  <Button className="btn-racing">Browse All Products</Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryProducts.map((product, index) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group speed-fade"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card className="card-racing overflow-hidden h-full">
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-rajdhani font-semibold text-lg">
                            OUT OF STOCK
                          </span>
                        </div>
                      )}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="rounded-full"
                          onClick={(e) => e.preventDefault()}
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="text-xl font-rajdhani font-semibold mb-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-rajdhani font-bold text-primary">
                          ${product.price}
                        </span>
                        <Button
                          className="btn-racing"
                          disabled={!product.inStock}
                          onClick={(e) => handleAddToCart(product, e)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;