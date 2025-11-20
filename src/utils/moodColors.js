// src/utils/moodColors.js
import { colors } from './theme';

export function getMoodColor(sentiment) {
  switch (sentiment) {
    case 'positive':
      return colors.positive;
    case 'negative':
      return colors.negative;
    case 'neutral':
    default:
      return colors.neutral;
  }
}
