/**
 * Centralized Adaptive Pricing Logic for Offpeak.pt
 * 
 * In the future, this module can be updated to fetch real-time demand metrics from a database.
 * For now, it calculates the dynamic discount based on current views/bookings metrics.
 */

/**
 * Calculates the current discount percentage based on views, bookings, and base rates.
 * 
 * @param {Object} deal The deal object containing pricing metrics.
 * @returns {number|null} The calculated discount percentage, or null if baseDiscountPercent is not defined.
 */
export function calculateDiscountPercent(deal) {
  if (typeof deal.baseDiscountPercent !== "number") return null;
  
  const views = deal.views || 0;
  const bookings = deal.bookings || 0;
  const decayRate = deal.decayRate || 1.0;
  const minDiscount = typeof deal.minDiscountPercent === "number" ? deal.minDiscountPercent : 10;
  
  // Adaptive Pricing Formula:
  // Each page view decreases the discount by 0.1% * decayRate
  // Each booking decreases the discount by 2.0% * decayRate
  const demandImpact = (views * 0.1 + bookings * 2.0) * decayRate;
  
  // Calculate final discount and clamp it to the minimum allowed
  const currentDiscount = Math.max(minDiscount, Math.round(deal.baseDiscountPercent - demandImpact));
  
  return currentDiscount;
}

/**
 * Returns the localized text representation of the calculated discount.
 * 
 * @param {Object} deal The deal object.
 * @param {string} lang The language code ('pt' or 'en').
 * @returns {string} The localized discount text (e.g., "42% desc." or "42% off").
 */
export function getDiscountText(deal, lang) {
  const currentPercent = calculateDiscountPercent(deal);
  if (currentPercent !== null) {
    if (lang === "pt") {
      return `${currentPercent}% desc.`;
    }
    return `${currentPercent}% off`;
  }
  
  // Fallback to static text
  if (deal.discount) {
    return deal.discount[lang] || deal.discount.en;
  }
  
  return "";
}
