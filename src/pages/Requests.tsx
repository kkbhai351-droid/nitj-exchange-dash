import { useState } from "react";
import Header from "@/components/Header";
import FooterNav from "@/components/FooterNav";
import RequestCard from "@/components/RequestCard";
import RequestModal from "@/components/RequestModal";
import ChatModal from "@/components/ChatModal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { requests, users, chats, currentUser } from "@/data/mockData";
import type { Request } from "@/data/mockData";
import { z } from "zod";

const categories = ["All", "Electronics", "Books", "Sports", "Misc"] as const;

// Input validation schema
const requestSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters").max(100, "Title must be less than 100 characters"),
  type: z.enum(["Buy", "Rent"], { required_error: "Please select a type" }),
  category: z.enum(["Electronics", "Books", "Sports", "Misc"], { required_error: "Please select a category" }),
  maxPrice: z.number().positive("Price must be positive").max(1000000, "Price seems too high"),
  description: z.string().trim().min(10, "Description must be at least 10 characters").max(500, "Description must be less than 500 characters")
});

const Requests = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    category: "",
    maxPrice: "",
    description: ""
  });

  const filteredRequests = requests.filter((request) => {
    const matchesCategory = selectedCategory === "All" || request.category === selectedCategory;
    const matchesSearch = request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleRequestClick = (request: Request) => {
    setSelectedRequest(request);
    setShowRequestModal(true);
  };

  const handleAddRequest = () => {
    try {
      // Validate form data
      const validatedData = requestSchema.parse({
        title: formData.title,
        type: formData.type,
        category: formData.category,
        maxPrice: Number(formData.maxPrice),
        description: formData.description
      });

      toast.success("Request posted successfully!");
      setShowAddModal(false);
      
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
        toast.error("Failed to create request");
      }
    }
  };

  const handleRespond = () => {
    toast.success("Response sent! The requester will contact you soon.");
    setShowRequestModal(false);
  };

  const handleContact = () => {
    setShowRequestModal(false);
    setShowChatModal(true);
  };

  const handleSendMessage = () => {
    toast.success("Message sent!");
  };

  const selectedRequester = selectedRequest ? users.find(u => u.id === selectedRequest.requesterId) || null : null;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header onSearch={setSearchQuery} searchQuery={searchQuery} />

      <main className="container mx-auto px-4 py-6">
        {/* Search Bar for Mobile */}
        <div className="md:hidden mb-6">
          <input
            type="text"
            placeholder="Search requests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border bg-card"
          />
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Student Requests</h1>
            <p className="text-muted-foreground">
              Help fellow students find what they need
            </p>
          </div>
          <Button onClick={() => setShowAddModal(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Post Request</span>
            <span className="sm:hidden">Post</span>
          </Button>
        </div>

        {/* Category Tabs */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-2 min-w-max pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Requests Grid */}
        {filteredRequests.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No requests found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRequests.map((request) => {
              const requester = users.find(u => u.id === request.requesterId);
              if (!requester) return null;
              return (
                <RequestCard
                  key={request.id}
                  request={request}
                  requester={requester}
                  onClick={() => handleRequestClick(request)}
                />
              );
            })}
          </div>
        )}
      </main>

      <FooterNav />

      {/* Add Request Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Post a Request</DialogTitle>
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

            <Button onClick={handleAddRequest} className="w-full">
              Post Request
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <RequestModal
        request={selectedRequest}
        requester={selectedRequester}
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        onRespond={handleRespond}
        onContact={handleContact}
      />

      <ChatModal
        chat={chats[0]}
        owner={selectedRequester}
        isOpen={showChatModal}
        onClose={() => setShowChatModal(false)}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default Requests;
