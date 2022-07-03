import React, { FC } from 'react';
import './Explorer.css'
export type ExplorerProps = {
  value: string
  placeholder: string
  onchange: any
  onKeyPress: any
  onFocus: any
}

export const Explorer: FC<ExplorerProps> = () => {
  return <div className='explorer'>explorer test from github</div>;
};

export default Explorer;
