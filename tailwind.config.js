import plugin from 'tailwindcss/plugin';
import typography from '@tailwindcss/typography';

const rem = (size) => {
  return `${size / 16}rem`;
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/views/**/*.twig',
    './src/views/**/*.ts',
    './src/views/**/*.tsx',
  ],
  theme: {
    screens: {
      m: '375px',
      t: '768px',
      md: '1024px',
      d: '1280px',
      xl: '1440px',
      xxl: '1600px',
      xxxl: '1920px',
    },
    colors: {
      project: {
        color: 'var(--project-color, #033E5E)',
        hover: 'var(--project-hover, #033E5ECC)',
        accent: 'var(--project-accent, #CDE2EF)',
        bg: 'var(--project-bg, #F0F5F8)',
      },
      current: 'currentColor',
      transparent: 'transparent',
      beige: {
        '100': '#FDFBF2',
        '200': '#FBF6E5',
      },
      black: {
        '100': '#232323',
        '100-40': '#00000066',
        '100-50': '#00000080',
        '100-60': '#23232399',
        '100-70': '#2323234C',
        '100-80': '#232323CC',
        '200-30': '#0000004D',
      },
      blue: {
        '100': '#F0F5F8',
        '200': '#CDE2EF',
        '300': '#033E5E',
        '300-08': '#033E5E14',
        '300-20': '#033E5E33',
        '300-50': '#033E5E80',
        '300-80': '#033E5ECC',
      },
      gray: {
        '100': '#E8E8E8',
        '200': '#AAAAAB',
        '300': '#8F8F8F',
      },
      gold: {
        '100': '#A78E3C',
        '100-30': '#A78E3C4D',
        '100-80': '#A78E3CCC',
        '200': '#BDA75D',
      },
      green: {
        '100': '#EDF5EA',
        '200': '#D6E9CE',
        '300': '#4D773B',
        '300-80': '#4D773BCC',
        '400': '#41712C',
      },
      orange: {
        '100': '#FFF7F0',
        '200': '#F8EADE',
        '300': '#F99A41',
        '400': '#F08929',
      },
      white: {
        '100': '#FFFFFF',
        '100-20': '#FFFFFF33',
        '100-50': '#FFFFFF80',
        '100-80': '#FFFFFFCC',
        '100-90': '#FFFFFF19',
      },
      red:'#FF1212',
    },
    extend: {
      borderRadius: {
        '20xl': rem(80),
      },
      animation: {
        'fadeIn': "fadeIn .5s ease-in-out",
        'loader': 'loader 1s linear infinite alternate',
      },
      keyframes: {
        loader: {
          '0%': {
            boxShadow: '-38px -12px ,  -14px 0,  14px 0, 38px 0',
          },
          '33%': {
            boxShadow: '-38px 0px, -14px -12px,  14px 0, 38px 0',
          },
          '66%': {
            boxShadow: '-38px 0px , -14px 0, 14px -12px, 38px 0',
          },
          '100%': {
            boxShadow: '-38px 0 , -14px 0, 14px 0 , 38px -12px',
          },
        },
        fadeIn: {
          '0%': {
            opacity: 0,
            transform: 'translateY(50px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0px)',
          },
        },
      },
      backdropBlur: {
        1: rem(4),
      },
      spacing: {
        2.5: rem(10),
        4.5: rem(18),
        5.5: rem(22),
        9.5: rem(38),
        12.5: rem(50),
        13: rem(52),
        15: rem(60),
        17: rem(68),
        17.5: rem(70),
        18: rem(72),
        18.5: rem(74),
        21: rem(84),
        22: rem(88),
        22.5: rem(90),
        26: rem(104),
        27: rem(108),
        30: rem(120),
        35.5: rem(141),
        50: rem(200),
        68: rem(272),
        73.5: rem(294),
        94: rem(376),
        99.5: rem(398),
      },
       typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            h2: {
              fontFamily: 'var(--font-primary)',
              fontWeight: '400',
              lineHeight: '140%',
              letterSpacing: '0',
              textTransform: 'uppercase',
              fontSize: rem(18),
              marginTop: 'theme(spacing.4)',
              marginBottom: 'theme(spacing.2)',

              '@media (min-width: theme(screens.t))': {
                fontSize: rem(32),
                marginBottom: 'theme("spacing.4")',
              },
              '@media (min-width: theme(screens.d))': {
                marginTop: 'theme(spacing.6)',
                marginBottom: 'theme(spacing.4)',

              },

              '@media (min-width: theme(screens.xxl))': {
                fontSize: rem(48),
                marginBottom: 'theme(spacing.6)',
              },
            },

            ol: {
              counterReset: 'section',
              listStyleType: 'none',
              paddingInlineStart: '0',
            },

            'ol > li': {
              counterIncrement: 'section',
            },

            'ol ol': {
              counterReset: 'subsection',
            },

            'ol ol > li': {
              display: 'flex',
              alignItems: 'flex-start',
              marginBottom: rem(4),
              '@media (min-width: theme(screens.d))': {
                marginBottom: rem(8),
              },
              counterIncrement: 'subsection',
            },

            'ol ol > li::before': {
              content: 'counter(section) "." counter(subsection) " "',
              marginRight:  rem(8),
            },

            'ol p': {
              marginBottom: rem(4),
              '@media (min-width: theme(screens.d))': {
                marginBottom: rem(8),
              },
            },

            div: {
              '> span': {
                display: 'block',
              },
            },

            p: {
              fontFamily: 'var(--font-primary)',
              fontWeight: '400',
              lineHeight: '150%',
              letterSpacing: '0',
              fontSize: rem(16),
              marginBottom: 'theme(spacing.4)',

              '@media (min-width: theme(screens.xxl))': {
                fontSize: rem(18),
                marginBottom: 'theme(spacing.6)',
              },
            },

            a: {
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              textDecorationThickness: '1px',
              transition: 'text-decoration-color 0.3s',
              '&:hover': {
                textDecorationColor: 'transparent',
              },
            },

            b: {
              color: 'theme("colors.black.100")',
            },
          },
        },
      },
      zIndex: {
        1: 1,
        2: 2,
        header: '6666',
        popup: '9999',
      },
      width: {
        31.5: rem(126),
        41: rem(164),
        90.5: rem(362),
      },
      height: {
        '7/4': '175%',
      },
      maxHeight: {
        '640': '40rem',
      },
      boxShadow: {
        '2sm': '0px 4px 4px 0px #00000040',
        '3sm': '0px 1px 12px 0px rgba(106, 122, 152, 0.15)',
      },
      gridAutoColumns: {
        1: '100%',
        2: 'calc(50% - 16px)',
        3: 'calc(33.33% - 16px)',
        4: 'calc(25% - 18px)',
      },
      aspectRatio: {
        0.8: '1/1.3',
        0.9:'1/1.07',
        1.3: '1.3/1',
        1.5: '1.5/1',
        2: '2/1',
      },
      rotate: {
        '135': '135deg',
      },
    },
  },
  plugins: [
    plugin(function({addUtilities}) {
      addUtilities({
        '.snap-initial': {
          'scroll-snap-align': 'initial',
        },
        '.bg-gradient-4': {
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.2) 13.04%, rgba(0, 0, 0, 0) 32.06%, rgba(0, 0, 0, 0) 75.49%, rgba(0, 0, 0, 0.2) 88.75%)',
        },
        '.bg-gradient-2': {
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.2) 13.76%, rgba(0, 0, 0, 0) 32.06%);',
        },
        '.bg-gradient-3': {
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 66.99%, rgba(0, 0, 0, 0.237123) 83.12%, rgba(0, 0, 0, 0.3) 100%);'
        },
        '.bg-gradient-header': {
          backgroundImage: 'linear-gradient(to bottom, theme("colors.black.200-30"), theme("colors.black.200-30"), transparent)',
        },
        '.header-modal-transition': {
          transition: '0s transform 0.3s, 0.3s opacity',
        },
        '.burger-top': {
          transform: 'rotate(-45deg) scaleX(1.15) translateY(-2px)',
        },
        '.burger-bottom': {
          transform: 'rotate(45deg) scaleX(1.15) translateY(2px)',
        },
        '.animation-fade-in-up': {
          transform: 'translateY(10vh)',
          opacity: 0,
        },
        '.animation-fade-in-up-running': {
          transition: '1s transform, 1s opacity',
          transform: 'translateY(0px)',
          opacity: 1,
        },
      })
    }),
    plugin(function({matchVariant}) {
      matchVariant('type', (value) => {
        return `:merge([data-type-variant=${value}]) &`;
      });
    }),
    plugin(function({addComponents}) {
      addComponents({
        '.container': {
          paddingLeft: 'theme(spacing.4)',
          paddingRight: 'theme(spacing.4)',
          maxWidth: '100%',

          '@media (min-width: theme(screens.t))': {
            paddingLeft: 'theme(spacing.6)',
            paddingRight: 'theme(spacing.6)',
          },

          '@media (min-width: theme(screens.d))': {
            paddingLeft: 'theme(spacing.12)',
            paddingRight: 'theme(spacing.12)',
          },

          '@media (min-width: theme(screens.xxl))': {
            paddingLeft: 'theme(spacing.30)',
            paddingRight: 'theme(spacing.30)',
          },
        },

        '.screen': {
          '&:not(:first-of-type)': {
            marginTop: 'theme(spacing.4)',

            '@media (min-width: theme(screens.t))': {
              marginTop: 'theme(spacing.6)',
            },

            '@media (min-width: theme(screens.d))': {
              marginTop: 'theme(spacing.10)',
            },

            '@media (min-width: theme(screens.xxl))': {
              marginTop: 'theme(spacing.15)',
            },
          },
          '&:not(:last-of-type)': {
            marginBottom: 'theme(spacing.4)',

            '@media (min-width: theme(screens.t))': {
              marginBottom: 'theme(spacing.6)',
            },

            '@media (min-width: theme(screens.d))': {
              marginBottom: 'theme(spacing.10)',
            },

            '@media (min-width: theme(screens.xxl))': {
              marginBottom: 'theme(spacing.15)',
            },
          },
        },

        '.pageMarginBottom': {
          marginBottom: 'theme(spacing.8)',

          '@media (min-width: theme(screens.t))': {
            marginBottom: 'theme(spacing.12)',
          },

          '@media (min-width: theme(screens.d))': {
            marginBottom: 'theme(spacing.20)',
          },

          '@media (min-width: theme(screens.xxl))': {
            marginBottom: 'theme(spacing.30)',
          },
        },

        '.h': {
          '&1': {
            fontSize: rem(22),
            lineHeight: '140%',
            textTransform: 'uppercase',

            '@media (min-width: theme(screens.t))': {
              fontSize: rem(40),
            },

            '@media (min-width: theme(screens.xxl))': {
              fontSize: rem(60),
            },
          },

          '&2': {
            fontSize: rem(18),
            lineHeight: '140%',
            textTransform: 'uppercase',

            '@media (min-width: theme(screens.t))': {
              fontSize: rem(32),
            },

            '@media (min-width: theme(screens.xxl))': {
              fontSize: rem(48),
            },
          },

          '&3': {
            fontSize: rem(16),
            lineHeight: '140%',
            textTransform: 'uppercase',

            '@media (min-width: theme(screens.t))': {
              fontSize: rem(20),
            },

            '@media (min-width: theme(screens.xxl))': {
              fontSize: rem(28),
            },
          },

          '&4': {
            fontSize: rem(14),
            lineHeight: '140%',
            textTransform: 'uppercase',

            '@media (min-width: theme(screens.t))': {
              fontSize: rem(16),
            },

            '@media (min-width: theme(screens.xxl))': {
              fontSize: rem(24),
            },
          },
        },

        '.t': {
          '&1': {
            lineHeight: '150%',
            fontSize: rem(16),

            '@media (min-width: theme(screens.xxl))': {
              fontSize: rem(18),
            },
          },

          '&2': {
            lineHeight: '150%',
            fontSize: rem(12),
            textTransform: 'uppercase',

            '@media (min-width: theme(screens.xl))': {
              fontSize: rem(13),
            },

            '@media (min-width: theme(screens.xxl))': {
              fontSize: rem(16),
            },
          },

          '&3': {
            lineHeight: '150%',
            fontSize: rem(14),

            '@media (min-width: theme(screens.xxl))': {
              fontSize: rem(16),
            },
          },

          '&4': {
            lineHeight: '150%',
            fontSize: rem(12),

            '@media (min-width: theme(screens.xxl))': {
              fontSize: rem(14),
            },
          },
        },
        '.loader': {
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          display: 'block',
          margin: '15px auto',
          position: 'relative',
          boxSizing: 'border-box',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    }),
    typography,
  ],
};
