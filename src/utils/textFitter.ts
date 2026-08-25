/**
 * Dynamic Text & Spacing Fitting Utility
 * Ensures generated reading text gracefully covers each PDF page
 * without overflowing fixed containers or page bounds (794px x 1123px).
 */

export interface FittedTypography {
  fontSize: string;     // e.g. "15px"
  lineHeight: string;   // e.g. "1.85"
  spaceY: string;       // Tailwind space-y class, e.g. "space-y-6"
  headingSize?: string; // e.g. "28px"
  paddingTop?: string;  // e.g. "pt-12"
}

/**
 * Returns dynamic typography & spacing for Q&A Insight single-prompt pages (Pages 13-17)
 */
export const getQATextStyle = (answerLength: number): FittedTypography => {
  if (answerLength < 180) {
    return {
      fontSize: 'text-[19px]',
      lineHeight: 'leading-[2.1]',
      spaceY: 'space-y-12',
      headingSize: 'text-[29px]',
    };
  } else if (answerLength < 320) {
    return {
      fontSize: 'text-[16.5px]',
      lineHeight: 'leading-[2.0]',
      spaceY: 'space-y-10',
      headingSize: 'text-[27px]',
    };
  } else if (answerLength < 500) {
    return {
      fontSize: 'text-[15px]',
      lineHeight: 'leading-[1.85]',
      spaceY: 'space-y-8',
      headingSize: 'text-[25px]',
    };
  } else if (answerLength < 750) {
    return {
      fontSize: 'text-[13.8px]',
      lineHeight: 'leading-[1.72]',
      spaceY: 'space-y-6',
      headingSize: 'text-[24px]',
    };
  } else {
    return {
      fontSize: 'text-[12.5px]',
      lineHeight: 'leading-[1.6]',
      spaceY: 'space-y-4',
      headingSize: 'text-[22px]',
    };
  }
};

/**
 * Returns dynamic typography & spacing for Card Interpretation Pages (Pages 6, 8, 10)
 */
export const getInterpretationTextStyle = (totalLength: number): FittedTypography => {
  if (totalLength < 450) {
    return {
      fontSize: 'text-[15.5px]',
      lineHeight: 'leading-[2.0]',
      spaceY: 'space-y-7',
      paddingTop: 'pt-16',
      headingSize: 'text-[32px]',
    };
  } else if (totalLength < 750) {
    return {
      fontSize: 'text-[14px]',
      lineHeight: 'leading-[1.85]',
      spaceY: 'space-y-5',
      paddingTop: 'pt-12',
      headingSize: 'text-[30px]',
    };
  } else if (totalLength < 1050) {
    return {
      fontSize: 'text-[13px]',
      lineHeight: 'leading-[1.72]',
      spaceY: 'space-y-4',
      paddingTop: 'pt-8',
      headingSize: 'text-[28px]',
    };
  } else {
    return {
      fontSize: 'text-[12px]',
      lineHeight: 'leading-[1.6]',
      spaceY: 'space-y-3',
      paddingTop: 'pt-6',
      headingSize: 'text-[26px]',
    };
  }
};

/**
 * Returns dynamic typography & spacing for Synthesis Pages (Pages 11 & 12)
 */
export const getSynthesisTextStyle = (totalLength: number): FittedTypography => {
  if (totalLength < 450) {
    return {
      fontSize: 'text-[16px]',
      lineHeight: 'leading-[2.0]',
      spaceY: 'space-y-8',
    };
  } else if (totalLength < 800) {
    return {
      fontSize: 'text-[14.5px]',
      lineHeight: 'leading-[1.85]',
      spaceY: 'space-y-6',
    };
  } else if (totalLength < 1150) {
    return {
      fontSize: 'text-[13.2px]',
      lineHeight: 'leading-[1.72]',
      spaceY: 'space-y-4',
    };
  } else {
    return {
      fontSize: 'text-[12px]',
      lineHeight: 'leading-[1.6]',
      spaceY: 'space-y-3',
    };
  }
};

/**
 * Returns dynamic typography & spacing for Numerology right interpretation box (Page 3)
 */
export const getNumerologyTextStyle = (totalLength: number): FittedTypography => {
  if (totalLength < 350) {
    return {
      fontSize: 'text-[15px]',
      lineHeight: 'leading-[1.9]',
      spaceY: 'space-y-4',
    };
  } else if (totalLength < 600) {
    return {
      fontSize: 'text-[13.5px]',
      lineHeight: 'leading-[1.78]',
      spaceY: 'space-y-3',
    };
  } else if (totalLength < 850) {
    return {
      fontSize: 'text-[12.2px]',
      lineHeight: 'leading-[1.65]',
      spaceY: 'space-y-2',
    };
  } else {
    return {
      fontSize: 'text-[11.2px]',
      lineHeight: 'leading-[1.52]',
      spaceY: 'space-y-1.5',
    };
  }
};

/**
 * Returns dynamic typography for Action Steps (Pages 20 & 21)
 */
export const getActionStepTextStyle = (totalLength: number): FittedTypography => {
  if (totalLength < 400) {
    return {
      fontSize: 'text-[15.5px]',
      lineHeight: 'leading-[1.95]',
      spaceY: 'space-y-10',
      headingSize: 'text-[16.5px]',
    };
  } else if (totalLength < 700) {
    return {
      fontSize: 'text-[14px]',
      lineHeight: 'leading-[1.82]',
      spaceY: 'space-y-7',
      headingSize: 'text-[15.5px]',
    };
  } else {
    return {
      fontSize: 'text-[12.8px]',
      lineHeight: 'leading-[1.68]',
      spaceY: 'space-y-5',
      headingSize: 'text-[14.5px]',
    };
  }
};

/**
 * Returns dynamic typography for Energetic Mantras (Page 22)
 */
export const getMantraTextStyle = (totalLength: number, count: number): FittedTypography => {
  const avgLen = count > 0 ? totalLength / count : 80;
  if (avgLen < 70 && count <= 5) {
    return {
      fontSize: 'text-[16.5px]',
      lineHeight: 'leading-[2.05]',
      spaceY: 'space-y-7',
    };
  } else if (avgLen < 120 && count <= 5) {
    return {
      fontSize: 'text-[15px]',
      lineHeight: 'leading-[1.85]',
      spaceY: 'space-y-5',
    };
  } else {
    return {
      fontSize: 'text-[13.5px]',
      lineHeight: 'leading-[1.72]',
      spaceY: 'space-y-4',
    };
  }
};

/**
 * Returns dynamic typography for Soul Inquiries (Page 23)
 */
export const getSoulInquiryTextStyle = (totalLength: number): FittedTypography => {
  if (totalLength < 300) {
    return {
      fontSize: 'text-[18px]',
      lineHeight: 'leading-[2.1]',
      spaceY: 'space-y-16',
    };
  } else if (totalLength < 550) {
    return {
      fontSize: 'text-[16px]',
      lineHeight: 'leading-[1.95]',
      spaceY: 'space-y-12',
    };
  } else {
    return {
      fontSize: 'text-[14px]',
      lineHeight: 'leading-[1.78]',
      spaceY: 'space-y-8',
    };
  }
};

/**
 * Returns dynamic typography for Spiritual Prescription (Page 24)
 */
export const getPrescriptionTextStyle = (totalLength: number): FittedTypography => {
  if (totalLength < 450) {
    return {
      fontSize: 'text-[15px]',
      lineHeight: 'leading-[1.92]',
      spaceY: 'space-y-8',
      headingSize: 'text-[16px]',
    };
  } else if (totalLength < 750) {
    return {
      fontSize: 'text-[13.8px]',
      lineHeight: 'leading-[1.8]',
      spaceY: 'space-y-6',
      headingSize: 'text-[15px]',
    };
  } else {
    return {
      fontSize: 'text-[12.5px]',
      lineHeight: 'leading-[1.65]',
      spaceY: 'space-y-4',
      headingSize: 'text-[14px]',
    };
  }
};
