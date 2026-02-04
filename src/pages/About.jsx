import React from 'react';
// import MainLayout from '../components/layout/MainLayout';
import { Award, Heart, Shield, Sparkles } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  const values = [
    {
      icon: Award,
      title: 'Exceptional Craftsmanship',
      description: 'Each piece is meticulously handcrafted by master artisans with decades of experience.'
    },
    {
      icon: Heart,
      title: 'Timeless Design',
      description: 'Our designs transcend trends, creating pieces that become cherished heirlooms.'
    },
    {
      icon: Shield,
      title: 'Ethical Sourcing',
      description: 'We source only conflict-free diamonds and responsibly mined precious metals.'
    },
    {
      icon: Sparkles,
      title: 'Uncompromising Quality',
      description: 'Every gemstone is hand-selected to meet our exacting standards of brilliance.'
    }
  ];

  return (
    <>
    <Navbar/>
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-primary-foreground/70 mb-4">
            Our Story
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-primary-foreground font-semibold mb-6">
            About SHINE WEAR
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Crafting timeless elegance since 1985
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80"
                alt="Jewelry craftsmanship"
                className="w-full h-[500px] object-cover rounded-lg shadow-xl"
              />
            </div>
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.3em] text-secondary">
                Our Heritage
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
                A Legacy of Excellence
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Founded in Beverly Hills in 1985, LUXE began as a small atelier dedicated to 
                creating bespoke jewelry for discerning clients. What started as a passion 
                project by master jeweler Alessandro Rossi has grown into an internationally 
                recognized house of fine jewelry.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, we continue to honor our founder's vision: to create jewelry that 
                transcends mere adornment and becomes a meaningful symbol of life's most 
                precious moments. Every piece that bears the LUXE name is a testament to 
                our unwavering commitment to excellence.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our master craftsmen combine centuries-old techniques with modern innovation, 
                ensuring each creation is both timeless and contemporary. From engagement rings 
                to statement necklaces, every LUXE piece is designed to be treasured for generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-secondary mb-4">
              What We Stand For
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
              Our Values
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="bg-card p-8 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <blockquote className="font-serif text-2xl md:text-3xl italic leading-relaxed mb-8">
            "True luxury is not about price—it's about the love, artistry, and meaning 
            woven into every creation."
          </blockquote>
          <p className="text-primary-foreground/70 uppercase tracking-widest text-sm">
            — Alessandro Rossi, Founder
          </p>
        </div>
      </section>
      <Footer/>
    </>
  );
}
