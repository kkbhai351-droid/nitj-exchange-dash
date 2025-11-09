import { useState } from "react";
import Header from "@/components/Header";
import FooterNav from "@/components/FooterNav";
import ItemCard from "@/components/ItemCard";
import ItemModal from "@/components/ItemModal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { items, users, currentUser } from "@/data/mockData";
import type { Item } from "@/data/mockData";

const MyListings = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showItemModal, setShowItemModal] = useState(false);

  // Filter items owned by current user
  const myItems = items.filter(item => item.ownerId === currentUser.id);

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    setShowItemModal(true);
  };

  const handleAddListing = () => {
    toast.success("Listing added successfully!");
    setShowAddModal(false);
  };

  const selectedOwner = selectedItem ? users.find(u => u.id === selectedItem.ownerId) || null : null;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />

      <main className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Listings</h1>
            <p className="text-muted-foreground">
              {myItems.length} {myItems.length === 1 ? 'item' : 'items'} listed
            </p>
          </div>
          <Button onClick={() => setShowAddModal(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Listing
          </Button>
        </div>

        {myItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg mb-4">You haven't listed any items yet</p>
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Listing
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myItems.map((item) => (
              <ItemCard key={item.id} item={item} onClick={() => handleItemClick(item)} />
            ))}
          </div>
        )}
      </main>

      <FooterNav />

      {/* Add Listing Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Listing</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Item name" />
            </div>

            <div>
              <Label htmlFor="type">Type</Label>
              <Select>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rent">Rent</SelectItem>
                  <SelectItem value="sell">Sell</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="books">Books</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="misc">Misc</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="price">Price (₹)</Label>
              <Input id="price" type="number" placeholder="0" />
            </div>

            <div>
              <Label htmlFor="condition">Condition</Label>
              <Input id="condition" placeholder="e.g., Excellent, Like new" />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Describe your item..." rows={3} />
            </div>

            <div>
              <Label htmlFor="image">Image URL</Label>
              <Input id="image" placeholder="https://..." />
            </div>

            <Button onClick={handleAddListing} className="w-full">
              Add Listing
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <ItemModal
        item={selectedItem}
        owner={selectedOwner}
        isOpen={showItemModal}
        onClose={() => setShowItemModal(false)}
        onRequestRent={() => {}}
        onContactSeller={() => {}}
      />
    </div>
  );
};

export default MyListings;
