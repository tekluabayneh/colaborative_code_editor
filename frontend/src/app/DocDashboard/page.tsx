import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Sparkles, Zap } from "lucide-react";

const Docs = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-center max-w-4xl mx-auto px-4">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-50 bg-clip-text text-transparent">
            Welcome to Our Platform
          </h1>
      
        <p className="text-2xl font-bold text-gray-800 pb-6">
            Discover powerful tools and features designed to boost your productivity. 
            Get started with our comprehensive documentation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="gap-2 bg-blue-400" >
              <Link href="/Docs" className="flex gap-1 items-center">
                <BookOpen className="h-5 w-5" />
                Explore Documentation
              </Link>
            </Button>
            
            <Button variant="outline" size="lg" className="gap-2" >
              <Zap className="h-5 w-5" />
              Quick Start
            </Button>
          </div>
          
          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader className="text-center">
                <div className="mx-auto mb-2 p-2 w-fit rounded-lg bg-primary/10">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Comprehensive Guides</CardTitle>
                <CardDescription>
                  Step-by-step tutorials and detailed documentation
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader className="text-center">
                <div className="mx-auto mb-2 p-2 w-fit rounded-lg bg-primary/10">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Quick Access</CardTitle>
                <CardDescription>
                  Fast navigation and instant answers to your questions
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader className="text-center">
                <div className="mx-auto mb-2 p-2 w-fit rounded-lg bg-primary/10">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Best Practices</CardTitle>
                <CardDescription>
                  Learn from experts and optimize your workflow
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Docs;

