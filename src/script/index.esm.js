import Reveal from '../lib/reveal.js/dist/reveal.esm.js';
import Highlight from '../lib/reveal.js/plugin/highlight/highlight.esm.js';
import insertCode from './insert-code.js';
import flowCode from './flow-code.js';

async function main() {
    const $root = document.querySelector('#container');
    insertCode($root);
    flowCode($root);

    Reveal.initialize({
        plugins: [Highlight],
        slideNumber: true,
    });
}

main();
