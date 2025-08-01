import { UserInfoCard } from "@/components/UserinfoCard";
import { CodingStats } from "@/components/CodingStatus";
import { CollaboratorsCard } from "@/components/ColaboratoersCard";
import { ProjectsSection } from "@/components/ProjectSection";
import { ActivityFeed } from "@/components/ActivityFeed";
import { AchievementsBadges } from "@/components/AchivementBadge";

const Index = () => {
  return (
    <div className="min-h-screen bg-nuteral-900 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Developer Dashboard</h1>
          <p className="text-muted-foreground">Your coding journey at a glance</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <UserInfoCard />
            <CodingStats />
            <AchievementsBadges />
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            <ProjectsSection />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CollaboratorsCard />
              <ActivityFeed />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
