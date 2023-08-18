import React, { lazy, Suspense } from 'react';

const LazyCommunities = lazy(() => import('./Communities'));

const Communities = props => (
  <Suspense fallback={null}>
    <LazyCommunities {...props} />
  </Suspense>
);

export default Communities;
