import React, { lazy, Suspense } from 'react';

const LazyExplore = lazy(() => import('./Explore'));

const Explore = props => (
  <Suspense fallback={null}>
    <LazyExplore {...props} />
  </Suspense>
);

export default Explore;
