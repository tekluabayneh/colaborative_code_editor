import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, Circle } from "lucide-react";
import { format } from "date-fns";

export default function CollaboratorSidebar({ collaborators }) {
  const onlineCollaborators = collaborators.filter((c) => c.isOnline);
  const offlineCollaborators = collaborators.filter((c) => !c.isOnline);

  return (
    <div className="w-80 border-l border-gray-800 bg-gray-950/50 backdrop-blur-sm flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-gray-400" />
          <h2 className="text-lg font-semibold text-white">Team</h2>
          <Badge
            variant="outline"
            className="border-gray-600 text-gray-300 ml-auto"
          >
            {collaborators.length}
          </Badge>
        </div>

        <div className="text-sm text-gray-400">
          <span className="text-green-400 font-medium">
            {onlineCollaborators.length}
          </span>{" "}
          online •
          <span className="text-gray-500 font-medium ml-1">
            {offlineCollaborators.length}
          </span>{" "}
          offline
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {/* Online Collaborators */}
        {onlineCollaborators.length > 0 && (
          <div className="p-6">
            <h3 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">
              Online Now
            </h3>
            <div className="space-y-3">
              {onlineCollaborators.map((collaborator, index: number) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors cursor-pointer"
                >
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={collaborator.avatar} />
                      <AvatarFallback>{collaborator.name}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-gray-950 rounded-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">
                      {collaborator.name}
                    </p>
                    <p className="text-gray-400 text-sm">Active now</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Offline Collaborators */}
        {offlineCollaborators.length > 0 && (
          <div className="p-6 pt-0">
            <h3 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">
              Recently Active
            </h3>
            <div className="space-y-3">
              {offlineCollaborators.map((collaborator, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/30 transition-colors cursor-pointer"
                >
                  <div className="relative">
                    <Avatar className="w-10 h-10 opacity-70">
                      <AvatarImage src={collaborator.avatar} />
                      <AvatarFallback>{collaborator.name}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-gray-600 border-2 border-gray-950 rounded-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-300 font-medium truncate">
                      {collaborator.name}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {format(
                        new Date(collaborator.lastActive),
                        "MMM d, h:mm a"
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {collaborators.length === 0 && (
          <div className="p-6 text-center">
            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-gray-400 text-sm">No collaborators yet</p>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="p-6 border-t border-gray-800">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">
              {onlineCollaborators.length}
            </div>
            <div className="text-xs text-gray-400">Active Now</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">
              {collaborators.length}
            </div>
            <div className="text-xs text-gray-400">Total Team</div>
          </div>
        </div>
      </div>
    </div>
  );
}
