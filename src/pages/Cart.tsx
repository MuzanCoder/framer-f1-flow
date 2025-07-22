import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCartStore } from '@/store/cartStore';
import { Minus, Plus, X, ShoppingBag, ArrowLeft, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Cart = () => {
  const { items, updateQuantity, removeItem, getSubtotal, clearCart } = useCartStore();
  const { toast } = useToast();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
    if (newQuantity === 0) {
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart.",
      });
    }
  };

  const handleRemoveItem = (productId: string, productName: string) => {
    removeItem(productId);
    toast({
      title: "Item removed",
      description: `${productName} has been removed from your cart.`,
    });
  };

  const handleCheckout = () => {
    toast({
      title: "Checkout initiated",
      description: "Redirecting to checkout process...",
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <section className="bg-hero-gradient text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-rajdhani font-bold mb-4">
              YOUR CART
            </h1>
            <p className="text-xl text-white/90">
              Ready to gear up for the race?
            </p>
          </div>
        </section>

        {/* Empty Cart */}
        <section className="py-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-8" />
            <h2 className="text-3xl font-rajdhani font-bold mb-4">Your cart is empty</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Looks like you haven't added any racing gear to your cart yet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button className="btn-racing px-8 py-6">
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Start Shopping
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="px-8 py-6">
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-hero-gradient text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-rajdhani font-bold mb-4">
            YOUR CART
          </h1>
          <p className="text-xl text-white/90">
            {items.length} item{items.length !== 1 ? 's' : ''} ready for checkout
          </p>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-rajdhani font-semibold">Cart Items</h2>
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="text-destructive hover:text-destructive"
                >
                  Clear Cart
                </Button>
              </div>

              {items.map((item) => (
                <Card key={item.product.id} className="card-racing overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-6">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-grow space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <Link
                              to={`/product/${item.product.id}`}
                              className="text-lg font-rajdhani font-semibold hover:text-primary transition-colors"
                            >
                              {item.product.name}
                            </Link>
                            <p className="text-muted-foreground mt-1">
                              {item.product.description}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveItem(item.product.id, item.product.name)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Price and Quantity */}
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-rajdhani font-bold text-primary">
                            ${item.product.price}
                          </span>

                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-3">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-12 text-center font-medium text-lg">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Item Total */}
                        <div className="text-right">
                          <span className="text-lg font-rajdhani font-semibold">
                            Total: ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="card-racing sticky top-24">
                <CardContent className="p-6 space-y-6">
                  <h3 className="text-xl font-rajdhani font-semibold">Order Summary</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${getSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${(getSubtotal() * 0.08).toFixed(2)}</span>
                    </div>
                    <hr className="border-border" />
                    <div className="flex justify-between text-lg font-rajdhani font-bold">
                      <span>Total</span>
                      <span className="text-primary">
                        ${(getSubtotal() + getSubtotal() * 0.08).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button 
                      className="btn-racing w-full py-6 text-lg"
                      onClick={handleCheckout}
                    >
                      <CreditCard className="h-5 w-5 mr-2" />
                      Proceed to Checkout
                    </Button>
                    <Link to="/products">
                      <Button variant="outline" className="w-full py-6">
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>

                  <div className="text-center text-sm text-muted-foreground">
                    <p>🔒 Secure checkout with SSL encryption</p>
                    <p className="mt-2">Free shipping on orders over $100</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;