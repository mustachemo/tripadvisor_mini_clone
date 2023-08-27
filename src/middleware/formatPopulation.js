const formatNumber = value => {
  const abbreviations = ['', 'k', 'M', 'B', 'T']; // Add more if needed
  const tier = (Math.log10(value) / 3) | 0; // Calculate tier (thousands, millions, etc.)
  const scaled = value / 1000 ** tier; // Divide by 1000^tier using the '**' operator
  const suffix = abbreviations[tier];

  // Format with a fixed number of decimal places
  return scaled.toFixed(1) + suffix;
};

export default formatNumber;
