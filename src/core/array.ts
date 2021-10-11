import curry from './curry';

const map = curry((callback: any, array: any[]) => array.map(callback), 2);

export {map};
