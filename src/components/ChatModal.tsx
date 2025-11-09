import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import type { Chat, User } from "@/data/mockData";

interface ChatModalProps {
  chat: Chat | null;
  owner: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSendMessage: () => void;
}

const ChatModal = ({ chat, owner, isOpen, onClose, onSendMessage }: ChatModalProps) => {
  if (!chat || !owner) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={owner.avatar} alt={owner.name} />
              <AvatarFallback>{owner.name[0]}</AvatarFallback>
            </Avatar>
            {owner.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="h-64 overflow-y-auto space-y-3 p-4 bg-muted/30 rounded-lg">
            {chat.messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.from === "You" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    message.from === "You"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.from === "You" ? "text-primary-foreground/70" : "text-muted-foreground"
                  }`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Input placeholder="Type a message..." />
            <Button onClick={onSendMessage} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatModal;
