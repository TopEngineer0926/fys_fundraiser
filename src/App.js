import React, { useState, useEffect, Suspense } from 'react'

// ** Router Import
import Router from './router/Router'

// ** Routes & Default Routes
import { getRoutes } from './router/routes'

// ** Hooks Imports
import { useLayout } from '@hooks/useLayout'

import ReactGA from 'react-ga'
const TRACKING_ID = "G-83WE5NQCFK" // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID)

import Bugsnag from '@bugsnag/js'
import BugsnagPluginReact from '@bugsnag/plugin-react'

Bugsnag.start({
  apiKey: '729aaf5d2b6ba1ee3d3cc526d3d5ba76',
  plugins: [new BugsnagPluginReact()]
})

// import * as Sentry from "@sentry/react"
// import { BrowserTracing } from "@sentry/tracing"

// Sentry.init({
//   dsn: "https://ca6dd875b408416396715eea0bf7a5b4@o1247717.ingest.sentry.io/6407715",
//   integrations: [new BrowserTracing()],

//   // Set tracesSampleRate to 1.0 to capture 100%
//   // of transactions for performance monitoring.
//   // We recommend adjusting this value in production
//   tracesSampleRate: 1.0
// }) 

const App = () => {
  const [allRoutes, setAllRoutes] = useState([])

  // ** Hooks
  const { layout } = useLayout()

  const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React)

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search)

    setAllRoutes(getRoutes(layout))
  }, [layout])

  return (
    <ErrorBoundary>
    <Suspense fallback={null}>
      <Router allRoutes={allRoutes} />
    </Suspense>
    </ErrorBoundary>
  )
}

export default App
