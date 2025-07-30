import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSideBar";
import { StatsCards } from "@/components/dashboard/StatusCards";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { RecentFiles } from "@/components/dashboard/RecentFiles";
import { TeamSection } from "@/components/dashboard/TeamSection";

const MainDashboard = () => {
  return (
    <div className="min-h-screen bg-nuteral-900 ">
      <div className="flex">
        <DashboardSidebar />
        
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          
          <main className="flex-1 p-6 space-y-6 overflow-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                  Welcome back! Here's what's happening with your projects.
                </p>
              </div>
              <div className="text-sm text-muted-foreground">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>

            <StatsCards />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <ActivityFeed />
              </div>
              
              <div className="space-y-6">
                <TeamSection />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
