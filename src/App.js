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

const App = () => {
  const [allRoutes, setAllRoutes] = useState([])

  // ** Hooks
  const { layout } = useLayout()

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search)
    setAllRoutes(getRoutes(layout))
  }, [layout])

  return (
    <Suspense fallback={null}>
      <Router allRoutes={allRoutes} />
    </Suspense>
  )
}

export default App
