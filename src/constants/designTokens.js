/**
 * Design System Tokens
 * Centralized design tokens matching design-system.json
 */

export const COLORS = {
  text: {
    main: '#424242',
    subtle: '#616161',
    subtlest: '#9e9e9e',
    white: '#ffffff',
    inverse: '#ffffff',
    black: '#000000'
  },
  icon: {
    main: '#424242',
    subtle: '#616161',
    inverse: {
      general: '#ffffff',
      pale: '#616161'
    },
    black: '#000000'
  },
  surface: {
    general: '#ffffff',
    subtle: '#eeeeee',
    strong: '#ffffff',
    statusBar: '#fafafa',
    card: '#ffffff',
    searchBar: '#eeeeee'
  },
  avatar: {
    container: '#bdbdbd',
    stroke: '#9e9e9e'
  },
  badge: {
    common: 'rgba(0, 0, 0, 0.08)',
    points: 'rgba(255, 255, 255, 0.6)'
  },
  chips: {
    default: {
      container: '#000000',
      stroke: '#eeeeee'
    },
    selected: {
      container: '#ffffff',
      stroke: '#424242'
    }
  },
  button: {
    filled: {
      main: '#000000'
    },
    iconFilled: {
      inverseGeneral: '#ffffff',
      inverseSubtle: '#eeeeee'
    }
  },
  divider: {
    subtle: 'rgba(0, 0, 0, 0.15)'
  },
  imageStroke: {
    subtle: 'rgba(0, 0, 0, 0.04)'
  },
  tabBar: {
    border: '#eeeeee'
  },
  categorySelected: {
    text: '#00704a'
  }
};

export const TYPOGRAPHY = {
  fontFamily: {
    chinese: 'Noto Sans TC',
    english: 'Poppins',
    chineseFallback: 'sans-serif',
    englishFallback: 'sans-serif'
  },
  chinese: {
    title: {
      h1Bold: {
        fontSize: '20px',
        fontWeight: 600,
        lineHeight: 1,
        letterSpacing: '0px'
      },
      h2Bold: {
        fontSize: '16px',
        fontWeight: 600,
        lineHeight: 1,
        letterSpacing: '0px'
      }
    },
    body: {
      b1Regular: {
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: '0px'
      },
      b1Bold: {
        fontSize: '14px',
        fontWeight: 600,
        lineHeight: 1.5,
        letterSpacing: '0px'
      },
      b2Regular: {
        fontSize: '12px',
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: '0px'
      },
      b2Bold: {
        fontSize: '12px',
        fontWeight: 600,
        lineHeight: 1.5,
        letterSpacing: '0px'
      },
      b3Regular: {
        fontSize: '11px',
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: '0px'
      }
    }
  },
  english: {
    body: {
      b1Regular: {
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: '0px'
      },
      b1Bold: {
        fontSize: '14px',
        fontWeight: 600,
        lineHeight: 1.5,
        letterSpacing: '0px'
      }
    }
  }
};

export const SPACING = {
  baseUnit: {
    0: '0px',
    100: '8px',
    150: '12px',
    200: '16px'
  }
};

export const BORDER_RADIUS = {
  inputFields: {
    l: '24px'
  },
  card: {
    m: '20px'
  },
  badge: {
    capsule: '20px'
  },
  components: {
    avatar: '120px',
    chips: '24px'
  }
};

export const SHADOWS = {
  card: {
    value: '0px 0px 4px 0px rgba(0, 0, 0, 0.05)',
    offsetX: '0px',
    offsetY: '0px',
    blur: '4px',
    spread: '0px',
    color: 'rgba(0, 0, 0, 0.05)'
  }
};

export const BREAKPOINTS = {
  mobile: '375px',
  tablet: '768px',
  desktop: '1024px'
};

// Helper functions
export const getTypographyStyle = (category, variant) => {
  if (category === 'chinese') {
    return TYPOGRAPHY.chinese.body[variant] || TYPOGRAPHY.chinese.title[variant];
  } else if (category === 'english') {
    return TYPOGRAPHY.english.body[variant];
  }
  return null;
};

export const getSpacing = (unit) => {
  return SPACING.baseUnit[unit] || '0px';
};

export const getColor = (category, variant) => {
  if (typeof COLORS[category] === 'object') {
    return COLORS[category][variant] || COLORS[category];
  }
  return COLORS[category];
};
