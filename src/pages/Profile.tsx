import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import FooterNav from "@/components/FooterNav";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Star, Mail, Edit, Award, Package, MessageSquare, ChevronRight } from "lucide-react";
import { currentUser, items, requests } from "@/data/mockData";

const Profile = () => {
  const navigate = useNavigate();
  const myItems = items.filter(item => item.ownerId === currentUser.id);
  const myRequests = requests.filter(request => request.requesterId === currentUser.id);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center mb-6">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback className="text-2xl">{currentUser.name[0]}</AvatarFallback>
              </Avatar>

              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl font-bold">{currentUser.name}</h1>
                {currentUser.verified && (
                  <ShieldCheck className="h-6 w-6 text-primary" />
                )}
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <p className="text-muted-foreground">{currentUser.email}</p>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1 bg-secondary/10 px-3 py-1 rounded-full">
                  <Star className="h-5 w-5 fill-secondary text-secondary" />
                  <span className="font-semibold text-lg">{currentUser.rating}</span>
                  <span className="text-muted-foreground text-sm ml-1">rating</span>
                </div>
              </div>

              <div className="flex gap-3 w-full max-w-sm">
                <Button className="flex-1 gap-2">
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <Award className="h-4 w-4" />
                  View Ratings
                </Button>
              </div>
            </div>

            <div className="border-t pt-6 space-y-4">
              <h2 className="font-semibold text-lg mb-3">Account Status</h2>
              
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Verification Status</p>
                    <p className="text-sm text-muted-foreground">NITJ Email Verified</p>
                  </div>
                </div>
                <Badge variant="default">Verified</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary">{myItems.length}</p>
                  <p className="text-sm text-muted-foreground">Active Listings</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-secondary">{Math.floor(currentUser.rating * 10)}</p>
                  <p className="text-sm text-muted-foreground">Total Reviews</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6 mt-6">
              <h2 className="font-semibold text-lg mb-3">My Activity</h2>
              
              <div className="space-y-2">
                <button
                  onClick={() => navigate("/my-listings")}
                  className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">My Listings</p>
                      <p className="text-sm text-muted-foreground">{myItems.length} active items</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>

                <button
                  onClick={() => navigate("/my-requests")}
                  className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-secondary" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">My Requests</p>
                      <p className="text-sm text-muted-foreground">{myRequests.length} active requests</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>
            </div>

            <div className="border-t pt-6 mt-6">
              <h2 className="font-semibold text-lg mb-3">Recent Activity</h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm">Listed: DSLR Camera</p>
                  <Badge variant="outline">2 days ago</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm">Rented: Data Structures Book</p>
                  <Badge variant="outline">5 days ago</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <FooterNav />
    </div>
  );
};

export default Profile;
