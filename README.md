# Casino Bot UI React MUI
Node : 16
## File Structure

Within the download you'll find the following directories and files:

```
vision-dashboard-react-free/
├── public
│   ├── apple-icon.png
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
└── src
    ├── assets
    │   ├── images
    │   └── theme
    │       ├── base
    │       │   ├── borders.js
    │       │   ├── boxShadows.js
    │       │   ├── breakpoints.js
    │       │   ├── colors.js
    │       │   ├── globals.js
    │       │   ├── typography.css
    │       │   └── typography.js
    │       ├── components
    │       │   ├── button
    │       │   ├── card
    │       │   ├── dialog
    │       │   ├── form
    │       │   ├── list
    │       │   ├── menu
    │       │   ├── stepper
    │       │   ├── table
    │       │   ├── tabs
    │       │   ├── appBar.js
    │       │   ├── avatar.js
    │       │   ├── breadcrumbs.js
    │       │   ├── buttonBase.js
    │       │   ├── container.js
    │       │   ├── divider.js
    │       │   ├── icon.js
    │       │   ├── iconButton.js
    │       │   ├── linearProgress.js
    │       │   ├── link.js
    │       │   ├── popover.js
    │       │   ├── slider.js
    │       │   ├── svgIcon.js
    │       │   └── tooltip.js
    │       ├── functions
    │       │   ├── boxShadow.js
    │       │   ├── gradientChartLine.js
    │       │   ├── hexToRgb.js
    │       │   ├── linearGradient.js
    │       │   ├── pxToRem.js
    │       │   ├── radialGradient.js
    │       │   ├── rgba.js
    │       │   └── tripleLinearGradient.js
    │       ├── index.js
    │       └── theme-rtl.js
    ├── components
    │   ├── VuiAlert
    │   │   ├── index.js
    │   │   ├── VuiAlertCloseIcon.js
    │   │   └── VuiAlertRoot.js
    │   ├── VuiAvatar
    │   │   ├── index.js
    │   │   └── VuiAvatarRoot.js
    │   ├── VuiBadge
    │   │   ├── index.js
    │   │   └── VuiBadgeRoot.js
    │   ├── VuiBox
    │   │   ├── index.js
    │   │   └── VuiBoxRoot.js
    │   ├── VuiButton
    │   │   ├── index.js
    │   │   └── VuiButtonRoot.js
    │   ├── VuiInput
    │   │   ├── index.js
    │   │   ├── VuiInputIconBoxRoot.js
    │   │   ├── VuiInputIconRoot.js
    │   │   ├── VuiInputIcon.js
    │   │   └── VuiInputWithIconRoot.js
    │   ├── VuiPagination
    │   │   ├── index.js
    │   │   └── VuiPaginationItemRoot.js
    │   ├── VuiProgress
    │   │   ├── index.js
    │   │   └── VuiProgressRoot.js
    │   ├── VuiSwitch
    │   │   ├── index.js
    │   │   └── VuiSwitchRoot.js
    │   └── VuiTypography
    │       ├── index.js
    │       └── VuiTypographyRoot.js
    ├── context
    │   └── index.js
    ├── examples
    │   ├── Breadcrumbs
    │   │   └── index.js
    │   ├── Calendar
    │   │   ├── CalendarRoot.js
    │   │   └── index.js
    │   ├── Cards
    │   │   ├── InfoCards
    │   │   │   └── index.js
    │   │   ├── MasterCard
    │   │   │   └── index.js
    │   │   ├── ProjectCards
    │   │   │   └── index.js
    │   │   └── StatisticsCards
    │   │      └── index.js
    │   ├── Charts
    │   │   ├── BarCharts
    │   │   │   └── BarChart.js
    │   │   └── LineCharts
    │   │       └── LineChart.js
    │   ├── Configurator
    │   │   ├── ConfiguratorRoot.js
    │   │   └── index.js
    │   ├── Footer
    │   │   └── index.js
    │   ├── GradientBorder
    │   │   ├── GradientBorderRoot.js
    │   │   └── index.js
    │   ├── Icons
    │   ├── Items
    │   │   ├── index.js
    │   │   └── styles.js
    │   ├── LayoutContainers
    │   │   ├── DashboardLayout
    │   │   │   └── index.js
    │   │   └── PageLayout
    │   │       └── index.js
    │   ├── Lists
    │   │   └── index.js
    │   ├── Navbars
    │   │   ├── DashboardNavbar
    │   │   │   ├── index.js
    │   │   │   └── styles.js
    │   │   ├── DefaultNavbar
    │   │   │   ├── DefaultNavbarLink.js
    │   │   │   ├── DefaultNavbarMobile.js
    │   │   │   └── index.js
    │   ├── Scrollbar
    │   │   └── index.js
    │   ├── Sidenav
    │   │   ├── styles
    │   │   │   ├── sidenav.js
    │   │   │   ├── sidenavCard.js
    │   │   │   └── sidenavCollapse.js
    │   │   ├── index.js
    │   │   ├── SidenavCard.js
    │   │   ├── SidenavCollapse.js
    │   │   └── SidenavRoot.js
    │   ├── Tables
    │   │   └── index.js
    │   └── Timeline
    │       ├── context
    │       │   └── index.js
    │       ├── TimelineItem
    │       │   ├── index.js
    │       │   └── styles.js
    │       └── TimelineList
    │           └── index.js
    ├── layouts
    │   ├── authentication
    │   │   ├── components
    │   │   │   ├── BasicLayout
    │   │   │   │   └── index.js
    │   │   │   ├── CoverLayout
    │   │   │   │   └── index.js
    │   │   │   ├── Footer
    │   │   │   │   └── index.js
    │   │   │   ├── IllustrationLayout
    │   │   │   │   └── index.js
    │   │   │   ├── Separator
    │   │   │   │   └── index.js
    │   │   │   └── Socials
    │   │   │       └── index.js
    │   │   ├── sign-in
    │   │   │   └── index.js
    │   │   └── sign-up
    │   │       └── index.js
    │   ├── billing
    │   │   ├── components
    │   │   │   ├── Bill
    │   │   │   │   └── index.js
    │   │   │   ├── BillingInformation
    │   │   │   │   └── index.js
    │   │   │   ├── CreditBalance
    │   │   │   │   └── index.js
    │   │   │   ├── Invoice
    │   │   │   │   └── index.js
    │   │   │   ├── PaymentMethod
    │   │   │   │   └── index.js
    │   │   │   ├── Transaction
    │   │   │   │   └── index.js
    │   │   │   └── Transactions
    │   │   │       └── index.js
    │   │   └── index.js
    │   ├── dashboard
    │   │   ├── components
    │   │   │   ├── OrderOverview
    │   │   │   │   └── index.js
    │   │   │   ├── Projects
    │   │   │   │   └── index.js
    │   │   │   ├── RefferalTracking
    │   │   │   │   └── index.js
    │   │   │   ├── SatisfactionRate
    │   │   │   │   └── index.js
    │   │   │   └── WelcomeMark
    │   │   │       └── index.js
    │   │   ├── data
    │   │   │   ├── barChartData.js
    │   │   │   ├── barChartOptions.js
    │   │   │   ├── lineChartData.js
    │   │   │   └── lineChartOptions.js
    │   │   └── index.js
    │   ├── profile
    │   │   ├── components
    │   │   │   ├── CarInformations
    │   │   │   │   └── index.js
    │   │   │   ├── Header
    │   │   │   │   └── index.js
    │   │   │   ├── PlatformSettings
    │   │   │   │   └── index.js
    │   │   │   └── Welcome
    │   │   │       └── index.js
    │   │   ├── data
    │   │   │   ├── lineChartData1.js
    │   │   │   ├── lineChartData2.js
    │   │   │   ├── lineChartOptions1.js
    │   │   │   └── lineChartOptions2.js
    │   │   └── index.js
    │   ├── rtl
    │   │   ├── components
    │   │   │   ├── OrderOverview
    │   │   │   │   └── index.js
    │   │   │   ├── Projects
    │   │   │   │   └── index.js
    │   │   │   ├── RefferalTracking
    │   │   │   │   └── index.js
    │   │   │   ├── SatisfactionRate
    │   │   │   │   └── index.js
    │   │   │   └── WelcomeMark
    │   │   │       └── index.js
    │   │   ├── data
    │   │   │   ├── barChartData.js
    │   │   │   ├── barChartOptions.js
    │   │   │   ├── lineChartData.js
    │   │   │   └── lineChartOptions.js
    │   │   └── index.js
    │   ├── tables
    │   │   ├── data
    │   │   │   ├── authorsTableData.js
    │   │   │   └── projectsTableData.js
    │   │   └── index.js
    ├── variables
    │   └── charts.js
    ├── App.js
    ├── index.js
    ├── routes.js
    ├── .eslintrc.json
    ├── .gitignore
    ├── .prettierrc.json
    ├── CHANGELOG.md
    ├── ISSUE_TEMPLALTE.md
    ├── jsconfig.json
    ├── package-lock.json
    ├── package.json
    └── README.md
```

## Browser Support

At present, we officially aim to support the last two versions of the following browsers:

<img src="https://github.com/creativetimofficial/public-assets/blob/master/logos/chrome-logo.png?raw=true" width="64" height="64"> <img src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/firefox-logo.png" width="64" height="64"> <img src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/edge-logo.png" width="64" height="64"> <img src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/safari-logo.png" width="64" height="64"> <img src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/opera-logo.png" width="64" height="64">
