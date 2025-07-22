import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { products } from '@/data/mockData';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { ArrowLeft, ShoppingCart, Search, Heart, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSize, setSelectedSize] = useState('M');
  const addItem = useCartStore((state) => state.addItem);
  const { toast } = useToast();

  const product = products.find(p => p.id === id);

  // Search functionality within the page
  const searchResults = products.filter(p => 
    p.id !== id && (
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
      toast({
        title: "Added to cart!",
        description: `${product.name} has been added to your cart.`,
      });
    }
  };

  const handleRelatedProductCart = (relatedProduct: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(relatedProduct);
    toast({
      title: "Added to cart!",
      description: `${relatedProduct.name} has been added to your cart.`,
    });
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-rajdhani font-bold mb-4">Product Not Found</h1>
          <Link to="/products">
            <Button className="btn-racing">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
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
            <Link to="/products" className="text-muted-foreground hover:text-primary">Products</Link>
            <span className="text-muted-foreground">/</span>
            <span className="font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-rajdhani font-bold mb-4">{product.name}</h1>
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-4xl font-rajdhani font-bold text-primary">
                    ${product.price}
                  </span>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">(4.8)</span>
                  </div>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="text-lg font-rajdhani font-semibold mb-4">Size</h3>
                <div className="flex space-x-3">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 border-2 rounded-lg font-medium transition-colors ${
                        selectedSize === size
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border hover:border-primary'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart */}
              <div className="space-y-4">
                <Button
                  className="btn-racing w-full py-6 text-lg"
                  disabled={!product.inStock}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
                
                <Button variant="outline" className="w-full py-6">
                  <Heart className="h-5 w-5 mr-2" />
                  Add to Wishlist
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t">
                <div className="text-center">
                  <Truck className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Free Shipping</p>
                  <p className="text-xs text-muted-foreground">Orders over $100</p>
                </div>
                <div className="text-center">
                  <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">1 Year Warranty</p>
                  <p className="text-xs text-muted-foreground">Quality guaranteed</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Easy Returns</p>
                  <p className="text-xs text-muted-foreground">30-day policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-rajdhani font-bold mb-4">Find More Racing Gear</h2>
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-6 text-lg"
              />
            </div>
          </div>

          {searchQuery && (
            <div className="mb-8">
              <h3 className="text-xl font-rajdhani font-semibold mb-6">
                {searchResults.length === 0 
                  ? `No results found for "${searchQuery}"` 
                  : `Search Results for "${searchQuery}" (${searchResults.length})`}
              </h3>
              
              {searchResults.length === 0 ? (
                <div className="text-center py-12">
                  <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    No products match your search. Try a different term.
                  </p>
                  <Button onClick={() => setSearchQuery('')} variant="outline">
                    Clear Search
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.slice(0, 6).map((searchProduct) => (
                    <Link
                      key={searchProduct.id}
                      to={`/product/${searchProduct.id}`}
                      className="group"
                    >
                      <Card className="card-racing overflow-hidden">
                        <div className="relative aspect-square overflow-hidden">
                          <img
                            src={searchProduct.image}
                            alt={searchProduct.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h4 className="font-rajdhani font-semibold mb-2 group-hover:text-primary transition-colors">
                            {searchProduct.name}
                          </h4>
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-rajdhani font-bold text-primary">
                              ${searchProduct.price}
                            </span>
                            <Button
                              size="sm"
                              className="btn-racing"
                              disabled={!searchProduct.inStock}
                              onClick={(e) => handleRelatedProductCart(searchProduct, e)}
                            >
                              Add
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {!searchQuery && (
            <div>
              <h3 className="text-xl font-rajdhani font-semibold mb-6">You Might Also Like</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.filter(p => p.id !== id).slice(0, 3).map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    to={`/product/${relatedProduct.id}`}
                    className="group"
                  >
                    <Card className="card-racing overflow-hidden">
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-rajdhani font-semibold mb-2 group-hover:text-primary transition-colors">
                          {relatedProduct.name}
                        </h4>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-rajdhani font-bold text-primary">
                            ${relatedProduct.price}
                          </span>
                          <Button
                            size="sm"
                            className="btn-racing"
                            disabled={!relatedProduct.inStock}
                            onClick={(e) => handleRelatedProductCart(relatedProduct, e)}
                          >
                            Add
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductPage;