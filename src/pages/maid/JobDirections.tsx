
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import JobMapDirections from "@/components/maid/JobMapDirections";

const JobDirections = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<any>(null);

  useEffect(() => {
    // Get job data from localStorage
    const storedJob = localStorage.getItem("current-job-directions");
    if (storedJob) {
      try {
        const jobData = JSON.parse(storedJob);
        setJob(jobData);
      } catch (error) {
        console.error("Error parsing job data:", error);
        navigate("/maid");
      }
    } else {
      // If no job data, redirect back to the dashboard
      navigate("/maid");
    }
  }, [id, navigate]);

  if (!job) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  return <JobMapDirections customerName={job.customerName} address={job.address} />;
};

export default JobDirections;
