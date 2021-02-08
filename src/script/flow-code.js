/**
 * 
 * @param {HTMLElement} $root
 */
export default function ($root) {
    const $flowCode = $root.querySelectorAll('.flow-code');
    const $flows = $root.querySelectorAll('.flow-code *[data-flow]');
    console.log($flowCode, $flows);
};
