import {
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';
  
export const token = atom({
    key: 'tooken', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
  });