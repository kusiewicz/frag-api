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

module.exports = router;
