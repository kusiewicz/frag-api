const express = require("express");
const router = express.Router();

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock data
const jobOffers = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    location: "Warsaw, Poland",
    type: "Full-time",
    salary: "10000 simoleon",
    shortDescription: "Join our team to build next-gen web applications",
  },
  {
    id: 2,
    title: "Backend Developer",
    location: "Remote",
    type: "Full-time",
    salary: "10000 simoleon",
    shortDescription: "Work on scalable backend services",
  },
  {
    id: 3,
    title: "DevOps Engineer",
    location: "Warsaw, Poland",
    type: "Full-time",
    salary: "10000 simoleon",
    shortDescription: "Help us build and maintain our infrastructure",
  },
];

const jobDetails = [
  {
    id: 1,
    jobId: 1,
    requirements: [
      "5+ years of experience with React",
      "Strong TypeScript skills",
      "Experience with Next.js",
      "Good understanding of web performance",
    ],
    responsibilities: [
      "Develop new user-facing features",
      "Build reusable components",
      "Optimize applications for maximum speed",
      "Collaborate with backend developers",
    ],
    benefits: [
      "Competitive salary",
      "Remote work options",
      "Learning budget",
      "Private healthcare",
    ],
  },
  {
    id: 2,
    jobId: 2,
    requirements: [
      "3+ years of backend development",
      "Experience with Node.js",
      "Knowledge of databases",
      "Understanding of microservices",
    ],
    responsibilities: [
      "Design and implement APIs",
      "Optimize database queries",
      "Write clean, maintainable code",
      "Participate in code reviews",
    ],
    benefits: [
      "Competitive salary",
      "Remote work",
      "Conference budget",
      "Flexible hours",
    ],
  },
  {
    id: 3,
    jobId: 3,
    requirements: [
      "Experience with AWS",
      "Knowledge of Docker and Kubernetes",
      "CI/CD pipelines",
      "Infrastructure as Code",
    ],
    responsibilities: [
      "Maintain cloud infrastructure",
      "Implement security best practices",
      "Monitor system performance",
      "Automate deployment processes",
    ],
    benefits: [
      "Competitive salary",
      "Hybrid work model",
      "Training budget",
      "Modern equipment",
    ],
  },
];

// Helper functions for job offers and details
async function getJobOffers() {
  await delay(1000);
  return jobOffers;
}

async function getJobOffer(id) {
  await delay(1000);
  return jobOffers.find((offer) => offer.id === id);
}

async function getJobDetails(jobId) {
  await delay(1000);
  return jobDetails.find((detail) => detail.jobId === jobId);
}

// New routes for jobs
router.get("/", async (req, res) => {
  const offers = await getJobOffers();
  res.json(offers);
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const offer = await getJobOffer(id);
  if (offer) {
    res.json(offer);
  } else {
    res.status(404).send("Job offer not found");
  }
});

router.get("/:id/details", async (req, res) => {
  const jobId = parseInt(req.params.id);
  const details = await getJobDetails(jobId);
  if (details) {
    res.json(details);
  } else {
    res.status(404).send("Job details not found");
  }
});

module.exports = router; 