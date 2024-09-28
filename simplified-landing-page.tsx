import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Menu, X, ArrowRight } from 'lucide-react'

export default function SimplifiedLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-yellow-400 text-black py-6 px-6 md:px-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">InnovateTech</h1>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="hover:text-yellow-600 transition-colors">Home</a>
            <a href="#" className="hover:text-yellow-600 transition-colors">Products</a>
            <a href="#" className="hover:text-yellow-600 transition-colors">Contact</a>
          </nav>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="bg-yellow-400 text-black py-4 px-6 md:hidden">
          <nav className="flex flex-col space-y-4">
            <a href="#" className="hover:text-yellow-600 transition-colors">Home</a>
            <a href="#" className="hover:text-yellow-600 transition-colors">Products</a>
            <a href="#" className="hover:text-yellow-600 transition-colors">Contact</a>
          </nav>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-yellow-400 text-black py-32 px-6 md:px-10">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">Innovate Your Future</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">Discover cutting-edge solutions that transform your business.</p>
          <Button className="bg-black text-yellow-400 hover:bg-yellow-600 hover:text-black transition-colors text-lg py-6 px-8">
            Get Started
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 md:px-10">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-16 text-center">Our Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Advanced AI", description: "Harness the power of artificial intelligence" },
              { title: "Cloud Integration", description: "Seamless cloud solutions for your business" },
              { title: "Secure Platform", description: "Top-notch security for your peace of mind" }
            ].map((feature, index) => (
              <Card key={index} className="bg-yellow-400 text-black">
                <CardHeader>
                  <CardTitle className="text-2xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-black/70">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 md:px-10 bg-yellow-400 text-black">
        <div className="container mx-auto text-center">
          <h3 className="text-4xl font-bold mb-8">Ready to Innovate?</h3>
          <p className="text-xl mb-12 max-w-2xl mx-auto">Join thousands of businesses already using our solutions.</p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="max-w-xs bg-black text-yellow-400 placeholder-yellow-400/50"
            />
            <Button className="bg-black text-yellow-400 hover:bg-yellow-600 hover:text-black transition-colors">
              Get Started
              <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-yellow-400 text-black py-12 px-6 md:px-10">
        <div className="container mx-auto text-center">
          <nav className="flex justify-center space-x-8 mb-8">
            <a href="#" className="hover:text-yellow-600 transition-colors">About</a>
            <a href="#" className="hover:text-yellow-600 transition-colors">Products</a>
            <a href="#" className="hover:text-yellow-600 transition-colors">Support</a>
          </nav>
          <p>&copy; 2023 InnovateTech. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}