import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Menu, X, MapPin, Bed, Bath, Square } from 'lucide-react'

// Mock data for property listings
const propertyListings = [
  {
    id: 1,
    title: "Cozy Downtown Apartment",
    image: "/placeholder.svg?height=200&width=300",
    price: "$1,200/month",
    beds: 1,
    baths: 1,
    sqft: 650,
    address: "123 Main St, Cityville, State 12345"
  },
  {
    id: 2,
    title: "Spacious Family Home",
    image: "/placeholder.svg?height=200&width=300",
    price: "$350,000",
    beds: 3,
    baths: 2,
    sqft: 1800,
    address: "456 Oak Ave, Suburbia, State 67890"
  },
  {
    id: 3,
    title: "Modern City Loft",
    image: "/placeholder.svg?height=200&width=300",
    price: "$2,500/month",
    beds: 2,
    baths: 2,
    sqft: 1200,
    address: "789 High St, Metropolis, State 54321"
  }
]

export default function PropertyListings() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-yellow-400 text-black py-4 px-6 md:px-10 sticky top-0 z-10 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">InnovateTech Realty</h1>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-yellow-600 transition-colors">Home</a>
            <a href="#" className="hover:text-yellow-600 transition-colors">Listings</a>
            <a href="#" className="hover:text-yellow-600 transition-colors">About</a>
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
            <a href="#" className="hover:text-yellow-600 transition-colors">Listings</a>
            <a href="#" className="hover:text-yellow-600 transition-colors">About</a>
            <a href="#" className="hover:text-yellow-600 transition-colors">Contact</a>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4">
        <h2 className="text-3xl font-bold mb-6">Property Listings</h2>
        
        {/* Search Bar */}
        <div className="mb-8">
          <Input 
            type="text" 
            placeholder="Search properties..." 
            className="w-full md:w-1/2 lg:w-1/3"
          />
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {propertyListings.map(property => (
            <Card key={property.id} className="overflow-hidden">
              <img 
                src={property.image} 
                alt={property.title} 
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <CardTitle>{property.title}</CardTitle>
                <p className="text-2xl font-bold text-yellow-600">{property.price}</p>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span className="flex items-center"><Bed size={16} className="mr-1" /> {property.beds} bed</span>
                  <span className="flex items-center"><Bath size={16} className="mr-1" /> {property.baths} bath</span>
                  <span className="flex items-center"><Square size={16} className="mr-1" /> {property.sqft} sqft</span>
                </div>
                <p className="text-sm text-gray-600 flex items-start">
                  <MapPin size={16} className="mr-1 mt-1 flex-shrink-0" />
                  {property.address}
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 px-6 md:px-10 mt-12">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 InnovateTech Realty. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}