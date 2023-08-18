import React, { lazy, Suspense } from 'react';

const LazyBookmark = lazy(() => import('./Bookmark'));

const Bookmark = props => (
  <Suspense fallback={null}>
    <LazyBookmark {...props} />
  </Suspense>
);

export default Bookmark;
