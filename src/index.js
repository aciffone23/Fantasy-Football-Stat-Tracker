import Example from './scripts/example';
import Example from './scripts/default';
import Example from './scripts/filter';

document.addEventListener('DOMContentLoaded', () => {
    console.log('hello world');

    const main = document.getElementById('main');
    new Example(main)
})