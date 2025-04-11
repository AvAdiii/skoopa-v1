
import { useState } from "react";
import { Clock, MapPin, Phone, Calendar, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Job {
  id: string;
  customerName: string;
  address: string;
  time: string;
  date: string;
  amount: string;
}

interface TodaysJobsProps {
  jobs: Job[];
}

const TodaysJobs = ({ jobs }: TodaysJobsProps) => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <div className="bg-white rounded-xl shadow-md border border-smoke overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-sapphire/20 to-sapphire/5 border-b border-smoke">
          <h3 className="text-xl font-bold text-center flex items-center justify-center gap-2">
            <Calendar className="w-5 h-5 text-sapphire" />
            <span className="text-sapphire">Today's Jobs</span>
          </h3>
        </div>
        
        {jobs.length > 0 ? (
          <div className="divide-y divide-smoke">
            {jobs.map((job) => (
              <div key={job.id} className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-bold text-charcoal">{job.customerName}</h4>
                  <div className="bg-coral/10 text-coral px-3 py-1 rounded-full text-lg font-bold">
                    {job.amount}
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-6 h-6 text-steel" />
                  <div className="text-lg">{job.time}</div>
                </div>
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-6 h-6 text-steel flex-shrink-0 mt-1" />
                  <div className="text-steel text-lg">{job.address}</div>
                </div>
                <div className="flex gap-3">
                  <Button className="flex-1 bg-sapphire hover:bg-sapphire/90 text-white text-lg py-6 font-bold" onClick={() => navigate(`/maid/job/${job.id}`)}>
                    Get Directions
                  </Button>
                  <Button variant="outline" className="flex-1 border-sapphire text-sapphire text-lg py-6 font-bold">
                    <Phone className="w-5 h-5 mr-2" /> Call
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-smoke mx-auto mb-4" />
            <p className="text-xl text-steel">No jobs scheduled for today</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodaysJobs;
