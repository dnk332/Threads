export const stringToColor = (string: string): string => {
  let hash = 0;

  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }

  // Function to calculate luminance
  const calculateLuminance = (hex: string) => {
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);

    // Use the luminance formula
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  };

  // Adjust color if luminance is too high (brightness threshold, e.g., 0.7)
  const brightnessThreshold = 0.3;
  while (calculateLuminance(color) > brightnessThreshold) {
    hash -= 1; // Adjust the hash slightly
    color = '#';

    for (let i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
  }

  return color;
};
