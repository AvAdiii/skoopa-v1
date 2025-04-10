
import { useState } from "react";
import { ArrowLeft, Check, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const MaidInsurance = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  
  const insurancePlans = [
    {
      id: "basic",
      name: "Basic Protection",
      price: 599,
      period: "monthly",
      description: "Essential coverage for occasional maid service",
      features: [
        "Free replacement within 24 hours",
        "Quality verified substitutes",
        "Up to 3 replacements per month",
        "Basic quality assurance"
      ]
    },
    {
      id: "premium",
      name: "Premium Protection",
      price: 1299,
      period: "monthly",
      description: "Comprehensive coverage for regular maid service",
      features: [
        "Free replacement within 12 hours",
        "Top-rated professional substitutes",
        "Unlimited replacements",
        "Dedicated service manager",
        "Regular quality checks",
        "Service guarantee"
      ],
      recommended: true
    },
    {
      id: "annual",
      name: "Annual Premium",
      price: 11999,
      period: "yearly",
      description: "Premium protection with annual savings",
      features: [
        "All Premium Protection benefits",
        "Priority service 7 days a week",
        "Premium maid selection",
        "Service quality verification",
        "Save ₹3,589 compared to monthly plan"
      ]
    }
  ];
  
  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };
  
  const handlePurchase = () => {
    if (!selectedPlan) {
      toast({
        title: "Select a plan",
        description: "Please select an insurance plan to continue",
        variant: "destructive"
      });
      return;
    }
    
    const plan = insurancePlans.find(p => p.id === selectedPlan);
    if (!plan) return;
    
    toast({
      title: "Plan purchased!",
      description: `You have successfully purchased the ${plan.name} plan`,
    });
    
    // Navigate back to home
    navigate("/");
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white p-4 border-b border-smoke">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-sapphire">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-lg font-bold text-sapphire">Maid Replacement Guarantee</h1>
        </div>
      </div>
      
      <div className="p-4">
        {/* Hero section */}
        <div className="bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-xl p-6 mb-6 text-center">
          <div className="w-16 h-16 bg-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="text-emerald-700" size={28} />
          </div>
          <h2 className="text-2xl font-bold text-emerald-800 mb-2">Never Worry About Maid Absence</h2>
          <p className="text-emerald-700 mb-4">Get guaranteed replacement when your regular maid is unavailable</p>
        </div>
        
        {/* Key Benefits */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-charcoal mb-3">Key Benefits</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-xl border border-smoke">
              <div className="w-10 h-10 bg-azure/20 rounded-full flex items-center justify-center mb-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sapphire">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                  <path d="M12 6v6l4 2"></path>
                </svg>
              </div>
              <h4 className="font-medium text-charcoal mb-1">Quick Replacement</h4>
              <p className="text-sm text-steel">Get a replacement maid within hours, not days</p>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-smoke">
              <div className="w-10 h-10 bg-azure/20 rounded-full flex items-center justify-center mb-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sapphire">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <path d="M22 4 12 14.01l-3-3"></path>
                </svg>
              </div>
              <h4 className="font-medium text-charcoal mb-1">Verified Quality</h4>
              <p className="text-sm text-steel">All replacement maids are verified and professional</p>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-smoke">
              <div className="w-10 h-10 bg-azure/20 rounded-full flex items-center justify-center mb-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sapphire">
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                  <path d="M4 22v-7"></path>
                </svg>
              </div>
              <h4 className="font-medium text-charcoal mb-1">Peace of Mind</h4>
              <p className="text-sm text-steel">Never worry about cleaning disruptions</p>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-smoke">
              <div className="w-10 h-10 bg-azure/20 rounded-full flex items-center justify-center mb-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sapphire">
                  <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"></path>
                  <path d="M12 15l5 6H7l5-6z"></path>
                </svg>
              </div>
              <h4 className="font-medium text-charcoal mb-1">Service Guarantee</h4>
              <p className="text-sm text-steel">Full refund if we can't provide a replacement</p>
            </div>
          </div>
        </div>
        
        {/* Insurance Plans */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-charcoal mb-3">Choose Your Protection Plan</h3>
          <div className="space-y-4">
            {insurancePlans.map((plan) => (
              <Card 
                key={plan.id}
                className={`border-2 cursor-pointer transition-all ${
                  selectedPlan === plan.id 
                    ? "border-coral shadow-md" 
                    : "border-smoke hover:border-coral/30"
                } ${
                  plan.recommended ? "relative" : ""
                }`}
                onClick={() => handleSelectPlan(plan.id)}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 right-6 bg-gold px-3 py-1 rounded-full text-xs font-bold text-charcoal">
                    Recommended
                  </div>
                )}
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between items-center">
                    <span>{plan.name}</span>
                    <span className="text-coral">₹{plan.price}</span>
                  </CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-charcoal">
                        <Check size={16} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant={selectedPlan === plan.id ? "default" : "outline"}
                    className={`w-full ${selectedPlan === plan.id ? "bg-coral hover:bg-coral/90" : "border-coral text-coral hover:bg-coral/5"}`}
                    onClick={() => handleSelectPlan(plan.id)}
                  >
                    {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Purchase Button */}
        <Button 
          className="w-full py-6 text-base bg-coral hover:bg-coral/90 rounded-xl"
          onClick={handlePurchase}
          disabled={!selectedPlan}
        >
          Purchase Protection Plan
        </Button>
        
        <p className="text-xs text-steel text-center mt-4">
          By purchasing this plan, you agree to our terms and conditions. 
          Replacement subject to maid availability in your area.
        </p>
      </div>
    </div>
  );
};

export default MaidInsurance;
