import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <span className="text-xl font-semibold tracking-[0.3em] text-secondary">
                SHINE
              </span>
              <span className="text-xl font-light tracking-[0.2em] ml-1">
               WEARS
              </span>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed">
              Crafting timeless elegance since 1985. Each piece tells a story of artistry and sophistication.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm tracking-widest uppercase mb-6 text-secondary">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {['Shop', 'Categories', 'About Us'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Shop' ? '/shop' : item === 'Categories' ? '/categories' : item === 'About Us' ? '/about':'#'}
                    className="text-background/70 hover:text-secondary transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-sm tracking-widest uppercase mb-6 text-secondary">
              Collections
            </h4>
            <ul className="space-y-3">
              {['Rings', 'Bracelets', 'Earrings', 'Necklaces'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/category/${item.toLowerCase()}`}
                    className="text-background/70 hover:text-secondary transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm tracking-widest uppercase mb-6 text-secondary">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li>123 Luxury Avenue</li>
              <li>New York, NY 10001</li>
              <li className="pt-2">contact@luxejewels.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-background/50 text-sm">
            © 2024 Luxe Jewels. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-background/50 hover:text-secondary transition-colors text-sm">
              <Instagram size={20}/>
            </a>
            <a href="#" className="text-background/50 hover:text-secondary transition-colors text-sm">
              <Facebook size={20}/>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
