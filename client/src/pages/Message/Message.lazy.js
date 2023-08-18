import React, { lazy, Suspense } from 'react';

const LazyMessage = lazy(() => import('./Message'));

const Message = props => (
  <Suspense fallback={null}>
    <LazyMessage {...props} />
  </Suspense>
);

export default Message;
