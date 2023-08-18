import React, { lazy, Suspense } from 'react';

const LazySearch = lazy(() => import('./Search'));

const Search = props => (
  <Suspense fallback={null}>
    <LazySearch {...props} />
  </Suspense>
);

export default Search;
