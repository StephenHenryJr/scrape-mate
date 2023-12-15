"use server";

import axios from "axios";
import * as cheerio from "cheerio";
import {
  extractCurrency,
  extractCurrentPrice,
  extractCurrentPriceCents,
  extractDescription,
  extractDiscountRate,
  extractOriginalPrice,
  extractReviewsCount,
  extractStarsCount,
} from "../utils";

export async function scrapeAmazonProduct(url: string) {
  if (!url) return;

  // BrightData Proxy Configuration
  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 22225;
  const session_id = (1000000 * Math.random()) | 0;
  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: "brd.superproxy.io",
    port,
    rejectUnauthorized: false,
  };

  try {
    // Fetch the product page
    const response = await axios.get(url, options);
    const $ = cheerio.load(response.data);

    // Extract the title info
        const title = $("#productTitle").text().trim();
        
    // Extract the current price info
    const currentPrice = extractCurrentPrice($(".priceToPay span.a-price-whole")).replace(",", "");

    const currentPriceCents = extractCurrentPriceCents($(".priceToPay span.a-price-fraction")).replace(",", "");

    // Extract the original price info
    const originalPrice = extractOriginalPrice($(".a-price.a-text-price span.a-offscreen")).replace(/[^\d.-]/g, "");

    // Extract the availability info
    const outOfStock =$("#availabilityInsideBuyBox_feature_div #availability span")
        .text()
        .trim()
        .toLowerCase() === "currently unavailable";

    // Extract the image
    const images = $("#landingImage").attr("data-a-dynamic-image") || "{}";
    const imageUrls = Object.keys(JSON.parse(images));

    // Extract the currency
    const currency = extractCurrency($(".a-price-symbol"));

    // Extract the discount rate
    const discountRate = extractDiscountRate($("span.savingsPercentage"));

    // Extract average rating
    const stars = extractStarsCount($("#averageCustomerReviews span.a-size-base.a-color-base"));

    // Extract item category
    const category = $("#acBadge_feature_div span.ac-keyword-link")
      .text()
      .trim();

    // Extract review count
    const reviewsCount = extractReviewsCount($("#acrCustomerReviewText"));

    // Extract whether or not item is Amazon's choice item
    const amazonsChoice = $("#acBadge_feature_div span.ac-badge-rectangle").text().trim() === "Amazon's  Choice";

    // Extract the product description
    const description = extractDescription($("#feature-bullets .a-spacing-mini"));

    const data = {
      url,
      currency: currency || "$",
      image: imageUrls[0],
      title,
      currentPrice: currentPrice,
      currentPriceCents: currentPriceCents,
      originalPrice: originalPrice,
      priceHistory: [],
      discountRate: discountRate,
      isOutOfStock: outOfStock,
      category: category,
      reviewsCount: reviewsCount,
      stars: stars,
      amazonsChoice: amazonsChoice,
      description: description,
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice: Number(originalPrice) || Number(currentPrice),
      averagePrice: Number(currentPrice) || Number(originalPrice),
    };

    return data
  } catch (error: any) {
    throw new Error(`Failed to scrape product: ${error.message}`);
  }
}
 