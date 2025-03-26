// Pre-trained model coefficients (simplified linear model)
const MODEL_COEFFICIENTS = {
  intercept: 0.08,
  percentage_cheap_fares: 0.02,
  percentage_flexible_fares: 0.03,
  historical_no_show_rate: 0.5,
  expected_no_show_rate: 0.4,
  historical_overbooking_rate: 0.3
};

export function predictOverbooking(
  percentageCheapFares: number,
  percentageFlexibleFares: number,
  historicalNoShowRate: number,
  expectedNoShowRate: number,
  historicalOverbookingRate: number
): number {
  const prediction = 
    MODEL_COEFFICIENTS.intercept +
    MODEL_COEFFICIENTS.percentage_cheap_fares * percentageCheapFares +
    MODEL_COEFFICIENTS.percentage_flexible_fares * percentageFlexibleFares +
    MODEL_COEFFICIENTS.historical_no_show_rate * historicalNoShowRate +
    MODEL_COEFFICIENTS.expected_no_show_rate * expectedNoShowRate +
    MODEL_COEFFICIENTS.historical_overbooking_rate * historicalOverbookingRate;

  return Math.max(0, Math.min(1, prediction)) * 100;
}