// Theme Configuration - Centralized theme settings
export const themeConfig = {
  // Background Configuration
  background: {
    primary: 'hsl(230, 30%, 5%)',
    gradient1: 'hsl(210, 60%, 20%)',
    gradient2: 'hsl(240, 50%, 15%)',
    position1: '20% 20%',
    position2: '80% 80%',
    size: '50%'
  },

  // Color Palette
  colors: {
    primary: {
      50: '#f0f4ff',
      100: '#e0e7ff',
      200: '#c7d2fe',
      300: '#a5b4fc',
      400: '#818cf8',
      500: '#6366f1',
      600: '#4f46e5',
      700: '#4338ca',
      800: '#3730a3',
      900: '#312e81',
      950: '#1e1b4b',
    },
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617',
    },
    accent: {
      50: '#fdf4ff',
      100: '#fae8ff',
      200: '#f5d0fe',
      300: '#f0abfc',
      400: '#e879f9',
      500: '#d946ef',
      600: '#c026d3',
      700: '#a21caf',
      800: '#86198f',
      900: '#701a75',
      950: '#4a044e',
    }
  },

  // Text Colors
  text: {
    primary: '#ffffff',
    secondary: 'rgba(255, 255, 255, 0.8)',
    muted: 'rgba(255, 255, 255, 0.6)',
    placeholder: 'rgba(255, 255, 255, 0.5)'
  },

  // Component Styles
  components: {
    card: {
      background: 'rgba(255, 255, 255, 0.05)',
      border: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      backdropFilter: 'blur(12px)',
      hover: {
        transform: 'translateY(-4px)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
        borderColor: 'rgba(255, 255, 255, 0.2)'
      }
    },
    button: {
      primary: {
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        color: 'white',
        borderRadius: '8px',
        padding: '12px 24px',
        boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)',
        hover: {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 25px rgba(99, 102, 241, 0.4)'
        }
      },
      secondary: {
        background: 'rgba(255, 255, 255, 0.1)',
        color: 'white',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '8px',
        padding: '12px 24px',
        backdropFilter: 'blur(12px)',
        hover: {
          background: 'rgba(255, 255, 255, 0.15)',
          borderColor: 'rgba(255, 255, 255, 0.3)',
          transform: 'translateY(-2px)'
        }
      }
    },
    input: {
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '8px',
      color: 'white',
      padding: '12px 16px',
      backdropFilter: 'blur(12px)',
      focus: {
        borderColor: '#6366f1',
        boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.1)'
      }
    },
    badge: {
      background: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '20px',
      padding: '4px 12px',
      fontSize: '0.875rem',
      backdropFilter: 'blur(12px)'
    }
  },

  // Animation Configuration
  animations: {
    duration: {
      fast: '0.3s',
      normal: '0.5s',
      slow: '0.8s'
    },
    easing: {
      ease: 'ease',
      easeOut: 'ease-out',
      easeIn: 'ease-in',
      easeInOut: 'ease-in-out'
    },
    delays: {
      100: '0.1s',
      200: '0.2s',
      300: '0.3s',
      400: '0.4s',
      500: '0.5s',
      600: '0.6s',
      700: '0.7s',
      800: '0.8s'
    }
  },

  // Responsive Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },

  // Spacing
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem'
  },

  // Typography
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      serif: ['Georgia', 'serif'],
      mono: ['JetBrains Mono', 'monospace']
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem'
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800'
    }
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
  }
};

// Theme utility functions
export const themeUtils = {
  // Generate CSS custom properties
  generateCSSVariables: () => {
    const variables: Record<string, string> = {};
    
    // Background variables
    variables['--theme-bg-primary'] = themeConfig.background.primary;
    variables['--theme-bg-gradient1'] = themeConfig.background.gradient1;
    variables['--theme-bg-gradient2'] = themeConfig.background.gradient2;
    
    // Color variables
    Object.entries(themeConfig.colors).forEach(([colorName, colorShades]) => {
      Object.entries(colorShades).forEach(([shade, value]) => {
        variables[`--theme-${colorName}-${shade}`] = value;
      });
    });
    
    // Text variables
    Object.entries(themeConfig.text).forEach(([textType, value]) => {
      variables[`--theme-text-${textType}`] = value;
    });
    
    return variables;
  },

  // Get theme class names
  getThemeClasses: (component: string, variant?: string) => {
    const classes: Record<string, string> = {
      card: 'theme-card',
      buttonPrimary: 'theme-btn-primary',
      buttonSecondary: 'theme-btn-secondary',
      input: 'theme-input',
      badge: 'theme-badge',
      textPrimary: 'theme-text-primary',
      textSecondary: 'theme-text-secondary',
      textMuted: 'theme-text-muted',
      gradientText: 'theme-gradient-text',
      divider: 'theme-divider',
      seamlessContainer: 'theme-seamless-container',
      darkBg: 'theme-dark-bg'
    };
    
    return variant ? `${classes[component]} ${classes[variant]}` : classes[component];
  },

  // Generate animation classes
  getAnimationClasses: (animation: string, delay?: number) => {
    const classes = [`animate-${animation}`];
    if (delay) {
      classes.push(`animate-delay-${delay}`);
    }
    return classes.join(' ');
  }
};

export default themeConfig;
