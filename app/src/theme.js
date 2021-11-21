import { css } from 'bumbag';

const theme = {
  global: {
    fontSize: 18,
    styles: {
      base: css`
        html,
        body {
          background-color: white;
          color: primary;
        }
      `
    }
  },
  fonts: {
    default: 'TT NORMS'
  },
  palette: {
    primary: '#011A41',
    secondary: '#FFB800',
    success: "#B8F3A2",
    offline: "#F7E894",
    "muted": '#417CD7',
    "light": '#0C47A1',
    "bg": "#C9C9EB",
    "bg2": "#C7D8F3",
    "ws": "#1BD741",
    body: "#F3F3F8",
    btn: "#C8D8F2",
    span: "#909090",
    white: "#FFFFFF"
  },
  breakpoints: {
    sm: (rule) => `@media (min-width: 640px)  { ${rule} }`,
    md: (rule) => `@media (min-width: 768px)  { ${rule} }`,
    lg: (rule) => `@media (min-width: 1024px) { ${rule} }`,
    xl: (rule) => `@media (min-width: 1280px) { ${rule} }`,
    xxl: (rule) => `@media (min-width: 1536px) { ${rule} }`,
  },
  Button: {
    defaultProps: {
      palette: 'primary'

    }
  },
  Heading: {
    styles: {
      base: {
        color: 'primary',
      },
      variants: {
        dope: {
          defaultProps: {
            fontFamily: 'TT NORMS'
          }
        }
      }
    }
  },
  Tabs: {
    List: {
      styles: {
        base: {
          color: "white"
        },
      }
    },
    Tab: {
      styles: {
        selected: {
          color: "white"
        },
        hover: {
          color: "secondary"
        }
      }
    }
  },
  DropdownMenu: {
    Popover: {
      styles: {
        base: {
          background: "#0C47A1"
        }
      }
    }
  },
  icons: {
    icons: {
      calendar: {
        viewBoxWidth: 16,
        viewBoxHeight: 16,
        paths: ['M11 3c.6 0 1-.5 1-1V1c0-.6-.4-1-1-1s-1 .4-1 1v1c0 .5.4 1 1 1zm3-2h-1v1c0 1.1-.9 2-2 2s-2-.9-2-2V1H6v1c0 1.1-.9 2-2 2s-2-.9-2-2V1H1c-.6 0-1 .5-1 1v12c0 .6.4 1 1 1h13c.6 0 1-.4 1-1V2c0-.6-.5-1-1-1zM5 13H2v-3h3v3zm0-4H2V6h3v3zm4 4H6v-3h3v3zm0-4H6V6h3v3zm4 4h-3v-3h3v3zm0-4h-3V6h3v3zM4 3c.6 0 1-.5 1-1V1c0-.6-.4-1-1-1S3 .4 3 1v1c0 .5.4 1 1 1z']
      },
      filter: {
        viewBoxWidth: 34,
        viewBoxHeight: 38,
        paths: ['M11.9466 18.7584C12.5385 19.6149 12.3616 18.9012 12.3616 35.9733C12.3616 37.501 14.1046 38.3754 15.333 37.4616C20.5824 33.5038 21.6312 33.1611 21.6312 31.3098C21.6312 18.8691 21.4862 19.5687 22.0461 18.7584L30.5704 7.1553H3.42236L11.9466 18.7584Z', 'M33.7902 1.11242C33.4856 0.529023 32.8882 0.166328 32.2306 0.166328H1.76165C0.341406 0.166328 -0.494262 1.76844 0.320439 2.93251C0.327134 2.9437 0.227963 2.80796 1.80064 4.9483H32.1915C33.5317 3.12431 34.4276 2.33624 33.7902 1.11242Z']
      },
      ticket: {
        viewBoxWidth: 32,
        viewBoxHeight: 32,
        paths: [
          'M8.24456 29.863H6.67119C6.32911 29.863 6.05176 30.1403 6.05176 30.4824C6.05176 30.8245 6.32911 31.1018 6.67119 31.1018H8.24456C8.58664 31.1018 8.86399 30.8245 8.86399 30.4824C8.86399 30.1403 8.58664 29.863 8.24456 29.863Z',
          'M12.1225 29.863H10.5491C10.207 29.863 9.92969 30.1403 9.92969 30.4824C9.92969 30.8245 10.207 31.1018 10.5491 31.1018H12.1225C12.4646 31.1018 12.7419 30.8245 12.7419 30.4824C12.7419 30.1403 12.4646 29.863 12.1225 29.863Z',
          'M16.0004 29.863H14.4271C14.085 29.863 13.8076 30.1403 13.8076 30.4824C13.8076 30.8245 14.085 31.1018 14.4271 31.1018H16.0004C16.3425 31.1018 16.6198 30.8245 16.6198 30.4824C16.6198 30.1403 16.3425 29.863 16.0004 29.863Z',
          'M19.8774 29.863H18.304C17.9619 29.863 17.6846 30.1403 17.6846 30.4824C17.6846 30.8245 17.9619 31.1018 18.304 31.1018H19.8774C20.2195 31.1018 20.4968 30.8245 20.4968 30.4824C20.4968 30.1403 20.2195 29.863 19.8774 29.863Z',
          'M23.767 29.863H23.7546H22.1937C21.8516 29.863 21.5742 30.1403 21.5742 30.4824C21.5742 30.8245 21.8516 31.1018 22.1937 31.1018H23.767C24.1091 31.1018 24.3864 30.8245 24.3864 30.4824C24.3864 30.1403 24.1091 29.863 23.767 29.863Z',
          'M30.5815 0.898193H1.41851C0.636469 0.9016 0.00340689 1.53466 0 2.3167V7.85445C0.00340689 8.63648 0.636469 9.26954 1.41851 9.27295H4.10066V30.4824C4.10066 30.8245 4.37801 31.1018 4.72009 31.1018C5.06218 31.1018 5.33953 30.8245 5.33953 30.4824V7.1421C5.33953 6.33474 5.99404 5.68023 6.80139 5.68023H25.6384C25.3558 6.11546 25.2052 6.62316 25.2048 7.1421L25.1676 30.4824C25.1676 30.8245 25.445 31.1018 25.7871 31.1018C26.1292 31.1018 26.4065 30.8245 26.4065 30.4824L26.4437 9.27915H30.5815C31.3635 9.27574 31.9966 8.64268 32 7.86064V2.3167C31.9966 1.53466 31.3635 0.9016 30.5815 0.898193ZM30.7611 2.3167V7.86064C30.7611 7.95983 30.6807 8.04028 30.5815 8.04028H26.4437V7.1421C26.4437 6.33474 27.0982 5.68023 27.9055 5.68023H28.525C28.8671 5.68023 29.1444 5.40288 29.1444 5.0608C29.1444 4.71871 28.8671 4.44136 28.525 4.44136H3.32017C2.97809 4.44136 2.70074 4.71871 2.70074 5.0608C2.70074 5.40288 2.97809 5.68023 3.32017 5.68023H4.55904C4.27364 6.11445 4.12079 6.62247 4.11924 7.1421V8.04028H1.41851C1.31932 8.04028 1.23887 7.95983 1.23887 7.86064V2.3167C1.23887 2.21751 1.31932 2.13706 1.41851 2.13706H30.5815C30.6807 2.13706 30.7611 2.21751 30.7611 2.3167Z',
          'M15.6229 11.3542H8.66045C8.31837 11.3542 8.04102 11.6315 8.04102 11.9736C8.04102 12.3157 8.31837 12.5931 8.66045 12.5931H15.6229C15.965 12.5931 16.2423 12.3157 16.2423 11.9736C16.2423 11.6315 15.965 11.3542 15.6229 11.3542Z',
          'M21.7605 11.3542H18.304C17.9619 11.3542 17.6846 11.6315 17.6846 11.9736C17.6846 12.3157 17.9619 12.5931 18.304 12.5931H21.7605C22.1025 12.5931 22.3799 12.3157 22.3799 11.9736C22.3799 11.6315 22.1025 11.3542 21.7605 11.3542Z',
          'M15.6229 14.9655H8.66045C8.31837 14.9655 8.04102 15.2429 8.04102 15.5849C8.04102 15.927 8.31837 16.2044 8.66045 16.2044H15.6229C15.965 16.2044 16.2423 15.927 16.2423 15.5849C16.2423 15.2429 15.965 14.9655 15.6229 14.9655Z',
          'M21.7605 14.9655H18.304C17.9619 14.9655 17.6846 15.2429 17.6846 15.5849C17.6846 15.927 17.9619 16.2044 18.304 16.2044H21.7605C22.1025 16.2044 22.3799 15.927 22.3799 15.5849C22.3799 15.2429 22.1025 14.9655 21.7605 14.9655Z',
          'M15.6229 18.583H8.66045C8.31837 18.583 8.04102 18.8604 8.04102 19.2024C8.04102 19.5445 8.31837 19.8219 8.66045 19.8219H15.6229C15.965 19.8219 16.2423 19.5445 16.2423 19.2024C16.2423 18.8604 15.965 18.583 15.6229 18.583Z',
          'M21.7605 18.583H18.304C17.9619 18.583 17.6846 18.8604 17.6846 19.2024C17.6846 19.5445 17.9619 19.8219 18.304 19.8219H21.7605C22.1025 19.8219 22.3799 19.5445 22.3799 19.2024C22.3799 18.8604 22.1025 18.583 21.7605 18.583Z',
        ]
      },
      view: {
        viewBoxWidth: 26,
        viewBoxHeight: 26,
        paths: ['M13 5.25082C8.03242 5.25082 3.52756 7.96863 0.203437 12.3831C-0.0678122 12.7447 -0.0678122 13.25 0.203437 13.6117C3.52756 18.0314 8.03242 20.7492 13 20.7492C17.9676 20.7492 22.4724 18.0314 25.7966 13.617C26.0678 13.2553 26.0678 12.7501 25.7966 12.3884C22.4724 7.96863 17.9676 5.25082 13 5.25082ZM13.3563 18.4569C10.0588 18.6643 7.33569 15.9465 7.54311 12.6437C7.71331 9.92056 9.92053 7.71334 12.6437 7.54314C15.9412 7.33572 18.6643 10.0535 18.4569 13.3564C18.2814 16.0742 16.0742 18.2814 13.3563 18.4569ZM13.1915 15.9359C11.4151 16.0476 9.94712 14.585 10.0641 12.8086C10.1545 11.3406 11.3459 10.1546 12.8138 10.0588C14.5903 9.94715 16.0582 11.4098 15.9412 13.1862C15.8455 14.6594 14.6541 15.8455 13.1915 15.9359Z']
      },
      download: {
        viewBoxWidth: 32,
        viewBoxHeight: 32,
        paths: ['M31 22C30.448 22 30 22.448 30 23V30H2V23C2 22.448 1.552 22 1 22C0.448 22 0 22.448 0 23V31C0 31.552 0.448 32 1 32H31C31.552 32 32 31.552 32 31V23C32 22.448 31.552 22 31 22Z', 'M15.2698 23.707C15.6588 24.092 16.3098 24.096 16.6988 23.707L23.6978 16.807C24.0928 16.416 24.0918 15.783 23.6978 15.393C23.3038 15.002 22.6638 15.002 22.2698 15.393L16.9948 20.593V1C16.9948 0.448 16.5428 0 15.9848 0C15.4268 0 14.9748 0.448 14.9748 1V20.593L9.69984 15.393C9.30484 15.002 8.66584 15.002 8.27184 15.393C7.87684 15.784 7.87684 16.417 8.27184 16.807L15.2698 23.707Z']
      },
      logout: {
        viewBoxWidth: 110,
        viewBoxHeight: 110,
        paths: ['M106.559 51.5642H63.0184C61.121 51.5642 59.5811 50.0243 59.5811 48.1268C59.5811 46.2294 61.121 44.6895 63.0184 44.6895H106.559C108.456 44.6895 109.996 46.2294 109.996 48.1268C109.996 50.0243 108.456 51.5642 106.559 51.5642Z', 'M89.3721 68.7513C88.4918 68.7513 87.6123 68.4164 86.9426 67.7434C85.5999 66.3998 85.5999 64.2229 86.9426 62.8802L101.701 48.1227L86.9426 33.3644C85.5999 32.0217 85.5999 29.8448 86.9426 28.5021C88.2862 27.1585 90.4631 27.1585 91.8058 28.5021L108.993 45.689C110.336 47.0318 110.336 49.2087 108.993 50.5514L91.8058 67.7384C91.1319 68.4164 90.2524 68.7513 89.3721 68.7513V68.7513Z', 'M36.6658 110C35.6848 110 34.7541 109.862 33.8242 109.573L6.24202 100.384C2.48909 99.0731 0 95.5762 0 91.6671V9.16971C0 4.11433 4.11128 0.00305176 9.16666 0.00305176C10.1469 0.00305176 11.0775 0.140682 12.0082 0.429369L39.5896 9.61869C43.3434 10.9295 45.8316 14.4265 45.8316 18.3355V100.833C45.8316 105.888 41.7212 110 36.6658 110ZM9.16666 6.87784C7.90617 6.87784 6.87478 7.90922 6.87478 9.16971V91.6671C6.87478 92.6431 7.53021 93.5503 8.46508 93.8759L35.9181 103.024C36.1153 103.088 36.3721 103.125 36.6658 103.125C37.9263 103.125 38.9568 102.093 38.9568 100.833V18.3355C38.9568 17.3595 38.3014 16.4524 37.3665 16.1267L9.91355 6.97854C9.71634 6.91476 9.45954 6.87784 9.16666 6.87784V6.87784Z', 'M69.8936 36.6692C67.9962 36.6692 66.4562 35.1293 66.4562 33.2318V12.6075C66.4562 9.44953 63.8857 6.8782 60.7278 6.8782H9.16689C7.26944 6.8782 5.72949 5.33826 5.72949 3.44081C5.72949 1.54336 7.26944 0.00341797 9.16689 0.00341797H60.7278C67.6806 0.00341797 73.331 5.65464 73.331 12.6075V33.2318C73.331 35.1293 71.791 36.6692 69.8936 36.6692Z', 'M60.7277 96.2504H42.3944C40.497 96.2504 38.957 94.7104 38.957 92.813C38.957 90.9156 40.497 89.3756 42.3944 89.3756H60.7277C63.8857 89.3756 66.4562 86.8043 66.4562 83.6463V63.022C66.4562 61.1245 67.9961 59.5846 69.8936 59.5846C71.791 59.5846 73.331 61.1245 73.331 63.022V83.6463C73.331 90.5992 67.6806 96.2504 60.7277 96.2504V96.2504Z']
      },

      add: {
        viewBoxWidth: 24,
        viewBoxHeight: 24,
        paths: ['M21.8571 9.85714H14.5714C14.3348 9.85714 14.1429 9.66525 14.1429 9.42857V2.14286C14.1429 0.959473 13.1834 0 12 0C10.8166 0 9.85714 0.959473 9.85714 2.14286V9.42857C9.85714 9.66525 9.66525 9.85714 9.42857 9.85714H2.14286C0.959473 9.85714 0 10.8166 0 12C0 13.1834 0.959473 14.1429 2.14286 14.1429H9.42857C9.66525 14.1429 9.85714 14.3348 9.85714 14.5714V21.8571C9.85714 23.0405 10.8166 24 12 24C13.1834 24 14.1429 23.0405 14.1429 21.8571V14.5714C14.1429 14.3348 14.3348 14.1429 14.5714 14.1429H21.8571C23.0405 14.1429 24 13.1834 24 12C24 10.8166 23.0405 9.85714 21.8571 9.85714Z']
      },
      search: {
        viewBoxWidth: 24,
        viewBoxHeight: 24,
        paths: ['M10.5691 0C4.74145 0 0 4.74145 0 10.5691C0 16.3971 4.74145 21.1382 10.5691 21.1382C16.3971 21.1382 21.1382 16.3971 21.1382 10.5691C21.1382 4.74145 16.3971 0 10.5691 0ZM10.5691 19.187C5.81723 19.187 1.95122 15.321 1.95122 10.5691C1.95122 5.81728 5.81723 1.95122 10.5691 1.95122C15.321 1.95122 19.187 5.81723 19.187 10.5691C19.187 15.321 15.321 19.187 10.5691 19.187Z', 'M23.7141 22.3346L18.1205 16.7411C17.7394 16.36 17.1221 16.36 16.741 16.7411C16.3599 17.1219 16.3599 17.7398 16.741 18.1206L22.3345 23.7141C22.5251 23.9047 22.7745 24 23.0243 24C23.2737 24 23.5235 23.9047 23.7141 23.7141C24.0952 23.3333 24.0952 22.7154 23.7141 22.3346Z']
      },
      img: {
        viewBoxWidth: 36,
        viewBoxHeight: 36,
        paths: ['M31.5 22.5V27H36V30H31.5V34.5H28.5V30H24V27H28.5V22.5H31.5ZM31.512 4.5C32.334 4.5 33 5.1675 33 5.9895V19.5H30V7.5H6V28.4985L21 13.5L25.5 18V22.2435L21 17.7435L10.2405 28.5H21V31.5H4.488C4.09322 31.4996 3.71475 31.3425 3.43573 31.0632C3.15672 30.7839 3 30.4053 3 30.0105V5.9895C3.00275 5.59557 3.16035 5.21853 3.43877 4.93983C3.71719 4.66113 4.09407 4.50314 4.488 4.5H31.512ZM12 10.5C12.7956 10.5 13.5587 10.8161 14.1213 11.3787C14.6839 11.9413 15 12.7044 15 13.5C15 14.2956 14.6839 15.0587 14.1213 15.6213C13.5587 16.1839 12.7956 16.5 12 16.5C11.2044 16.5 10.4413 16.1839 9.87868 15.6213C9.31607 15.0587 9 14.2956 9 13.5C9 12.7044 9.31607 11.9413 9.87868 11.3787C10.4413 10.8161 11.2044 10.5 12 10.5Z']
      },
      edit: {
        viewBoxWidth: 26,
        viewBoxHeight: 26,
        paths: ['M21.3749 13.0499C20.7528 13.0499 20.25 13.5353 20.25 14.1332V22.7999C20.25 23.3968 19.7459 23.8832 19.1251 23.8832H3.375C2.75393 23.8832 2.25007 23.3968 2.25007 22.7999V7.63321C2.25007 7.03633 2.75393 6.54994 3.375 6.54994H12.3751C12.9972 6.54994 13.5 6.06454 13.5 5.46667C13.5 4.86861 12.9972 4.38321 12.3751 4.38321H3.375C1.51426 4.38321 0 5.84138 0 7.63321V22.7999C0 24.5918 1.51426 26.0499 3.375 26.0499H19.1251C20.9858 26.0499 22.5001 24.5918 22.5001 22.7999V14.1332C22.5001 13.5341 21.997 13.0499 21.3749 13.0499Z', 'M10.5479 12.0631C10.4692 12.1389 10.4163 12.2353 10.3938 12.3393L9.59847 16.1701C9.5614 16.3476 9.6199 16.5307 9.75256 16.6596C9.85947 16.7626 10.0035 16.8177 10.1509 16.8177C10.1868 16.8177 10.2241 16.8146 10.2612 16.807L14.2381 16.0411C14.3483 16.0193 14.4484 15.9685 14.526 15.8926L23.427 7.32124L19.4501 3.49182L10.5479 12.0631Z', 'M26.1765 0.84306C25.0798 -0.21323 23.2955 -0.21323 22.1996 0.84306L20.6427 2.3423L24.6196 6.17192L26.1765 4.67248C26.7076 4.16229 27.0001 3.4819 27.0001 2.75827C27.0001 2.03463 26.7076 1.35424 26.1765 0.84306Z']
      },
      delete: {
        viewBoxWidth: 31,
        viewBoxHeight: 31,
        paths: ['M25.6719 3.875H20.3438V2.90625C20.3438 1.30115 19.0426 0 17.4375 0H13.5625C11.9574 0 10.6562 1.30115 10.6562 2.90625V3.875H5.32812C3.99058 3.875 2.90625 4.95933 2.90625 6.29688V8.23438C2.90625 8.76943 3.33995 9.20312 3.875 9.20312H27.125C27.6601 9.20312 28.0938 8.76943 28.0938 8.23438V6.29688C28.0938 4.95933 27.0094 3.875 25.6719 3.875ZM12.5938 2.90625C12.5938 2.37223 13.0285 1.9375 13.5625 1.9375H17.4375C17.9715 1.9375 18.4062 2.37223 18.4062 2.90625V3.875H12.5938V2.90625Z', 'M4.74456 11.1406C4.57169 11.1406 4.43395 11.2851 4.44218 11.4578L5.2414 28.2318C5.31527 29.7842 6.59039 31 8.14402 31H22.8557C24.4093 31 25.6845 29.7842 25.7583 28.2318L26.5575 11.4578C26.5658 11.2851 26.428 11.1406 26.2552 11.1406H4.74456ZM19.3749 13.5625C19.3749 13.0273 19.8084 12.5938 20.3436 12.5938C20.8788 12.5938 21.3124 13.0273 21.3124 13.5625V26.1562C21.3124 26.6915 20.8788 27.125 20.3436 27.125C19.8084 27.125 19.3749 26.6915 19.3749 26.1562V13.5625ZM14.5311 13.5625C14.5311 13.0273 14.9646 12.5938 15.4999 12.5938C16.0351 12.5938 16.4686 13.0273 16.4686 13.5625V26.1562C16.4686 26.6915 16.0351 27.125 15.4999 27.125C14.9646 27.125 14.5311 26.6915 14.5311 26.1562V13.5625ZM9.68736 13.5625C9.68736 13.0273 10.1209 12.5938 10.6561 12.5938C11.1913 12.5938 11.6249 13.0273 11.6249 13.5625V26.1562C11.6249 26.6915 11.1913 27.125 10.6561 27.125C10.1209 27.125 9.68736 26.6915 9.68736 26.1562V13.5625Z']
      },
      flour: {
        viewBoxWidth: 46,
        viewBoxHeight: 46,
        paths: ['M42.1614 16.4108C44.3116 16.2238 46 14.5462 46 12.51C46 10.3495 44.0986 8.59163 41.7614 8.59163H41.611C41.4375 7.67634 40.9965 6.86775 40.3264 6.2592C39.4346 5.4492 38.1686 5.03508 36.6649 5.05859L36.3363 5.0642C31.8398 5.13931 30.9047 5.1551 23.49 1.64207C18.8097 -0.576302 13.4051 -0.545068 9.3849 1.72419C6.55971 3.31857 4.82463 5.78682 4.51963 8.59128H4.23855C1.90144 8.59128 0 10.3492 0 12.51C0 14.5462 1.68836 16.2238 3.83859 16.4108L2.93117 35.5146C0.659769 39.2063 0.101795 42.0279 1.27244 43.9038C1.86954 44.8601 3.20427 46 6.17494 46H39.8277C42.7984 46 44.1335 44.8601 44.7302 43.9038C45.9005 42.0279 45.3414 39.2056 43.0688 35.5142L42.1614 16.4108ZM1.94284 12.51C1.94284 11.3392 2.97257 10.3868 4.23855 10.3868H19.1189C19.6552 10.3868 20.0901 9.98491 20.0901 9.48901C20.0901 8.99347 19.6552 8.59163 19.1189 8.59163H6.47614C6.77773 6.42485 8.16906 4.51391 10.3975 3.2561C13.8441 1.31077 18.521 1.30445 22.6035 3.2396C30.4527 6.9583 31.7065 6.93689 36.3716 6.85898L36.6994 6.85336C37.6817 6.83757 38.4459 7.06849 38.9647 7.53947C39.2641 7.81111 39.4863 8.17505 39.6169 8.59128H26.8811C26.3448 8.59128 25.9099 8.99347 25.9099 9.48901C25.9099 9.98456 26.3448 10.3864 26.8811 10.3864H41.7614C43.0274 10.3864 44.0572 11.3392 44.0572 12.51C44.0572 13.6808 43.0274 14.6333 41.7614 14.6333H4.23855C2.97257 14.6336 1.94284 13.6811 1.94284 12.51V12.51ZM43.0468 43.0071C42.4292 43.9971 40.9554 44.2049 39.8277 44.2049H6.17494C5.04721 44.2049 3.57346 43.9971 2.95548 43.0071C2.15935 41.7317 2.79025 39.3217 4.73195 36.2214C4.81058 36.0961 4.85502 35.9554 4.86186 35.8111L5.78219 16.4287H40.2174L41.1381 35.8111C41.145 35.9557 41.1894 36.0965 41.2677 36.2214C43.2109 39.3221 43.8429 41.7321 43.0468 43.0071V43.0071Z', 'M29.2961 24.3877C28.6117 23.7546 27.558 23.6055 26.3152 23.9582C26.3296 23.7778 26.3384 23.5956 26.3384 23.4121C26.3384 20.7606 24.8627 18.6833 22.9787 18.6833C21.0963 18.6833 19.6218 20.7606 19.6218 23.4121C19.6218 23.5956 19.6305 23.7778 19.6449 23.9582C18.4021 23.6055 17.3481 23.7546 16.664 24.3877C15.673 25.3041 15.8026 26.9142 16.9238 28.603C16.8327 28.6644 16.7453 28.7318 16.664 28.8073C15.3312 30.0395 16.0787 32.5888 18.4029 34.7384C19.4828 35.734 20.7051 36.4573 21.8522 36.7802C21.9027 36.7992 21.9547 36.8164 22.0071 36.8325V39.2053C22.0071 39.7008 22.442 40.1027 22.9787 40.1027C23.5151 40.1027 23.95 39.7008 23.95 39.2053V36.8328C24.0031 36.8167 24.0556 36.7995 24.1065 36.7799C25.2547 36.457 26.4774 35.734 27.558 34.7377C29.8814 32.5888 30.6289 30.0395 29.2961 28.8073C29.2148 28.7318 29.1278 28.6644 29.0363 28.603C30.1576 26.9139 30.2875 25.3041 29.2961 24.3877V24.3877ZM27.9219 25.6564C28.1661 25.8821 28.0206 26.9399 26.9537 28.2377C26.6901 28.2773 26.4162 28.3405 26.1325 28.4311C25.4135 28.6602 24.6656 29.0456 23.9503 29.5492V27.5617C24.0453 27.4649 24.1463 27.3663 24.255 27.2645C24.6462 26.903 25.0678 26.5819 25.4906 26.3187C25.4913 26.3183 25.4921 26.318 25.4925 26.3173C25.9255 26.0481 26.36 25.8389 26.7664 25.7094C27.3859 25.5115 27.7996 25.5434 27.9219 25.6564V25.6564ZM22.9787 20.4785C23.5428 20.4785 24.3955 21.6485 24.3955 23.4121C24.3955 23.9778 24.307 24.5207 24.1399 25.0001C23.7422 25.2665 23.3521 25.5701 22.9799 25.9045C22.6084 25.5701 22.2183 25.2665 21.8199 24.9998C21.6527 24.5204 21.5646 23.9775 21.5646 23.4121C21.5646 21.6485 22.4158 20.4785 22.9787 20.4785V20.4785ZM18.0383 25.6564C18.1606 25.5434 18.5746 25.5115 19.1941 25.7094C19.5956 25.8375 20.0248 26.0432 20.4525 26.3074C20.4566 26.3102 20.4608 26.3131 20.4654 26.3159C20.8889 26.5791 21.3101 26.8995 21.7002 27.2596C21.8062 27.3589 21.9087 27.4596 22.0071 27.561V29.5474C21.2927 29.0445 20.5459 28.6599 19.8276 28.4311C19.5439 28.3405 19.2701 28.2773 19.0064 28.2377C17.9395 26.9399 17.794 25.8821 18.0383 25.6564V25.6564ZM19.7764 33.4686C18.0204 31.8448 17.7579 30.335 18.0383 30.076C18.1609 29.9626 18.5746 29.9307 19.1941 30.1279C19.9978 30.3841 20.9128 30.9509 21.7048 31.6833C21.8081 31.7784 21.9087 31.8778 22.0071 31.9788V34.923C21.2771 34.6359 20.4863 34.1231 19.7764 33.4686V33.4686ZM26.1849 33.4679C25.4739 34.1235 24.6815 34.6366 23.9503 34.9237V31.9792C24.0468 31.8809 24.1486 31.7823 24.2554 31.6833C25.0473 30.9509 25.9623 30.3841 26.766 30.1279C27.3856 29.9307 27.7996 29.9626 27.9219 30.076C28.2022 30.335 27.9397 31.8448 26.1849 33.4679Z']
      },
      arrowRight: {
        viewBoxWidth: 24,
        viewBoxHeight: 24,
        paths: ['M13.172 12L8.22198 7.04999L9.63598 5.63599L16 12L9.63598 18.364L8.22198 16.95L13.172 12Z']
      },
      key: {
        viewBoxWidth: 24,
        viewBoxHeight: 24,
        paths: ['M12.917 13C12.6623 14.4801 11.8619 15.8108 10.6739 16.7296C9.48593 17.6484 7.99666 18.0885 6.50009 17.9629C5.00352 17.8373 3.60841 17.1552 2.59016 16.0513C1.57191 14.9474 1.00452 13.5018 1 12C0.998629 10.4946 1.56319 9.0437 2.58168 7.93515C3.60017 6.8266 4.99816 6.14141 6.49828 6.01553C7.9984 5.88965 9.49103 6.33228 10.68 7.25559C11.869 8.1789 12.6675 9.51543 12.917 11H23V13H21V17H19V13H17V17H15V13H12.917ZM7 16C8.06087 16 9.07828 15.5786 9.82843 14.8284C10.5786 14.0783 11 13.0609 11 12C11 10.9391 10.5786 9.92171 9.82843 9.17157C9.07828 8.42142 8.06087 7.99999 7 7.99999C5.93914 7.99999 4.92172 8.42142 4.17158 9.17157C3.42143 9.92171 3 10.9391 3 12C3 13.0609 3.42143 14.0783 4.17158 14.8284C4.92172 15.5786 5.93914 16 7 16Z'],
      },
      email: {
        viewBoxWidth: 16,
        viewBoxHeight: 20,
        paths: ['M1 18H15V20H1V18ZM8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16ZM8 14C9.5913 14 11.1174 13.3679 12.2426 12.2426C13.3679 11.1174 14 9.5913 14 8C14 6.4087 13.3679 4.88258 12.2426 3.75736C11.1174 2.63214 9.5913 2 8 2C6.4087 2 4.88258 2.63214 3.75736 3.75736C2.63214 4.88258 2 6.4087 2 8C2 9.5913 2.63214 11.1174 3.75736 12.2426C4.88258 13.3679 6.4087 14 8 14Z'],
      },
      client: {
        viewBoxWidth: 32,
        viewBoxHeight: 32,
        paths: ['M16 14C17.3807 14 18.5 12.8807 18.5 11.5C18.5 10.1193 17.3807 9 16 9C14.6193 9 13.5 10.1193 13.5 11.5C13.5 12.8807 14.6193 14 16 14Z', 'M20.2 16H11.8C11.5878 16 11.3843 16.0843 11.2343 16.2343C11.0843 16.3843 11 16.5878 11 16.8V22.2C11 22.4122 11.0843 22.6157 11.2343 22.7657C11.3843 22.9157 11.5878 23 11.8 23H13V29.2C13 29.4122 13.0843 29.6157 13.2343 29.7657C13.3843 29.9157 13.5878 30 13.8 30H18.2C18.4122 30 18.6157 29.9157 18.7657 29.7657C18.9157 29.6157 19 29.4122 19 29.2V23H20.2C20.4122 23 20.6157 22.9157 20.7657 22.7657C20.9157 22.6157 21 22.4122 21 22.2V16.8C21 16.5878 20.9157 16.3843 20.7657 16.2343C20.6157 16.0843 20.4122 16 20.2 16V16Z', 'M5.00003 6C6.1046 6 7.00003 5.10457 7.00003 4C7.00003 2.89543 6.1046 2 5.00003 2C3.89546 2 3.00003 2.89543 3.00003 4C3.00003 5.10457 3.89546 6 5.00003 6Z', 'M8.2 8H1.8C1.58783 8 1.38434 8.08429 1.23431 8.23431C1.08429 8.38434 1 8.58783 1 8.8V13.2C1 13.4122 1.08429 13.6157 1.23431 13.7657C1.38434 13.9157 1.58783 14 1.8 14H3V19.2C3 19.4122 3.08429 19.6157 3.23431 19.7657C3.38434 19.9157 3.58783 20 3.8 20H6.2C6.41217 20 6.61566 19.9157 6.76569 19.7657C6.91571 19.6157 7 19.4122 7 19.2V14H8.2C8.41217 14 8.61566 13.9157 8.76569 13.7657C8.91571 13.6157 9 13.4122 9 13.2V8.8C9 8.58783 8.91571 8.38434 8.76569 8.23431C8.61566 8.08429 8.41217 8 8.2 8V8Z', 'M27 6C28.1046 6 29 5.10457 29 4C29 2.89543 28.1046 2 27 2C25.8955 2 25 2.89543 25 4C25 5.10457 25.8955 6 27 6Z', 'M30.2 8H23.8C23.5878 8 23.3843 8.08429 23.2343 8.23431C23.0843 8.38434 23 8.58783 23 8.8V13.2C23 13.4122 23.0843 13.6157 23.2343 13.7657C23.3843 13.9157 23.5878 14 23.8 14H25V19.2C25 19.4122 25.0843 19.6157 25.2343 19.7657C25.3843 19.9157 25.5878 20 25.8 20H28.2C28.4121 20 28.6156 19.9157 28.7657 19.7657C28.9157 19.6157 29 19.4122 29 19.2V14H30.2C30.4121 14 30.6156 13.9157 30.7657 13.7657C30.9157 13.6157 31 13.4122 31 13.2V8.8C31 8.58783 30.9157 8.38434 30.7657 8.23431C30.6156 8.08429 30.4121 8 30.2 8V8Z'],
      },
      box: {
        viewBoxWidth: 32,
        viewBoxHeight: 32,
        paths: ['M1 4H31V10H1V4ZM3 10H29V28H3V10Z', 'M22 14C22 14.5304 21.7893 15.0391 21.4142 15.4142C21.0391 15.7893 20.5304 16 20 16H12C11.4696 16 10.9609 15.7893 10.5858 15.4142C10.2107 15.0391 10 14.5304 10 14'],
      },
      pos: {
        viewBoxWidth: 32,
        viewBoxHeight: 32,
        paths: ['M7 15C8.10457 15 9 14.1046 9 13C9 11.8954 8.10457 11 7 11C5.89543 11 5 11.8954 5 13C5 14.1046 5.89543 15 7 15Z', 'M8.79999 13.9L18 18', 'M18 19C18.5523 19 19 18.5523 19 18C19 17.4477 18.5523 17 18 17C17.4477 17 17 17.4477 17 18C17 18.5523 17.4477 19 18 19Z', 'M28.25 16.6L29.35 19.7M18.5 11.3L20.6 7.99998L18.5 11.3ZM19.15 7.09998L22 8.84998L19.15 7.09998ZM22.7 14.7L26 12L22.7 14.7ZM24.85 10.65L27.15 13.35L24.85 10.65ZM25.6 19.35L28.8 18.15L25.6 19.35Z', 'M26.7 23H1M29.5 23H26.7C26.1829 20.1086 24.9254 17.4005 23.0502 15.1398C21.175 12.879 18.746 11.1426 16 10.1V2.5C16 2.10218 15.842 1.72064 15.5607 1.43934C15.2794 1.15804 14.8978 1 14.5 1H2.5C2.10218 1 1.72064 1.15804 1.43934 1.43934C1.15804 1.72064 1 2.10218 1 2.5V29.5C1 29.8978 1.15804 30.2794 1.43934 30.5607C1.72064 30.842 2.10218 31 2.5 31H29.5C29.8978 31 30.2794 30.842 30.5607 30.5607C30.842 30.2794 31 29.8978 31 29.5V24.5C31 24.1022 30.842 23.7206 30.5607 23.4393C30.2794 23.158 29.8978 23 29.5 23V23Z'],
      },
      setting: {
        viewBoxWidth: 32,
        viewBoxHeight: 32,
        paths: ['M17 24.9333C21.1237 24.9333 24.4667 21.5904 24.4667 17.4666C24.4667 13.3429 21.1237 10 17 10C12.8763 10 9.53333 13.3429 9.53333 17.4666C9.53333 21.5904 12.8763 24.9333 17 24.9333Z', 'M31.3499 14.7999C30.9908 14.7968 30.6424 14.6779 30.3564 14.461C30.0703 14.244 29.8619 13.9405 29.7621 13.5956C29.5089 12.7613 29.174 11.954 28.7621 11.1855C28.5879 10.8707 28.5199 10.508 28.5684 10.1515C28.617 9.79492 28.7794 9.46359 29.0315 9.20682C29.3402 8.89694 29.5136 8.47733 29.5136 8.03989C29.5136 7.60245 29.3402 7.18284 29.0315 6.87295L27.5952 5.43402C27.2853 5.12527 26.8657 4.95192 26.4283 4.95192C25.9908 4.95192 25.5712 5.12527 25.2613 5.43402C25.0046 5.68611 24.6732 5.84851 24.3167 5.89704C23.9602 5.94557 23.5975 5.87764 23.2827 5.70335C22.5142 5.2915 21.7069 4.95654 20.8725 4.70335C20.5275 4.60393 20.2238 4.39581 20.0065 4.10995C19.7893 3.82408 19.6701 3.47573 19.6667 3.11669C19.6658 2.6793 19.4917 2.26008 19.1824 1.9508C18.8731 1.64152 18.4539 1.4674 18.0165 1.46655H15.9835C15.5461 1.4674 15.1269 1.64152 14.8176 1.9508C14.5083 2.26008 14.3342 2.6793 14.3333 3.11669C14.3303 3.4757 14.2114 3.82414 13.9944 4.1102C13.7775 4.39626 13.474 4.60466 13.1291 4.70442C12.2947 4.95761 11.4874 5.29257 10.7189 5.70442C10.4041 5.8787 10.0414 5.94664 9.68491 5.89811C9.32836 5.84958 8.99704 5.68717 8.74027 5.43509C8.43038 5.12634 8.01077 4.95298 7.57333 4.95298C7.13589 4.95298 6.71628 5.12634 6.4064 5.43509L4.96907 6.87509C4.66032 7.18497 4.48696 7.60458 4.48696 8.04202C4.48696 8.47946 4.66032 8.89907 4.96907 9.20895C5.22115 9.46572 5.38356 9.79705 5.43209 10.1536C5.48062 10.5101 5.41268 10.8728 5.2384 11.1876C4.82655 11.9561 4.49159 12.7634 4.2384 13.5978C4.13823 13.9423 3.92958 14.2454 3.64345 14.462C3.35732 14.6786 3.00897 14.7971 2.65013 14.7999C2.21275 14.8007 1.79352 14.9749 1.48425 15.2841C1.17497 15.5934 1.00085 16.0126 1 16.45V18.4826C1.0007 18.92 1.17477 19.3394 1.48406 19.6488C1.79335 19.9582 2.21266 20.1324 2.65013 20.1332C3.00915 20.1363 3.35759 20.2552 3.64365 20.4721C3.9297 20.6891 4.1381 20.9926 4.23787 21.3375C4.49105 22.1718 4.82601 22.9791 5.23787 23.7476C5.41215 24.0624 5.48009 24.4251 5.43155 24.7816C5.38302 25.1382 5.22062 25.4695 4.96853 25.7263C4.65979 26.0362 4.48643 26.4558 4.48643 26.8932C4.48643 27.3307 4.65979 27.7503 4.96853 28.0602L6.40853 29.5002C6.71842 29.8089 7.13803 29.9823 7.57547 29.9823C8.01291 29.9823 8.43252 29.8089 8.7424 29.5002C8.99917 29.2481 9.3305 29.0857 9.68704 29.0371C10.0436 28.9886 10.4063 29.0565 10.7211 29.2308C11.4896 29.6427 12.2969 29.9776 13.1312 30.2308C13.4753 30.3309 13.7781 30.5391 13.9946 30.8247C14.2112 31.1103 14.3299 31.458 14.3333 31.8164C14.3342 32.2538 14.5083 32.673 14.8176 32.9823C15.1269 33.2916 15.5461 33.4657 15.9835 33.4666H18.016C18.4535 33.4658 18.8728 33.2918 19.1822 32.9825C19.4916 32.6732 19.6658 32.2539 19.6667 31.8164C19.6698 31.4574 19.7886 31.109 20.0056 30.8229C20.2226 30.5369 20.526 30.3285 20.8709 30.2287C21.7053 29.9755 22.5126 29.6405 23.2811 29.2287C23.5959 29.0544 23.9586 28.9865 24.3151 29.035C24.6716 29.0835 25.003 29.2459 25.2597 29.498C25.5696 29.8068 25.9892 29.9801 26.4267 29.9801C26.8641 29.9801 27.2837 29.8068 27.5936 29.498L29.0336 28.0607C29.3423 27.7508 29.5157 27.3312 29.5157 26.8938C29.5157 26.4563 29.3423 26.0367 29.0336 25.7268C28.7815 25.4701 28.6191 25.1387 28.5706 24.7822C28.522 24.4256 28.59 24.063 28.7643 23.7482C29.1761 22.9797 29.5111 22.1724 29.7643 21.338C29.8638 20.9934 30.0719 20.69 30.3575 20.473C30.6431 20.2559 30.9911 20.1368 31.3499 20.1332C31.7873 20.1324 32.2065 19.9583 32.5158 19.649C32.825 19.3397 32.9992 18.9205 33 18.4831V16.45C32.9992 16.0126 32.825 15.5934 32.5158 15.2841C32.2065 14.9749 31.7873 14.8007 31.3499 14.7999V14.7999Z'],
      },
      main: {
        viewBoxWidth: 32,
        viewBoxHeight: 32,
        paths: ['M21.3334 24V26.6667H6.6667V24H21.3334ZM28 14.6667V17.3334H4.00003V14.6667H28ZM25.3334 5.33337V8.00004H10.6667V5.33337H25.3334Z '],
      },
      main3: {
        viewBoxWidth: 32,
        viewBoxHeight: 32,
        paths: ['M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z']
      },
      ws: {
        viewBoxWidth: 26,
        viewBoxHeight: 26,
        paths: ['M0.410645 25.6031L2.17403 19.3401C1.04007 17.4137 0.443032 15.2218 0.443032 12.9702C0.443032 6.0373 6.08336 0.396973 13.0163 0.396973C19.9492 0.396973 25.5894 6.0373 25.5894 12.9702C25.5894 19.9031 19.9492 25.5434 13.0163 25.5434C10.856 25.5434 8.74072 24.9905 6.86943 23.9405L0.410645 25.6031ZM7.19962 21.6531L7.58448 21.8881C9.21602 22.8841 11.0943 23.4106 13.0163 23.4106C18.7731 23.4106 23.4566 18.727 23.4566 12.9702C23.4566 7.21336 18.7731 2.52981 13.0163 2.52981C7.25942 2.52981 2.57587 7.21336 2.57587 12.9702C2.57587 14.9761 3.14597 16.924 4.22439 18.6033L4.48357 19.0069L3.46811 22.6136L7.19962 21.6531Z', 'M9.48433 7.11822L8.66848 7.07374C8.41222 7.05976 8.16086 7.14539 7.96717 7.31365C7.57165 7.65711 6.93922 8.32114 6.74498 9.18644C6.45531 10.4766 6.90296 12.0565 8.06157 13.6364C9.22017 15.2163 11.3793 17.7441 15.1973 18.8237C16.4277 19.1716 17.3955 18.9371 18.1422 18.4594C18.7336 18.0811 19.1413 17.4738 19.2883 16.7874L19.4185 16.179C19.4599 15.9856 19.3617 15.7894 19.1821 15.7066L16.4248 14.4357C16.2458 14.3532 16.0336 14.4053 15.9132 14.5613L14.8307 15.9646C14.749 16.0706 14.609 16.1126 14.4826 16.0682C13.7413 15.8077 11.2582 14.7678 9.89573 12.1433C9.83664 12.0294 9.85133 11.8913 9.93515 11.7942L10.9697 10.5974C11.0753 10.4752 11.102 10.3034 11.0385 10.1549L9.84999 7.37424C9.78672 7.2262 9.64492 7.12699 9.48433 7.11822Z']
      }
    }
  }
};

export default theme;