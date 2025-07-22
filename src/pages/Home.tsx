import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { categories } from '@/data/mockData';
import heroImage from '@/assets/hero-f1.jpg';
import { ArrowRight, Zap, Shield, Trophy } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto speed-fade">
          <h1 className="text-6xl md:text-8xl font-rajdhani font-bold text-white mb-6 tracking-wider">
            SPEED
            <span className="block bg-racing-gradient bg-clip-text text-transparent">
              UNLEASHED
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-inter mb-8 max-w-2xl mx-auto">
            Premium F1-inspired streetwear for champions who live life in the fast lane
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button className="btn-racing px-8 py-6 text-lg">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/category/racing-tees">
              <Button variant="outline" className="px-8 py-6 text-lg border-white text-white hover:bg-white hover:text-black">
                Shop Racing Tees
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-rajdhani font-bold text-racing mb-4">
              ENGINEERED FOR CHAMPIONS
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every piece is crafted with the precision and performance that defines Formula 1
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-racing text-center p-8 speed-scale">
              <CardContent className="pt-6">
                <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-rajdhani font-semibold mb-2">Lightning Fast</h3>
                <p className="text-muted-foreground">Performance fabrics that move at the speed of racing</p>
              </CardContent>
            </Card>
            
            <Card className="card-racing text-center p-8 speed-scale">
              <CardContent className="pt-6">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-rajdhani font-semibold mb-2">Track Tested</h3>
                <p className="text-muted-foreground">Durability proven on the world's fastest circuits</p>
              </CardContent>
            </Card>
            
            <Card className="card-racing text-center p-8 speed-scale">
              <CardContent className="pt-6">
                <Trophy className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-rajdhani font-semibold mb-2">Championship Style</h3>
                <p className="text-muted-foreground">Designs inspired by podium-winning moments</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-rajdhani font-bold text-racing mb-4">
              RACE COLLECTION
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose your racing line
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                to={index === 0 ? `/category/${category.slug}` : '#'}
                className="group speed-fade"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className="card-racing overflow-hidden h-80">
                  <div className="relative h-full">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-2xl font-rajdhani font-bold text-white mb-2">
                        {category.name}
                      </h3>
                      {index === 0 && (
                        <Button className="btn-racing">
                          Shop Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      )}
                      {index !== 0 && (
                        <p className="text-white/70 font-inter">Coming Soon</p>
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-hero-gradient text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-rajdhani font-bold mb-6">
            JOIN THE GRID
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Get exclusive access to limited editions and race-day drops
          </p>
          <Link to="/signup">
            <Button className="btn-racing px-8 py-6 text-lg">
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;