import { useState } from "react";
import Header from "@/components/Header";
import FooterNav from "@/components/FooterNav";
import RequestCard from "@/components/RequestCard";
import RequestModal from "@/components/RequestModal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Edit } from "lucide-react";
import { toast } from "sonner";
import { requests, users, currentUser } from "@/data/mockData";
import type { Request } from "@/data/mockData";
import { z } from "zod";

// Input validation schema
const requestSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters").max(100, "Title must be less than 100 characters"),
  type: z.enum(["Buy", "Rent"], { required_error: "Please select a type" }),
  category: z.enum(["Electronics", "Books", "Sports", "Misc"], { required_error: "Please select a category" }),
  maxPrice: z.number().positive("Price must be positive").max(1000000, "Price seems too high"),
  description: z.string().trim().min(10, "Description must be at least 10 characters").max(500, "Description must be less than 500 characters")
});

const MyRequests = () => {
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRequest, setEditingRequest] = useState<Request | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    category: "",
    maxPrice: "",
    description: ""
  });

  // Filter requests posted by current user
  const myRequests = requests.filter(request => request.requesterId === currentUser.id);

  const handleRequestClick = (request: Request) => {
    setSelectedRequest(request);
    setShowRequestModal(true);
  };

  const handleEditRequest = (request: Request) => {
    setEditingRequest(request);
    setFormData({
      title: request.title,
      type: request.type,
      category: request.category,
      maxPrice: request.maxPrice.toString(),
      description: request.description
    });
    setShowAddModal(true);
  };

  const handleDeleteRequest = (requestId: number) => {
    toast.success("Request deleted successfully!");
  };

  const handleSaveRequest = () => {
    try {
      // Validate form data
      const validatedData = requestSchema.parse({
        title: formData.title,
        type: formData.type,
        category: formData.category,
        maxPrice: Number(formData.maxPrice),
        description: formData.description
      });

      if (editingRequest) {
        toast.success("Request updated successfully!");
      } else {
        toast.success("Request posted successfully!");
      }
      
      setShowAddModal(false);
      setEditingRequest(null);
      
      // Reset form
      setFormData({
        title: "",
        type: "",
        category: "",
        maxPrice: "",
        description: ""
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Failed to save request");
      }
    }
  };

  const selectedRequester = selectedRequest ? users.find(u => u.id === selectedRequest.requesterId) || null : null;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />

      <main className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Requests</h1>
            <p className="text-muted-foreground">
              {myRequests.length} {myRequests.length === 1 ? 'request' : 'requests'} posted
            </p>
          </div>
          <Button onClick={() => setShowAddModal(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            New Request
          </Button>
        </div>

        {myRequests.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg mb-4">You haven't posted any requests yet</p>
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Post Your First Request
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myRequests.map((request) => {
              const requester = users.find(u => u.id === request.requesterId);
              if (!requester) return null;
              return (
                <div key={request.id} className="relative">
                  <RequestCard
                    request={request}
                    requester={requester}
                    onClick={() => handleRequestClick(request)}
                  />
                  <div className="absolute top-3 left-3 flex gap-2 z-10">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 w-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditRequest(request);
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
                        handleDeleteRequest(request.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <FooterNav />

      {/* Add/Edit Request Modal */}
      <Dialog open={showAddModal} onOpenChange={(open) => {
        setShowAddModal(open);
        if (!open) {
          setEditingRequest(null);
          setFormData({
            title: "",
            type: "",
            category: "",
            maxPrice: "",
            description: ""
          });
        }
      }}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingRequest ? "Edit Request" : "Post a Request"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="title">What are you looking for?</Label>
              <Input
                id="title"
                placeholder="e.g., MacBook Pro, Physics Textbook"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                maxLength={100}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {formData.title.length}/100 characters
              </p>
            </div>

            <div>
              <Label htmlFor="type">Type</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Buy">Looking to Buy</SelectItem>
                  <SelectItem value="Rent">Looking to Rent</SelectItem>
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
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Books">Books</SelectItem>
                  <SelectItem value="Sports">Sports</SelectItem>
                  <SelectItem value="Misc">Misc</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="maxPrice">Maximum Budget (₹)</Label>
              <Input
                id="maxPrice"
                type="number"
                placeholder="0"
                value={formData.maxPrice}
                onChange={(e) => setFormData({ ...formData, maxPrice: e.target.value })}
                min="0"
                max="1000000"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what you need in detail..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                maxLength={500}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {formData.description.length}/500 characters
              </p>
            </div>

            <Button onClick={handleSaveRequest} className="w-full">
              {editingRequest ? "Update Request" : "Post Request"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <RequestModal
        request={selectedRequest}
        requester={selectedRequester}
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        onRespond={() => {}}
        onContact={() => {}}
      />
    </div>
  );
};

export default MyRequests;
