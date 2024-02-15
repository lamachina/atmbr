import * as React from 'react';
import { ProfileOverview } from './ProfileOverview';

export function Profile() {
  return (
    <div className="container px-3">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <ProfileOverview />
        </div>
      </div>
    </div>
  );
}
