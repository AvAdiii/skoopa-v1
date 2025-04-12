
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import JobMapDirections from "@/components/maid/JobMapDirections";
import { toast } from "@/hooks/use-toast";

const JobDirections = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get job data from localStorage
    const storedJob = localStorage.getItem("current-job-directions");
    if (storedJob) {
      try {
        const jobData = JSON.parse(storedJob);
        setJob(jobData);
      } catch (error) {
        console.error("Error parsing job data:", error);
        toast({
          title: "Error",
          description: "Could not load job directions",
          variant: "destructive",
        });
        navigate("/maid");
      } finally {
        setIsLoading(false);
      }
    } else {
      // If no job data, redirect back to the dashboard
      toast({
        title: "No job selected",
        description: "Please select a job to view directions",
      });
      navigate("/maid");
    }
  }, [id, navigate]);

  if (isLoading || !job) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  return <JobMapDirections customerName={job.customerName} address={job.address} />;
};

export default JobDirections;
