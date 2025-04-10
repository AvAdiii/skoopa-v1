
import { useState, useEffect } from "react";
import { ArrowLeft, Home, MapPin, Plus, MoreVertical, Check, Edit, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Address {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

const MyAddresses = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });
  
  // Load addresses from localStorage
  useEffect(() => {
    const savedAddresses = localStorage.getItem("skoopa-addresses");
    if (savedAddresses) {
      try {
        setAddresses(JSON.parse(savedAddresses));
      } catch (error) {
        console.error("Error parsing addresses:", error);
      }
    } else {
      // Set default addresses if none exist
      const defaultAddresses = [
        {
          id: "1",
          name: "Home",
          address: "123 Greenview Apartments, 5th Cross",
          city: "Bengaluru",
          state: "Karnataka",
          pincode: "560001",
          isDefault: true
        },
        {
          id: "2",
          name: "Office",
          address: "456 Tech Park, Whitefield",
          city: "Bengaluru",
          state: "Karnataka",
          pincode: "560066",
          isDefault: false
        }
      ];
      setAddresses(defaultAddresses);
      localStorage.setItem("skoopa-addresses", JSON.stringify(defaultAddresses));
    }
  }, []);
  
  // Save addresses to localStorage
  const saveAddresses = (newAddresses: Address[]) => {
    localStorage.setItem("skoopa-addresses", JSON.stringify(newAddresses));
    setAddresses(newAddresses);
  };
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle adding a new address
  const handleAddAddress = () => {
    const { name, address, city, state, pincode } = formData;
    
    if (!name || !address || !city || !state || !pincode) {
      toast({
        title: "Missing information",
        description: "Please fill in all the fields",
        variant: "destructive"
      });
      return;
    }
    
    const newAddress: Address = {
      id: Date.now().toString(),
      name,
      address,
      city,
      state,
      pincode,
      isDefault: addresses.length === 0 // Make default if it's the first address
    };
    
    saveAddresses([...addresses, newAddress]);
    setShowAddDialog(false);
    resetForm();
    
    toast({
      title: "Address added",
      description: "Your new address has been added successfully",
    });
  };
  
  // Handle editing an address
  const handleEditAddress = () => {
    if (!currentAddress) return;
    
    const { name, address, city, state, pincode } = formData;
    
    if (!name || !address || !city || !state || !pincode) {
      toast({
        title: "Missing information",
        description: "Please fill in all the fields",
        variant: "destructive"
      });
      return;
    }
    
    const updatedAddresses = addresses.map(addr => {
      if (addr.id === currentAddress.id) {
        return {
          ...addr,
          name,
          address,
          city,
          state,
          pincode
        };
      }
      return addr;
    });
    
    saveAddresses(updatedAddresses);
    setShowEditDialog(false);
    resetForm();
    
    toast({
      title: "Address updated",
      description: "Your address has been updated successfully",
    });
  };
  
  // Handle deleting an address
  const handleDeleteAddress = (id: string) => {
    const addressToDelete = addresses.find(addr => addr.id === id);
    if (!addressToDelete) return;
    
    const updatedAddresses = addresses.filter(addr => addr.id !== id);
    
    // If we're deleting the default address, make the first remaining address the default
    if (addressToDelete.isDefault && updatedAddresses.length > 0) {
      updatedAddresses[0].isDefault = true;
    }
    
    saveAddresses(updatedAddresses);
    
    toast({
      title: "Address deleted",
      description: "Your address has been deleted successfully",
    });
  };
  
  // Handle setting an address as default
  const handleSetDefault = (id: string) => {
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    }));
    
    saveAddresses(updatedAddresses);
    
    toast({
      title: "Default address updated",
      description: "Your default address has been updated",
    });
  };
  
  // Reset the form
  const resetForm = () => {
    setFormData({
      name: "",
      address: "",
      city: "",
      state: "",
      pincode: ""
    });
    setCurrentAddress(null);
  };
  
  // Open edit dialog with address data
  const openEditDialog = (address: Address) => {
    setCurrentAddress(address);
    setFormData({
      name: address.name,
      address: address.address,
      city: address.city,
      state: address.state,
      pincode: address.pincode
    });
    setShowEditDialog(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white p-4 border-b border-smoke">
        <div className="flex items-center gap-3">
          <Link to="/profile" className="text-sapphire">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-lg font-bold text-sapphire">My Addresses</h1>
        </div>
      </div>
      
      <div className="p-4">
        {addresses.length > 0 ? (
          <div className="space-y-4">
            {addresses.map((address) => (
              <div 
                key={address.id}
                className={`bg-white rounded-xl border p-4 relative ${
                  address.isDefault ? "border-coral" : "border-smoke"
                }`}
              >
                {address.isDefault && (
                  <div className="absolute -top-2 -right-2 bg-coral text-white text-xs px-2 py-1 rounded-full">
                    Default
                  </div>
                )}
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-azure rounded-full flex items-center justify-center shrink-0 mr-3 text-sapphire">
                    {address.name === "Home" ? <Home size={20} /> : <MapPin size={20} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-bold text-charcoal">{address.name}</h3>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="w-8 h-8 flex items-center justify-center text-steel hover:bg-smoke/30 rounded-full">
                            <MoreVertical size={18} />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {!address.isDefault && (
                            <DropdownMenuItem onClick={() => handleSetDefault(address.id)}>
                              <Check className="mr-2" size={16} />
                              <span>Set as Default</span>
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => openEditDialog(address)}>
                            <Edit className="mr-2" size={16} />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-500"
                            onClick={() => handleDeleteAddress(address.id)}
                          >
                            <Trash className="mr-2" size={16} />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <p className="text-steel leading-tight mt-1">{address.address}</p>
                    <p className="text-steel leading-tight">{address.city}, {address.state} {address.pincode}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <div className="w-16 h-16 bg-smoke/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin size={30} className="text-steel" />
            </div>
            <h3 className="text-lg font-bold text-charcoal mb-1">No Addresses Found</h3>
            <p className="text-steel mb-6">Add an address to get started</p>
          </div>
        )}
        
        {/* Add Address Button */}
        <Button 
          className="w-full mt-6 bg-coral hover:bg-coral/90"
          onClick={() => setShowAddDialog(true)}
        >
          <Plus size={18} className="mr-2" />
          Add New Address
        </Button>
      </div>
      
      {/* Add Address Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Address</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">Address Name</Label>
              <Input 
                id="name" 
                name="name" 
                placeholder="Home, Office, etc."
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Street Address</Label>
              <Input 
                id="address" 
                name="address" 
                placeholder="Enter your street address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input 
                id="city" 
                name="city" 
                placeholder="Enter your city"
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input 
                  id="state" 
                  name="state" 
                  placeholder="Enter state"
                  value={formData.state}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pincode">Pincode</Label>
                <Input 
                  id="pincode" 
                  name="pincode" 
                  placeholder="Enter pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowAddDialog(false);
              resetForm();
            }}>
              Cancel
            </Button>
            <Button className="bg-coral hover:bg-coral/90" onClick={handleAddAddress}>
              Save Address
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Address Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Address</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Address Name</Label>
              <Input 
                id="edit-name" 
                name="name" 
                placeholder="Home, Office, etc."
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-address">Street Address</Label>
              <Input 
                id="edit-address" 
                name="address" 
                placeholder="Enter your street address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-city">City</Label>
              <Input 
                id="edit-city" 
                name="city" 
                placeholder="Enter your city"
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-state">State</Label>
                <Input 
                  id="edit-state" 
                  name="state" 
                  placeholder="Enter state"
                  value={formData.state}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-pincode">Pincode</Label>
                <Input 
                  id="edit-pincode" 
                  name="pincode" 
                  placeholder="Enter pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowEditDialog(false);
              resetForm();
            }}>
              Cancel
            </Button>
            <Button className="bg-coral hover:bg-coral/90" onClick={handleEditAddress}>
              Update Address
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyAddresses;
