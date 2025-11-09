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
import { Plus, Trash2, Edit } from "lucide-react";
import { toast } from "sonner";
import { items, users, currentUser } from "@/data/mockData";
import type { Item } from "@/data/mockData";
import { z } from "zod";

// Input validation schema
const itemSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters").max(100, "Title must be less than 100 characters"),
  type: z.enum(["Rent", "Sell"], { required_error: "Please select a type" }),
  category: z.enum(["Electronics", "Books", "Sports", "Misc"], { required_error: "Please select a category" }),
  price: z.number().positive("Price must be positive").max(1000000, "Price seems too high"),
  condition: z.string().trim().min(3, "Condition must be at least 3 characters").max(100, "Condition must be less than 100 characters"),
  description: z.string().trim().min(10, "Description must be at least 10 characters").max(500, "Description must be less than 500 characters"),
  image: z.string().url("Please enter a valid URL").optional().or(z.literal(""))
});

const MyListings = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showItemModal, setShowItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    category: "",
    price: "",
    condition: "",
    description: "",
    image: ""
  });

  // Filter items owned by current user
  const myItems = items.filter(item => item.ownerId === currentUser.id);

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    setShowItemModal(true);
  };

  const handleEditItem = (item: Item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      type: item.type,
      category: item.category,
      price: item.price.toString(),
      condition: item.condition,
      description: item.description,
      image: item.image
    });
    setShowAddModal(true);
  };

  const handleDeleteItem = (itemId: number) => {
    toast.success("Listing deleted successfully!");
  };

  const handleSaveListing = () => {
    try {
      // Validate form data
      const validatedData = itemSchema.parse({
        title: formData.title,
        type: formData.type,
        category: formData.category,
        price: Number(formData.price),
        condition: formData.condition,
        description: formData.description,
        image: formData.image || "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=600&fit=crop"
      });

      if (editingItem) {
        toast.success("Listing updated successfully!");
      } else {
        toast.success("Listing added successfully!");
      }
      
      setShowAddModal(false);
      setEditingItem(null);
      
      // Reset form
      setFormData({
        title: "",
        type: "",
        category: "",
        price: "",
        condition: "",
        description: "",
        image: ""
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Failed to save listing");
      }
    }
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
              <div key={item.id} className="relative">
                <ItemCard item={item} onClick={() => handleItemClick(item)} />
                <div className="absolute top-3 left-3 flex gap-2 z-10">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditItem(item);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="h-8 w-8 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteItem(item.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <FooterNav />

      {/* Add/Edit Listing Modal */}
      <Dialog open={showAddModal} onOpenChange={(open) => {
        setShowAddModal(open);
        if (!open) {
          setEditingItem(null);
          setFormData({
            title: "",
            type: "",
            category: "",
            price: "",
            condition: "",
            description: "",
            image: ""
          });
        }
      }}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit Listing" : "Add New Listing"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Item Name</Label>
              <Input
                id="title"
                placeholder="Item name"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                maxLength={100}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {formData.title.length}/100 characters
              </p>
            </div>

            <div>
              <Label htmlFor="type">Listing Type</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
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
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
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
              <Input
                id="price"
                type="number"
                placeholder="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                min="0"
                max="1000000"
              />
            </div>

            <div>
              <Label htmlFor="condition">Condition</Label>
              <Input
                id="condition"
                placeholder="e.g., Excellent, Like new"
                value={formData.condition}
                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                maxLength={100}
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your item..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                maxLength={500}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {formData.description.length}/500 characters
              </p>
            </div>

            <div>
              <Label htmlFor="image">Image URL (optional)</Label>
              <Input
                id="image"
                placeholder="https://..."
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Leave blank to use default image
              </p>
            </div>

            <Button onClick={handleSaveListing} className="w-full">
              {editingItem ? "Update Listing" : "Add Listing"}
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
