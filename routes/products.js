const express = require("express");
const router = express.Router();

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

router.get("/reviews", async (req, res) => {
  await delay(400);
  res.json([
    {
      name: "Sarah Chen",
      rating: 4,
      comment:
        "Absolutely stunning fragrance! The longevity is incredible and the sillage is perfect for evening wear. The rose and oud blend beautifully together.",
      avatar: "SC",
    },
    {
      name: "Marcus Johnson",
      rating: 5,
      comment: "This is my signature scent now. Compliments everywhere I go!",
      avatar: "MJ",
    },
    {
      name: "Elena Rodriguez",
      rating: 4,
      comment:
        "Luxurious and sophisticated. Perfect for special occasions and date nights.",
      avatar: "ER",
    },
  ]);
});

router.get("/single-product", async (req, res) => {
  await delay(300);
  const days = 2;
  const getExpirationBadge = (d) =>
    `Expires in ${d} ${d === 1 ? "day" : "days"}`;
  const product = {
    name: "Enchanted Rose Elixir",
    rating: 5,
    description:
      "A captivating blend of Bulgarian rose petals and rare oud wood, creating an intoxicating fragrance...",
    notes: "Bulgarian Rose, Oud Wood, Bergamot, Amber, Vanilla, White Musk",
    images: [
      "https://images.unsplash.com/photo-1613521076081-2820f9746a2d?q=80&w=1887&auto=format&fit=crop",
    ],
    price: 127,
    originalPrice: 149,
    discount: 15,
    delivery: new Date(Date.now() + days * 86400000).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
      }
    ),
    badge: getExpirationBadge(days),
  };
  res.json(product);
});

// /recommended-products
router.get("/recommended-products", async (req, res) => {
  await delay(800);
  const getDeliveryDate = (daysFromNow) => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return daysFromNow === 1
      ? "tomorrow, " +
          date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      : date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  res.json([
    {
      id: 1,
      name: "Velvet Rose Oud",
      image:
        "https://images.unsplash.com/photo-1635798083332-7e14d2ca1d2b?q=80",
      rating: 4,
      price: 89,
      originalPrice: null,
      delivery: getDeliveryDate(1),
      badge: null,
    },
    {
      id: 2,
      name: "Midnight Bergamot",
      image:
        "https://images.unsplash.com/photo-1693960794723-09c5e02264e3?q=80",
      rating: 5,
      price: 156,
      originalPrice: 195,
      delivery: getDeliveryDate(2),
      badge: "Bestseller",
    },
    {
      id: 3,
      name: "Amber Noir Intense",
      image:
        "https://images.unsplash.com/photo-1581021412183-bfc77db44f4b?q=80",
      rating: 4,
      price: 234,
      originalPrice: null,
      delivery: getDeliveryDate(2),
      badge: null,
    },
    {
      id: 4,
      name: "Citrus Garden Fresh",
      image:
        "https://images.unsplash.com/photo-1614763344181-562bb314fb56?q=80",
      rating: 4,
      price: 167,
      originalPrice: null,
      delivery: getDeliveryDate(4),
      badge: null,
      stock: "Only 1 left in stock",
    },
  ]);
});

// Mock data
const jobOffers = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    location: "Gliwice, Poland",
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
    location: "Gliwice, Poland",
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
  return jobOffers;
}

async function getJobOffer(id) {
  return jobOffers.find((offer) => offer.id === id);
}

async function getJobDetails(jobId) {
  return jobDetails.find((detail) => detail.jobId === jobId);
}

// New routes for jobs
router.get("/jobs", async (req, res) => {
  const offers = await getJobOffers();
  res.json(offers);
});

router.get("/jobs/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const offer = await getJobOffer(id);
  if (offer) {
    res.json(offer);
  } else {
    res.status(404).send("Job offer not found");
  }
});

router.get("/jobs/:id/details", async (req, res) => {
  const jobId = parseInt(req.params.id);
  const details = await getJobDetails(jobId);
  if (details) {
    res.json(details);
  } else {
    res.status(404).send("Job details not found");
  }
});

module.exports = router;
