import { useState } from "react";
import Header from "@/components/Header";
import FooterNav from "@/components/FooterNav";
import ItemCard from "@/components/ItemCard";
import ItemModal from "@/components/ItemModal";
import ChatModal from "@/components/ChatModal";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { items, users, chats } from "@/data/mockData";
import type { Item } from "@/data/mockData";

const categories = ["All", "Electronics", "Books", "Sports", "Misc"] as const;

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showItemModal, setShowItemModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);

  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    setShowItemModal(true);
  };

  const handleRequestRent = () => {
    toast.success("Request sent successfully!");
    setShowItemModal(false);
  };

  const handleContactSeller = () => {
    setShowItemModal(false);
    setShowChatModal(true);
  };

  const handleSendMessage = () => {
    toast.success("Message sent!");
  };

  const selectedOwner = selectedItem ? users.find(u => u.id === selectedItem.ownerId) || null : null;
  const selectedChat = selectedItem ? chats.find(c => c.itemId === selectedItem.id) || chats[0] : null;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header onSearch={setSearchQuery} searchQuery={searchQuery} />

      <main className="container mx-auto px-4 py-6">
        {/* Search Bar for Mobile */}
        <div className="md:hidden mb-6">
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border bg-card"
          />
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

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No items found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} onClick={() => handleItemClick(item)} />
            ))}
          </div>
        )}
      </main>

      <FooterNav />

      <ItemModal
        item={selectedItem}
        owner={selectedOwner}
        isOpen={showItemModal}
        onClose={() => setShowItemModal(false)}
        onRequestRent={handleRequestRent}
        onContactSeller={handleContactSeller}
      />

      <ChatModal
        chat={selectedChat}
        owner={selectedOwner}
        isOpen={showChatModal}
        onClose={() => setShowChatModal(false)}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default Home;
