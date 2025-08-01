import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MapPin, Clock, Globe } from "lucide-react";
import profileAvatar from "@/assets/profile-avatar.jpg";
import Image from "next/image";
export function UserInfoCard() {
  return (
    <Card className="p-6 border-gray-700 bg-neutral-900">
      <div className="flex items-start gap-4">
        <div className="relative">
          <Image
            src={profileAvatar}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-600 rounded-full border-2 border-card"></div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-xl font-bold text-white">Alex Johnson</h2>
            <Badge variant="secondary" className="text-xs">@alexj</Badge>
          </div>
          
          <p className="text-gray-400 mb-3 text-sm">
            Full-Stack Dev | Loves React & Rust | Building the future one commit at a time
          </p>
          
          <div className="flex flex-wrap gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>San Francisco, CA</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>PST (UTC-8)</span>
            </div>
            <div className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              <span className="text-green-600">Online</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
