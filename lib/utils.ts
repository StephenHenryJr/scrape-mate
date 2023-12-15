import { PriceHistoryItem, Product } from "@/types";


// Extracts and returns the current price from a list of possible elements.
export function extractCurrentPrice(...elements: any) {
  for (const element of elements) {
    const priceText = element.text().trim();
    if (priceText) {
      // Match numbers with optional commas as thousand separators
      const regex = /\b\d{1,3}(,\d{3})*\b/;
      const matchedPrice = priceText.match(regex);

      if (matchedPrice) {
        return matchedPrice[0];
      }
    }
  }
  return "";
}

// Extracts and returns the current prices cents from a list of possible elements.
export function extractCurrentPriceCents(element: any) {
  const cents = element.text().trim().slice(0, 2)
  return cents
}

// Extracts and returns the price from a list of possible elements.
export function extractOriginalPrice(...elements: any) {
  for (const element of elements) {
    const priceText = element.text().trim();
    if (priceText) {
      // Match price formats like $1,234.56, €1.234,56, or 1,234
      const regex =
        /(\$?\s?\d{1,3}(,\d{3})*(\.\d{2})?|\€?\s?\d{1,3}(\.\d{3})*(,\d{2})?|\d{1,3}(,\d{3})*)/;
      const matchedPrice = priceText.match(regex);

      if (matchedPrice) {
        return matchedPrice[0];
      }
    }
  }

  return "";
}

// Extracts and returns the currency symbol from an element.
export function extractCurrency(element: any) {
  const currencyText = element.text().trim().slice(0, 1);
  return currencyText ? currencyText : "";
}

// Extracts and returns the discount rate
export function extractDiscountRate(element: any) {
  const discountRateText = element.text().trim();
  const regex = /\b(\d+)\b/;
  const matchedDiscount = discountRateText.match(regex);

  let discountRate = "";

  if (matchedDiscount && matchedDiscount[1]) {
    discountRate = matchedDiscount[1];
  }

  return discountRate;
}

// Extract and return number of reviews
export function extractReviewsCount(element: any) {
  const reviewCountText = element.text().trim();

  // Use a regular expression to match the entire sequence of digits
  const match = reviewCountText.match(/\d+([\d,]*)/);

  if (match) {
    // Extract the matched sequence of digits, including commas if present
    const reviewCount = match[0];
    return reviewCount;
  } else {
    return "Reviews count not found";
  }
}

// Extract and return star ratings
export function extractStarsCount(element: any) {
  const starCountText = element.text().trim();

  // Use a regular expression to match the first occurrence of a number with or without a decimal
  const match = starCountText.match(/\d+(\.\d+)?/);

  if (match) {
    // Extract the first matched number
    const starCount = match[0];
    return starCount;
  } else {
    return "Star count not found";
  }
}

// Extracts description from two possible elements from amazon
export function extractDescription(element: any) {
  const description = element.text().trim();
  return description;
}

export function getHighestPrice(priceList: PriceHistoryItem[]) {
  let highestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price > highestPrice.price) {
      highestPrice = priceList[i];
    }
  }

  return highestPrice.price;
}

export function getLowestPrice(priceList: PriceHistoryItem[]) {
  let lowestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price < lowestPrice.price) {
      lowestPrice = priceList[i];
    }
  }

  return lowestPrice.price;
}

export function getAveragePrice(priceList: PriceHistoryItem[]) {
  const sumOfPrices = priceList.reduce((acc, curr) => acc + curr.price, 0);
  const averagePrice = sumOfPrices / priceList.length || 0;

  return averagePrice;
}