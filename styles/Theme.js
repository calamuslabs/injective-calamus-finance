import {extendTheme} from '@chakra-ui/react';

const components = {
    LayoutContainer: {
        baseStyle: ({colorMode}) => ({
            // bg: colorMode === 'light' ? 'gray.100' : 'gray.900',
            minH: "100vh"
        })
    },
    ContentContainer: {
        baseStyle: ({colorMode}) => ({
            transition: "0.5s ease",
            ml: {base: 0, md: 260},
            p: {base: 6, md: 6}
        })
    },
    ContentContainerCollapse: {
        baseStyle: ({colorMode}) => ({
            transition: "0.5s ease",
            ml: {base: 0, md: 110},
            p: {base: 6, md: 6}
        })
    },
    NavItemContainer: {
        baseStyle: ({colorMode}) => ({
            align: "center",
            p: "0.75rem 0 0.75rem 3px",
            pr: '0',
            mx: "4",
            h: "52px",
            mt: '4px',
            mb: '4px',
            borderRadius: "12px",
            role: "group",
            cursor: "pointer",
            _hover: {
                bg: 'linear-gradient(25deg, #007ADF 0%, #00ECBC 100%)',
                color: 'white',
            }
        }),
    },
    NavItemDisabledContainer: {
        baseStyle: ({colorMode}) => ({
            align: "center",
            p: "0.75rem 0 0.75rem 3px",
            pr: '0',
            mx: "4",
            h: "52px",
            mt: '4px',
            mb: '4px',
            borderRadius: "12px",
            role: "group",
            bg: 'white'
        }),
    },
    NavItemDisabled: {
        baseStyle: ({colorMode}) => ({
            align: "center",
            p: "0.75rem 0 0.75rem 3px",
            pr: '0',
            mx: "4",
            h: "52px",
            mt: '4px',
            // mb: '4px',
            borderRadius: "12px",
            role: "group",
            cursor: "pointer",
            position: "absolute",
            bottom: "0",
            _hover: {
                bg: 'white',
                color: 'white',
            }
        }),
    },
    NavItemText: {
        baseStyle: ({colorMode}) => ({
            fontSize: '18px',
            fontWeight: '500',
            lineHeight: '27px',
            display: {base: 'none', md: 'block'},

        })
    },
    NavItemTextSelected: {
        baseStyle: ({colorMode}) => ({
            color: "white",
            fontSize: '18px',
            fontWeight: '500',
            lineHeight: '27px',
            display: {base: 'none', md: 'block'}
        })
    },
    NavItemTextDisabled: {
        baseStyle: ({colorMode}) => ({
            color: "gray",
            fontSize: '18px',
            fontWeight: '500',
            lineHeight: '27px'
        })
    },
    NavItemBadge: {
        baseStyle: ({colorMode}) => ({
            fontSize: '12px',
            fontWeight: '500',
            lineHeight: '18px',
            borderRadius: '10px'
        })
    },
    SocialContent: {
        baseStyle: ({colorMode}) => ({
            w: 200
        })
    },
    SocialContentTitle: {
        baseStyle: ({colorMode}) => ({fontSize: 16, fontWeight: 400, lineHeight: '24px'})
    }, SocialItemContainer: {
        baseStyle: ({colorMode}) => ({alignItems: 'baseline', mt: 2})
    },
    SocialItem: {
        baseStyle: ({colorMode}) => ({fontSize: 14, fontWeight: 400, lineHeight: '21px'})
    },
    SidebarDivider: {
        baseStyle: ({colorMode}) => ({
            w: '80%',
            m: 'auto',
            mt: '4px',
            mb: '4px',
        })
    },
    SidebarContent: {
        baseStyle: ({colorMode}) => ({
            transition: "0.5s ease",
            bg: colorMode === 'light' ? 'white' : 'gray.900',
            borderRight: "1px",
            borderRightColor: colorMode === 'light' ? 'gray.200' : 'gray.700',
            w: {base: 'full', md: 260},
            pos: "fixed",
            h: "full"
        })
    },
    SidebarContentCollapse: {
        baseStyle: ({colorMode}) => ({
            transition: "0.5s ease",
            bg: colorMode === 'light' ? 'white' : 'gray.900',
            borderRight: "1px",
            borderRightColor: colorMode === 'light' ? 'gray.200' : 'gray.700',
            w: {base: 'full', md: 77},
            pos: "fixed",
            h: "full"
        })
    },
    SidebarLogoContainer: {
        baseStyle: ({colorMode}) => ({
            h: "20",
            alignItems: "center",
            mx: '4',
            justifyContent: "space-between",
            mt: '25px',
            mb: '25px'
        })
    },
    SidebarLogoCollapseContainer: {
        baseStyle: ({colorMode}) => ({
            h: "20",
            alignItems: "center",
            justifyContent: "center",
            mt: '25px',
            mb: '25px'
        })
    },
    HeaderContainer: {
        baseStyle: ({colorMode}) => ({
            transition: "0.5s ease",
            ml: {base: 0, md: 60},
            px: {base: 6, md: 12},
            height: "20",
            alignItems: "center",
            bg: colorMode === 'light' ? 'white' : 'gray.900',
            borderBottomWidth: "1px",
            borderBottomColor: colorMode === 'light' ? 'gray.200' : 'gray.700',
            justifyContent: {base: 'space-between', md: 'space-between'},
        })
    },
    HeaderContainerCollapse: {
        baseStyle: ({colorMode}) => ({
            transition: "0.5s ease",
            ml: {base: 0, md: 77},
            px: {base: 6, md: 12},
            height: "20",
            alignItems: "center",
            bg: colorMode === 'light' ? 'white' : 'gray.900',
            borderBottomWidth: "1px",
            borderBottomColor: colorMode === 'light' ? 'gray.200' : 'gray.700',
            justifyContent: {base: 'space-between', md: 'space-between'},
        })
    },
    HeaderTitle: {
        baseStyle: ({colorMode}) => ({
            display: {base: 'none', md: 'flex'},
            fontSize: '30px',
            lineHeight: '45px',
            fontWeight: '500'
        })
    },
    OpenMenuMobile: {
        baseStyle: ({colorMode}) => ({
            display: {base: 'flex', md: 'none'},
        })
    },
    NewStreamButtonContainer: {
        baseStyle: ({colorMode}) => ({
            spacing: {base: '0', md: '6'}
        })
    },
    NewStreamButton: {
        baseStyle: ({colorMode}) => ({
            px: '5',
            pt: '6',
            pb: '6',
            borderRadius: '12px',
            transition: '1s',
            bg: 'linear-gradient(25deg, #007ADF 0%, #00ECBC 100%)',
            color: colorMode === 'light' ? 'white' : 'black',
            _hover: {
                transition: '1s',
                bg: 'linear-gradient(135deg, #0024FF 0%, #00C1FF 95%)'
            }
        })
    },
    NewStreamButtonText: {
        baseStyle: ({colorMode}) => ({
            fontSize: '16px',
            textTransform: 'uppercase',
            fontWeight: 600
        })
    },
    NetworkName: {
        baseStyle: ({colorMode}) => ({
            textAlign: 'center',
            fontWeight: '400',
            fontSize: '14px',
            lineHeight: '21px',
            whiteSpace: 'normal'
        })
    },
    SwitchNetContainer: {
        baseStyle: ({colorMode}) => ({bg: '#EDEDED', borderRadius: '36px', p: '4px 10px'})
    },
    NetworkModalHeadAction: {
        baseStyle: ({colorMode}) => ({
            justifyContent: 'space-between', w: '100%'
        })
    },
    NetworkSelectContainer: {
        baseStyle: ({colorMode}) => ({
            py: "2",
            transition: "all 0.3s",
            _focus: {boxShadow: 'none'}
        })
    },
    NetworkSelectButton: {
        baseStyle: ({colorMode}) => ({
            px: '5',
            pt: '6',
            pb: '6',
            borderRadius: '12px',
            backgroundColor: '#F9F9F9'
        })
    },
    NetworkSelectInfo: {
        baseStyle: ({colorMode}) => ({
            display: {base: 'none', md: 'flex'},
            alignItems: "flex-start",
            spacing: "1px",
            ml: "2"
        })
    },
    NetworkSelectName: {
        baseStyle: ({colorMode}) => ({
            fontSize: "16px",
            fontWeight: '500',
            alignItems: 'center'
        })
    },
    NetworkSelectId: {
        baseStyle: ({colorMode}) => ({
            fontSize: "xs",
            color: "gray.600",
            fontWeight: 600,
            marginTop: '0 !important',
            ml: 0
        })
    },
    NetworkSelectOptionContainer: {
        baseStyle: ({colorMode}) => ({
            bg: colorMode === 'light' ? 'white' : 'gray.900',
            borderColor: colorMode === 'light' ? 'gray.200' : 'gray.700',

        })
    },
    NetworkSelectOption: {
        baseStyle: ({colorMode}) => ({
            w: '100%'
        })
    },
    MobileNoticeContainer: {
        baseStyle: ({colorMode}) => ({margin: "auto", padding: "25px", textAlign: "center"})
    },
    StatisticCard: {
        baseStyle: ({colorMode}) => ({
            p: 8,
            borderRadius: '12px',
            bg: 'white',
            rowSpan: 1,
            colSpan: 1
        })
    },
    StatisticCardTitle: {
        baseStyle: ({colorMode}) => ({
            fontSize: '18px',
            lineHeight: '27px',
            fontWeight: '600',
            color: '#888888',
            textTransform: 'uppercase'
        })
    },
    StatisticCardSubTitle: {
        baseStyle: ({colorMode}) => ({
            fontSize: '26px',
            lineHeight: '39px',
            fontWeight: '600',
            color: '#222222',
        })
    },
    FormContainer: {
        baseStyle: ({colorMode}) => ({
            gap: 6,
            w: 'full',
            gridTemplateColumns: {
                lg: '2fr 1fr'
            },
            position: {
                lg: 'relative'
            }
        })
    },
    FormData: {
        baseStyle: ({colorMode}) => ({
            alignItems: 'left',
            borderRadius: '12px',
            bg: 'white',
            minW: 'min',
            px: {
                md: 8,
                lg: 16,
            },
            py: 6
        })
    },
    DepositFormWrapper: {
        baseStyle: ({colorMode}) => ({
            alignItems: 'left',
            borderRadius: '12px',
            bg: 'white',
            minW: 'min',
            px: {
                md: 16,
                lg: 32,
            },
            py: 12
        })
    },
    FormDeposit: {
        baseStyle: ({colorMode}) => ({
            borderRadius: '12px',
            bg: '#FBFBFB',
            px: '20px',
            py: '16px',
            alignItems: 'baseline'
            // mx: '80px'
        })
    },
    FormMain: {
        baseStyle: ({colorMode}) => ({
            borderRadius: '12px',
            bg: '#FBFBFB',
            px: '20px',
            py: '16px',
            mx: '40px'
        })
    },
    FormFlex: {
        baseStyle: ({colorMode}) => ({
            w: 'full',
            gap: 2
        })
    },
    InputForm: {
        baseStyle: ({colorMode}) => ({
            h: '48px'
        })
    },
    SearchTokenField: {
        baseStyle: ({colorMode}) => ({
            pt: 2,
            position: 'fixed',
            bgColor: 'white',
            w: '95%',
            zIndex: 100
        })
    },
    AutoCompleteAddressContainer: {
        baseStyle: ({colorMode}) => ({
            mt: 1,
            position: 'absolute',
            w: '100%',
            bg: 'white',
            zIndex: 100,
            px: 5,
            py: 2,
            borderRadius: '10px'
        })
    },
    AddressOption: {
        baseStyle: ({colorMode}) => ({_hover: {bg: '#A2CAFA', transition: 'ease 0.3'}, cursor: 'pointer'})
    },
    FormAdditional: {
        baseStyle: ({colorMode}) => ({
            alignItems: 'left',
            borderRadius: '12px',
            bg: 'white',
            px: {
                md: '60px',
                base: '20px'
            },
            w: '100%'
        })
    },
    SingleStream: {
        baseStyle: ({colorMode}) => ({
            alignItems: 'left',
            borderRadius: '12px',
            px: {
                md: '40px',
                base: '10px'
            },
            w: '100%',
            gap: "2"
        })
    },

    SingleStreamInner: {
        baseStyle: ({colorMode}) => ({
            px: {md: "20px", base: "10px"},
            bg: '#FBFBFB',
            boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
            borderRadius: '12px',
            py: '16px',
        })
    },
    BigStreamBox: {
        baseStyle: ({colorMode}) => ({
            transition: '0.3s ease',
            width: "380px",
            height: "240px",
            borderRadius: "10px",
            boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
            bg: 'white',
            _hover: {
                boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.5)",
            },
            cursor: 'pointer'
        })
    },
    StreamBox: {
        baseStyle: ({colorMode}) => ({
            width: "80px",
            height: "80px",
            borderRadius: "10px",
            boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
            bg: 'linear-gradient(25deg, #007ADF 0%, #00ECBC 100%)'
        })
    },
    FormSummary: {
        baseStyle: ({colorMode}) => ({
            alignItems: 'left',
            position: {
                lg: 'sticky',
            },
            top: '40px',
            right: 0
        })
    },
    FormLabel: {
        baseStyle: ({colorMode}) => ({
            fontSize: '14px',
            color: '#888888',
            fontWeight: '400',
        })
    },
    SectionTitle: {
        baseStyle: ({colorMode}) => ({
            fontSize: '24px',
            lineHeight: '36px',
            fontWeight: '500',
            color: '#222222',
            px: '20px',
            my: 2
        })
    },
    NewStreamTitle: {
        baseStyle: ({colorMode}) => ({
            fontSize: '24px',
            lineHeight: '36px',
            fontWeight: '500',
            color: '#222222',
            px: {
                md: '60px',
                base: '20px',
            },
            my: 2
        })
    },
    DepositTitle: {
        baseStyle: ({colorMode}) => ({
            fontSize: '24px',
            lineHeight: '36px',
            fontWeight: '500',
            color: '#222222',
            my: 2
        })
    },
    FormSelect: {
        baseStyle: ({colorMode}) => ({
            w: 'full',
            fontWeight: '400',
            h: '56px',
            bg: 'inherit'
        })
    },
    FormSelectText: {
        baseStyle: ({colorMode}) => ({
            w: 'full',
            textAlign: 'left'
        })
    },
    TokenLogo: {
        baseStyle: ({colorMode}) => ({
            w: '32px',
            h: '32px'
        })
    },
    FormIcon: {
        baseStyle: ({colorMode}) => ({
            p: 1,
            w: '32px',
            h: '32px',
            cursor: 'pointer'
        })
    },
    BalanceBox: {
        baseStyle: ({colorMode}) => ({
            bg: 'white',
            borderRadius: '12px 12px 0 0',
            pt: 2,
            pb: 4
        })
    },
    TokenBalance: {
        baseStyle: ({colorMode}) => ({
            gap: 2,
            px: '20px',
            alignItems: 'center',
        })
    },
    BalanceNumber: {
        baseStyle: ({colorMode}) => ({
            color: '#0074FD',
            fontSize: '30px',
            fontWeight: 700,
        })
    },
    SummaryBox: {
        baseStyle: ({colorMode}) => ({
            color: '#888888',
            fontSize: '16px',
            fontWeight: 400,
            px: '20px',
            bg: 'white',
            alignItems: 'left',
            py: 4,
            borderRadius: '0 0 12px 12px',
        })
    },
    SummaryTitle: {
        baseStyle: ({colorMode}) => ({
            px: '20px',
            fontWeight: 600,
            pb: 2,
            fontSize: '14px',
            color: '#888888'
        })
    },
    MediumText: {
        baseStyle: ({colorMode}) => ({
            color: '#222222',
            fontWeight: 500
        })
    },
    StrongText: {
        baseStyle: ({colorMode}) => ({
            color: '#222222',
            fontWeight: 700,
            fontSize: '18px'
        })
    },
    SummaryFlex: {
        baseStyle: ({colorMode}) => ({
            w: 'full',
            justifyContent: 'space-between'
        })
    },
    NoteLink: {
        baseStyle: ({colorMode}) => ({
            color: '#0074FD'
        })
    },
    OverviewNote: {
        baseStyle: ({colorMode}) => ({
            fontSize: 13,
            fontWeight: 400,
            lineHeight: '19.5px'
        })
    },
    SaveBar: {
        baseStyle: ({colorMode}) => ({
            boxShadow: "0px -7px 14px rgba(0, 0, 0, 0.05)",
            w: 'full',
            pt: 4,
            pb: 8,
            bg: 'white',
            borderRadius: '12px',
            position: 'sticky',
            bottom: 0,
            zIndex: 9
        })
    },
    SaveButton: {
        baseStyle: ({colorMode}) => ({
            w: '40%',
            h: '48px',
            p: '10px 20px',
            transition: '0.5s ease',
            bg: 'linear-gradient(45deg, #007ADF 0%, #00ECBC 95%)',
            color: 'white',
            _hover: {
                bg: 'linear-gradient(135deg, #0024FF 0%, #00C1FF 95%)',
                color: 'white',
            },
            borderRadius: "30px",
        })
    },
    BatchSaveButton: {
        baseStyle: ({colorMode}) => ({
            w: '25%',
            h: '48px',
            p: '5px 10px',
            transition: '0.5s ease',
            bg: 'linear-gradient(45deg, #007ADF 0%, #00ECBC 95%)',
            color: 'white',
            _hover: {
                bg: 'linear-gradient(135deg, #0024FF 0%, #00C1FF 95%)',
                color: 'white',
            },
            borderRadius: "30px",
        })
    },
    AddRecipientButton: {
        baseStyle: ({colorMode}) => ({
            w: '25%',
            h: '48px',
            p: '5px 10px',
            transition: '0.5s ease',
            bg: '#0074FD',
            color: 'white',
            _hover: {
               // bg: 'linear-gradient(135deg, #0024FF 0%, #00C1FF 95%)',
                color: 'white',
            },
            borderRadius: "30px",
        })
    },
    DepositButton: {
        baseStyle: ({colorMode}) => ({
            w: '25%',
            h: '48px',
            p: '5px 10px',
            transition: '0.5s ease',
            bg: '#0074FD',
            color: 'white',
            _hover: {
               // bg: 'linear-gradient(135deg, #0024FF 0%, #00C1FF 95%)',
                color: 'white',
            },
            borderRadius: "30px",
            m: 'auto !important'
        })
    },
    SaveIcon: {
        baseStyle: ({colorMode}) => ({
            h: '30px'
        })
    },
    PendingModalImage: {
        baseStyle: ({colorMode}) => ({
            w: '100px'
        })
    },
    PendingModalTitle: {
        baseStyle: ({colorMode}) => ({
            fontSize: '24px',
            fontWeight: 600,
            pb: 2,
            color: "#222222"
        })
    },
    PendingModalSubTitle: {
        baseStyle: ({colorMode}) => ({
            fontWeight: 500,
            fontSize: '18px',
            color: "#222222"
        })
    },
    PendingModalText: {
        baseStyle: ({colorMode}) => ({
            fontWeight: 400,
            fontSize: '15px',
            color: "#555555",
            w: 'max'
        })
    },
    PendingModalIcon: {
        baseStyle: ({colorMode}) => ({
            w: '30px',
            h: '30px'
        })
    },
    PendingModalFlex: {
        baseStyle: ({colorMode}) => ({
            alignItems: 'center',
            gap: 2,
            w: 'full'
        })
    },
    PendingModalStack: {
        baseStyle: ({colorMode}) => ({
            pb: 1,
            px: 1,
            alignItems: 'left',
            w: 'full'
        })
    },
    FaucetBox: {
        baseStyle: ({colorMode}) => ({
            w: '60%',
            bg: 'white',
            borderRadius: '12px',
            p: 20
        })
    },
    FaucetTitle: {
        baseStyle: ({colorMode}) => ({
            fontSize: '24px',
            fontWeight: '500',
            color: '#222222',
            my: 2
        })
    },
    FaucetRightElement: {
        baseStyle: ({colorMode}) => ({
            w: 'max',
            px: 2,
            fontWeight: 400,
            _focus: {
                border: 'none'
            }
        })
    },
    FaucetButton: {
        baseStyle: ({colorMode}) => ({
            mt: 4,
            mb: 10,
            bg: 'linear-gradient(65deg, #00ECBC 0%, #007ADF 95%)',
            w: '200px',
            transition: '1s',
            borderRadius: '30px',
            color: 'white',
            _hover: {
                transition: '1s',
                bg: 'linear-gradient(135deg, #0024FF 0%, #00C1FF 95%)'
            }
        })
    },
    FaucetRightButton: {
        baseStyle: ({colorMode}) => ({
            fontWeight: 500,
            _focus: {
                border: 'none'
            }
        })
    },
    FaucetText: {
        baseStyle: ({colorMode}) => ({
            fontWeight: 400,
            color: '#888888',
            fontSize: '16px',
        })
    },
    FaucetLinkBox: {
        baseStyle: ({colorMode}) => ({
            h: '56px',
            borderRadius: '8px',
            bgColor: '#F9F9F9',
            py: 3
        })
    },
    FaucetImage: {
        baseStyle: ({colorMode}) => ({
            h: 'full',
            mx: 'auto'
        })
    },
    FaucetIcon: {
        baseStyle: ({colorMode}) => ({
            position: 'absolute',
            right: '10px',
            bottom: '15px',
            fontSize: '26px'
        })
    },
    StatisticTagContainer: {
        baseStyle: ({colorMode}) => ({
            w: 'max',
            minW: '145px',
            variant: 'subtle',
            color: 'black',
            p: '6px 16px 6px 16px',
            borderRadius: '20px',
            mr: '10px',
            mt: '10px !important'
        })
    },
    StatisticTagText: {
        baseStyle: ({colorMode}) => ({
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '21px'
        })
    },
    StatisticDonutChartContainer: {
        baseStyle: ({colorMode}) => ({
            w: '180px',
            h: '180px',
            display: {base: 'none', md: 'block'}
        })
    },
    ButtonChangeTimeFormatContainer: {
        baseStyle: ({colorMode}) => ({
            bg: '#EDEDED',
            borderRadius: '50px'
        })
    },
    ButtonChangeTimeFormat: {
        baseStyle: ({colorMode}) => ({
            bg: '#EDEDED',
            borderRadius: '50px',
            color: '#555555'
        })
    },
    ButtonChangeTimeFormatSelected: {
        baseStyle: ({colorMode}) => ({
            bg: '#0074FD',
            borderRadius: '50px',
            color: '#FFFFFF'
        })
    },
    LineChartLabelContainer: {
        baseStyle: ({colorMode}) => ({
            my: 'auto', mr: 10
        })
    },
    FilterBarContainer: {
        baseStyle: ({colorMode}) => ({
            justifyContent: 'space-between',
        })
    },
    FilterItemContainer: {
        baseStyle: ({colorMode}) => ({
            justifyContent: 'space-between',
        })
    },
    RangeDatetimePickerRightContainer: {
        baseStyle: ({colorMode}) => ({
            bg: 'white',
        })
    },
    RangeDatetimePickerRightElement: {
        baseStyle: ({colorMode}) => ({
            w: '220px',
            color: '#888888'
        })
    },
    RangeDatetimePickerLeftElement: {
        baseStyle: ({colorMode}) => ({
            w: '220px',
            color: '#888888'
        })
    },
    RangeDatetimePickerRightIcon: {
        baseStyle: ({colorMode}) => ({
            h: '25px',
            w: '30px'
        })
    },
    ChangeViewButton: {
        baseStyle: ({colorMode}) => ({
            color: '#888888'
        })
    },
    IncomingStreamPageContainer: {
        baseStyle: ({colorMode}) => ({
            gridTemplateRows: 'repeat(1, 1fr)',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 6
        })
    },
    StreamFilterContainer: {
        baseStyle: ({colorMode}) => ({
            gridTemplateRows: 'repeat(1, 1fr)',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 6
        })
    },
    IncomingStreamLeftItem: {
        baseStyle: ({colorMode}) => ({
            rowSpan: 1,
            base: {
                colSpan: 4
            },
            md: {
                colSpan: 3
            }
        })
    },
    TableText: {
        baseStyle: ({colorMode}) => ({
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '21px'
        })
    },
    TableLinkText: {
        baseStyle: ({colorMode}) => ({
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '21px',
            color: 'blue',
            cursor: 'pointer'
        })
    },
    RecipientNameColumn: {
        baseStyle: ({colorMode}) => ({
            fontSize: "14px",
            fontWeight: '400',
            cursor: 'pointer'
        })
    },
    RecipientColumnContainer: {
        baseStyle: ({colorMode}) => ({
            cursor: 'pointer',
            alignItems: 'baseline',
            marginTop: 0
        })
    },
    ColumnTitle: {
        baseStyle: ({colorMode}) => ({
            fontWeight: '400',
            fontSize: '12px',
            lineHeight: '18px',
            letterSpacing: '1%',
            fontFamily: 'Poppins',
            textTransform: 'capitalize',
            color: '#888888'
        })
    },
    DateTimeColumnText: {
        baseStyle: ({colorMode}) => ({
            fontWeight: '400',
            fontSize: '13px',
            lineHeight: '19.5px',
            color: '#222222',
            mt: '0 !important'
        })
    },
    StatusColumn: {
        baseStyle: ({colorMode}) => ({
            mt: '0 !important',
        })
    },
    TooltipDatetimeTitle: {
        baseStyle: ({colorMode}) => ({
            fontWeight: '400',
            fontSize: '13px',
            lineHeight: '20px',
            color: '#555555'
        })
    },
    TooltipDatetimeContainer: {
        baseStyle: ({colorMode}) => ({bg: 'white', borderRadius: 15, w: 300})
    },
    BaselineContainer: {
        baseStyle: ({colorMode}) => ({
            alignItems: 'base-line',
        })
    },
    ProgressColumn: {
        baseStyle: ({colorMode}) => ({
            borderRadius: '11px'
        })
    },
    ActionOptionsContainer: {
        baseStyle: ({colorMode}) => ({
            borderRadius: '8px',
            paddingTop: '0.4rem',
            paddingBottom: '0.4rem',
            paddingInlineStart: '0.8rem',
            paddingInlineEnd: '0.8rem'
        })
    },
    ActionColumn: {
        baseStyle: ({colorMode}) => ({
            right: 0,
            position: 'sticky',
            bg: 'white',
            fontFamily: 'Poppins',
            textTransform: 'capitalize',
        })
    },
    ActionButton: {
        baseStyle: ({colorMode}) => ({
            w: 'full',
            fontWeight: 400,
            justifyContent: 'start',
            borderRadius: 0,
            _focus: {
                border: 'none'
            }
        })
    },
    WithdrawActionButton: {
        baseStyle: ({colorMode}) => ({
            color: 'white',
            bg: 'linear-gradient(64.08deg, #0074FD 33.63%, #2AF598 94.84%)',
            p: '10px, 30px, 10px, 30px',
            textTransform: 'uppercase',
            borderRadius: '8px',
            w: '100%',
            mt: '20px',
            fontSize: '14px'
        })
    },
    ErrorText: {
        baseStyle: ({colorMode}) => ({
            color: 'red',
            fontSize: '11px',
            fontWeight: '400',
            lineHeight: '16.5px'
        })
    },
    FakeInput: {
        baseStyle: ({colorMode}) => ({
            border: '1px',
            borderColor: 'gray.200',
            w: '100%',
            h: 'full',
            color: 'gray.500',
            fontSize: 'sm',
            pl: 3,
            py: '5px',
            cursor: 'pointer'
        })
    },
    EmptyListContainer: {
        baseStyle: ({colorMode}) => ({
            mt: '60px'
        })
    },
    EmptyListTitle: {
        baseStyle: ({colorMode}) => ({
            fontWeight: 600,
            fontSize: '24px',
            lineHeight: '36px',
            color: '#222222',
            textAlign: 'center'
        })
    },
    EmptyListSubTile: {
        baseStyle: ({colorMode}) => ({
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '24px',
            color: '#555555',
            textAlign: 'center'
        })
    },
    OnboardCard: {
        baseStyle: ({colorMode}) => ({
            bg: 'white',
            borderRadius: '12px',
            p: '21px 60px 21px 60px',
            w: 400,
            cursor: 'pointer'
        })
    },
    OnboardCardText: {
        baseStyle: ({colorMode}) => ({
            fontWeight: 500, fontSize: '20px', lineHeight: '30px', ml: 1
        })
    },
    OnboardTitle: {
        baseStyle: ({colorMode}) => ({fontWeight: 600, fontSize: '36px', lineHeight: '54px', textAlign: 'center'})
    },
    OnboardTitleLinear: {
        baseStyle: ({colorMode}) => ({
            fontWeight: 600,
            fontSize: '36px',
            lineHeight: '54px',
            textAlign: 'center',
            bg: 'linear-gradient(64.08deg, #0074FD 33.63%, #2AF598 94.84%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
        })
    },
    OnboardSubtitle: {
        baseStyle: ({colorMode}) => ({
            fontWeight: 400,
            fontSize: '20px',
            lineHeight: '30px',
            textAlign: 'center',
            color: '#333333'
        })
    },
    MarginAuto: {
        baseStyle: ({colorMode}) => ({
            m: 'auto'
        })
    },
    ConnectWalletTitle: {
        baseStyle: ({colorMode}) => ({
            fontWeight: 500,
            fontSize: '18px',
            lineHeight: '27px'
        })
    },
    NetworkItemContainer: {
        baseStyle: ({colorMode}) => ({alignItems: 'flex-start', h: 110, px: 1, py: 2, w: 80})
    },
    AddressBox: {
        baseStyle: ({colorMode}) => ({
            w: 'full',
            bg: 'white',
            borderRadius: '12px',
            p: 20
        })
    },
    TableBox: {
        baseStyle: ({colorMode}) => ({
            borderWidth: '1px',
            borderRadius: '12px',
            p: 3
        })
    },
    AddressActions: {
        baseStyle: ({colorMode}) => ({
            justifyContent: 'space-between',
            py: 3
        })
    },
    MaxInput: {
        baseStyle: ({colorMode}) => ({
            color: 'gray.400',
            mx: 2,
            w: 'max',
            h: '48px'
        })
    },
    MaxButton: {
        baseStyle: ({colorMode}) => ({
            px: 2,
        })
    }
}
const colors = {
    colors: {
        mint: {
            100: '#18DEDE'
        }
    }
}
const theme = extendTheme({components, colors})

export default theme;