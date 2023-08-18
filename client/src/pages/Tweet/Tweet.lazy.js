import React, { lazy, Suspense } from 'react';

const LazyTweet = lazy(() => import('./Tweet'));

const Tweet = props => (
  <Suspense fallback={null}>
    <LazyTweet {...props} />
  </Suspense>
);

export default Tweet;
