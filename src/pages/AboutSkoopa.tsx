
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SkoopaLogo from "@/components/SkoopaLogo";

const AboutSkoopa = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white p-4 border-b border-smoke">
        <div className="flex items-center gap-3">
          <Link to="/profile" className="text-sapphire">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-lg font-bold text-sapphire">About Skoopa</h1>
        </div>
      </div>
      
      <div className="p-4">
        {/* Logo and mission */}
        <div className="flex flex-col items-center py-6">
          <SkoopaLogo className="w-32 mb-6" />
          <h2 className="text-xl font-bold text-charcoal mb-2">Making Home Cleaning Effortless</h2>
          <p className="text-steel text-center">Connecting quality house-help with homeowners across India</p>
        </div>
        
        {/* About sections */}
        <div className="space-y-6 mt-4">
          <section>
            <h3 className="text-lg font-bold text-sapphire mb-3">Our Story</h3>
            <div className="bg-white rounded-xl border border-smoke p-4">
              <p className="text-charcoal mb-3">
                Skoopa was founded in 2023 with a mission to transform the home cleaning experience in India. We recognized the challenges faced by both homeowners in finding reliable help and domestic workers in finding stable employment opportunities.
              </p>
              <p className="text-charcoal">
                Our platform bridges this gap by providing a transparent, reliable, and efficient way to connect quality service providers with homeowners, while ensuring fair wages and dignified working conditions for our service partners.
              </p>
            </div>
          </section>
          
          <section>
            <h3 className="text-lg font-bold text-sapphire mb-3">What We Believe</h3>
            <div className="bg-white rounded-xl border border-smoke p-4">
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <div className="w-8 h-8 bg-azure rounded-full flex items-center justify-center shrink-0 text-sapphire">1</div>
                  <div>
                    <h4 className="font-medium text-charcoal">Quality Service</h4>
                    <p className="text-sm text-steel">We're committed to delivering consistent, high-quality cleaning services that exceed expectations.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-8 h-8 bg-azure rounded-full flex items-center justify-center shrink-0 text-sapphire">2</div>
                  <div>
                    <h4 className="font-medium text-charcoal">Fair Opportunity</h4>
                    <p className="text-sm text-steel">We provide dignified employment opportunities and fair wages for our service partners.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-8 h-8 bg-azure rounded-full flex items-center justify-center shrink-0 text-sapphire">3</div>
                  <div>
                    <h4 className="font-medium text-charcoal">Transparency</h4>
                    <p className="text-sm text-steel">We maintain clear communication and transparent pricing with both customers and service providers.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-8 h-8 bg-azure rounded-full flex items-center justify-center shrink-0 text-sapphire">4</div>
                  <div>
                    <h4 className="font-medium text-charcoal">Community Impact</h4>
                    <p className="text-sm text-steel">We aim to create a positive impact in communities by improving living standards and working conditions.</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>
          
          <section>
            <h3 className="text-lg font-bold text-sapphire mb-3">Our Services</h3>
            <div className="bg-white rounded-xl border border-smoke p-4">
              <p className="text-charcoal mb-3">
                Skoopa offers a wide range of home cleaning services including:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-coral"></div>
                  <span className="text-charcoal">Regular home cleaning</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-coral"></div>
                  <span className="text-charcoal">Deep cleaning services</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-coral"></div>
                  <span className="text-charcoal">Kitchen and bathroom specialized cleaning</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-coral"></div>
                  <span className="text-charcoal">Festival special cleaning packages</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-coral"></div>
                  <span className="text-charcoal">Maid replacement guarantee plans</span>
                </li>
              </ul>
            </div>
          </section>
          
          <section>
            <h3 className="text-lg font-bold text-sapphire mb-3">Contact Us</h3>
            <div className="bg-white rounded-xl border border-smoke p-4">
              <div className="space-y-2">
                <p className="text-charcoal">
                  <span className="font-medium">Email:</span> support@skoopa.com
                </p>
                <p className="text-charcoal">
                  <span className="font-medium">Phone:</span> +91-9876543210
                </p>
                <p className="text-charcoal">
                  <span className="font-medium">Address:</span> 123 Tech Park, Hitech City, Hyderabad, Telangana 500081
                </p>
              </div>
            </div>
          </section>
        </div>
        
        {/* Footer */}
        <div className="flex flex-col items-center mt-8 gap-1 py-4">
          <div className="flex items-center">
            <SkoopaLogo variant="icon" className="w-6 h-6 mr-2" />
            <span className="text-sm text-steel">Made in India</span>
          </div>
          <span className="text-xs text-steel">Created with ❤️ in Hyderabad</span>
        </div>
      </div>
    </div>
  );
};

export default AboutSkoopa;
