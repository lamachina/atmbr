import * as React from 'react';
interface Props {
  placeholder: string;
  value: string;
  onChange: any;
}

export function InputPassword({ placeholder, value, onChange }: Props) {
  return (
    <>
      <div className="input-group mb-3">
        <input
          type="password"
          className="form-control"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
      </div>
    </>
  );
}
 