/**
 * @typedef FlowArg
 * @property {number} begin
 * @property {number} end
 * @property {string} color
 * @property {number} [duration=1000]
 */
/**
 * @param {HTMLElement} $root
 * @param {FlowArg[]} flowArgs
 * @param {string} [attrKey='data-flow']
 */
export default function ($root, flowArgs, attrKey = 'data-flow') {
    const $style = document.createElement('style');
    $style.id = 'flowCodeStyle';
    $root.parentNode.appendChild($style);

    const $play = document.createElement('a');
    $play.id = 'flowCodePlay';
    $play.href = 'javascript:void(0);';
    $play.innerText = '▶️';
    $play.style.display = 'absolute';
    $play.style.float = 'right';
    $play.style.right = '1em';
    $play.style.bottom = '3em';
    $root.parentNode.appendChild($play);

    let flowIndex = 0;
    let timer;
    $play.addEventListener('click', () => {
        const { begin, end, color, duration = 1000 } = flowArgs[flowIndex++ % flowArgs.length];

        let index = begin;
        function flow() {
            $style.innerHTML = `*[${attrKey}="${index}"] { background-color: ${color}; color: #fff; } *[${attrKey}] { transition: background-color ${duration}ms ease-in-out; }`;
            if (index++ < end) timer = setTimeout(flow, duration);
        }
        timer && clearTimeout(timer);
        flow();
    });
};
