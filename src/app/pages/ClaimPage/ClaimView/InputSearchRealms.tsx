import * as React from 'react';

interface Props {
  placeholder: string;
  value: string;
  onChange: any;
}

export function InputSearchRealms({ placeholder, value, onChange }: Props) {
  return (
    <>
      <div className="input-group mb-3">
        <span className="input-group-text" id="realm-addon">
          +
        </span>
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          aria-label="realmname"
          aria-describedby="realm-addon"
          onChange={onChange}
        />
      </div>
    </>
  );
}
 