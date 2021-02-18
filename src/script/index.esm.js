import Reveal from '../lib/reveal.js/dist/reveal.esm.js';
import Highlight from '../lib/reveal.js/plugin/highlight/highlight.esm.js';
import insertCode from './insert-code.js';
import flowCode from './flow-code.js';

async function main() {
    insertCode(document.querySelector('#container'));

    flowCode(document.querySelector('#flowCode'), [{ begin: 0, end: 5, color: '#f66' }, { begin: 10, end: 15, color: '#66f' }, { begin: 20, end: 23, color: '#f6f' }]);

    Reveal.initialize({
        plugins: [Highlight],
        slideNumber: true,
    });
}

main();
