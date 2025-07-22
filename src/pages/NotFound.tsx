import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="text-9xl font-rajdhani font-bold text-primary mb-4">404</div>
        <h1 className="text-4xl font-rajdhani font-bold mb-4">Race Track Not Found</h1>
        <p className="text-xl text-muted-foreground mb-8">Looks like you took a wrong turn at the circuit</p>
        <a href="/" className="btn-racing px-8 py-4 inline-flex items-center">
          Return to Home Base
        </a>
      </div>
    </div>
  );
};

export default NotFound;
