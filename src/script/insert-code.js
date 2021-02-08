const codes = {
    code01: [
        [{
            code: `
            Value getValue() {
                Value value;
                // ...
                return value;
            }

            // ...
                Value val = getValue();
                handle(val);
            // ...
            `,
        }],
        [{
            code: `
            void getValue() {
                Value value;
                // ...
                <span class="erase">return value;</span>
            }

            // ...
                <span class="erase">Value val = </span>getValue();
                handle(val);
            // ...
            `,
            lineNumbers: '1,4,8',
        }],
        [{
            code: `
            void getValue() {
                Value value;
                // ...

            }

            // ...
                getValue();
                handle(<span class="error">value</span>);
            // ...
            `,
            lineNumbers: '8-9',
        }],
        [{
            code: `
            void getValue() {
                Value value;
                // ...
                handle(value);
            }

            // ...
                getValue();

            // ...
            `,
            lineNumbers: '4',
        }],
    ],

    code02: [
        [
            {
                code: `
                // 同步过程

                Value getValue() {
                    Value value;
                    // ...
                    return value;
                }

                // ...
                    Value val = getValue();
                    handle(val);
                // ...
                `,
            },
            {
                code: `
                // 异步方法

                void getValue() {
                    Value value;
                    // ...
                    handle(value);
                }

                // ...
                    getValue();
                    // handle(value);
                // ...
                `,
            },
        ],
        [
            {
                code: `
                Value getValue() {
                    Value value;
                    // ...
                    return value;
                }

                // ...
                    Value val = getValue();
                    handle1(val);
                // ...

                // ...
                    Value val = getValue();
                    handle2(val);
                // ...
                `,
                lineNumbers: '9,14',
                classList: ['fragment', 'fade-out']
            },
            {
                code: `
                void getValue() {
                    Value value;
                    // ...
                    <span class="error">handle</span>(value);
                }

                // ...
                    getValue();
                    // handle1(val);
                // ...

                // ...
                    getValue();
                    // handle2(val);
                // ...
                `,
                lineNumbers: '4,9,14',
            },
        ],
        [{
            code: `
            void getValue() {
                Value value;
                // ...
                <span class="error">handle</span>(value);
            }

            // ...
                getValue();
                // handle1(val);
            // ...

            // ...
                getValue();
                // handle2(val);
            // ...
            `,
        }],
        [{
            code: `
            void getValue(Handle handle) {
                Value value;
                // ...
                handle(value);
            }

            // ...
                getValue(<span class="error">handle</span>);
                // handle1(val);
            // ...

            // ...
                getValue(<span class="error">handle</span>);
                // handle2(val);
            // ...
            `,
            lineNumbers: '1,4,9,14',
        }],
        [{
            code: `
            void getValue(Handle handle) {
                Value value;
                // ...
                handle(value);
            }

            // ...
                getValue(val ->
                    handle1(val));
            // ...

            // ...
                getValue(val ->
                    handle2(val));
            // ...
            `,
            lineNumbers: '8-9,13-14',
        }],
        [{
            code: `
            void getValue(OnSuccess onSuccess) {
                Value value;
                // ...
                onSuccess(value);
            }

            // ...
                getValue(val ->
                    handle1(val));
            // ...

            // ...
                getValue(val ->
                    handle2(val));
            // ...
            `,
            lineNumbers: '1,4',
        }],
    ],

    code03: [
        [
            {
                code: `
                // 同步过程

                Value getValue() {
                    return value;
                }

                // ...
                    Value val = getValue();
                    handle(val);
                // ...
                `,
                fontSize: '0.8em',
            },
            {
                code: `
                // 异步回调

                void getValue(OnSuccess onSuccess) {
                    onSuccess(value);
                }

                // ...
                    getValue(val ->
                        handle(val));
                // ...
                `,
                fontSize: '0.8em',
            }
        ],
        [
            {
                code: `
                Value getValue() {
                    return value;
                }

                Other getOther() {
                    return other;
                }

                // ...
                    Value val = getValue();
                    Other oth = getOther();
                    handle([val, oth]);
                // ...
                `,
                lineNumbers: '5-7,12',
                fontSize: '0.8em',
            },
            {
                code: `
                void getValue(OnSuccess onSuccess) {
                    onSuccess(value);
                }

                void getOther(OnSuccess onSuccess) {
                    onSuccess(other);
                }

                // ...
                    getValue(val -> <span class="error">???</span>);
                    getOther(oth -> <span class="error">???</span>);
                    handle([<span class="error">???, ???</span>]);
                // ...
                `,
                lineNumbers: '10-12',
                fontSize: '0.8em',
            }
        ],
        [{
            code: `
            void getValue(OnSuccess onSuccess) {
                onSuccess(value);
            }

            // ...
                getValue(val ->
                    handle(val));
            // ...
            `,
        }],
        [{
            code: `
            Pipe getValue() {
                <span class="fragment fade-in">// 关键步骤！<span class="fragment fade-in">回调函数从参数转移到返回值！</span></span>
                return onSuccess -> onSuccess(value);
            }

            // ...
                Pipe pVal = getValue();
                pVal(val -> handle(val));
            // ...
            `,
            lineNumbers: '2-3',
        }],
        [{
            code: `
            Promise getValue() {
                // 对回调进行封装，得到最原始的Promise
                return Promise.of(value);
            }

            // ...
                Pipe pVal = getValue();
                pVal(val -> handle(val));
            // ...
            `,
            lineNumbers: '1-3',
        }],
        [{
            code: `
            Promise getValue() {
                // 对回调进行封装，得到最原始的Promise
                return Promise.of(value);
            }

            // ...
                Promise pVal = getValue();
                pVal.onSuccess(handle);
            // ...
            `,
            lineNumbers: '7-8',
        }],
    ],

    code04: [
        [
            {
                code: `
                // 同步过程

                Value getValue() {
                    return value;
                }

                // ...
                    Value val = getValue();
                    handle(val);
                // ...
                `,
                fontSize: '0.8em',
            },
            {
                code: `
                // 异步Promise

                Promise getValue() {
                    return Promise.of(value);
                }
    
                // ...
                    Promise pVal = getValue();
                    pVal.onSuccess(handle);
                // ...
                `,
                fontSize: '0.8em',
            },
        ],
        [
            {
                code: `
                Value getValue() {
                    return value;
                }

                Other getOther() {
                    return other;
                }

                // ...
                    Value val = getValue();
                    Other oth = getOther();
                    handle([val, oth]);
                // ...
                `,
                lineNumbers: '5-7,12',
                fontSize: '0.8em',
            },
            {
                code: `
                Promise getValue() {
                    return Promise.of(value);
                }

                Promise getOther() {
                    return Promise.of(other);
                }

                // ...
                    Promise pVal = getValue();
                    Promise pOth = getOther();
                    Promise.all(pVal, pOth)
                        .onSuccess(handle);
                // ...
                `,
                lineNumbers: '5-7,12-13',
                fontSize: '0.8em',
            },
        ],
    ],

    code05: [
        [{
            code: `
            <span data-flow="2">Promise</span> getValue() {
                return <span data-flow="1">Promise.of</span>(<span data-flow="0">value</span><span data-flow="1">)</span>;
            }

            <span data-flow="12">Promise</span> getOther() {
                return <span data-flow="11">Promise.of</span>(<span data-flow="10">other</span><span data-flow="11">)</span>;
            }

            // ...
                Promise <span data-flow="4">pVal</span> = <span data-flow="3">getValue</span>();
                Promise <span data-flow="14">pOth</span> = <span data-flow="13">getOther</span>();
                Promise.<span data-flow="21">all</span>(<span data-flow="20"><span data-flow="5">pVal</span></span>, <span data-flow="20"><span data-flow="15">pOth</span></span>)
                    .<span data-flow="22">onSuccess</span>(<span data-flow="23">handle</span>);
            // ...
            `,
            classList: 'flow-code',
        }],
    ],
};

/**
 * 
 * @param {HTMLElement} $root
 */
export default function ($root) {
    Object.entries(codes).forEach(([sectionId, animates]) => {
        const $section = document.createElement('section');
        $section.id = sectionId;
        $root.appendChild($section);

        animates.forEach((codes, index) => {
            const $animate = document.createElement('section');
            $animate.setAttribute('data-auto-animate', true);
            $section.appendChild($animate);

            const $pre = document.createElement('pre');
            $pre.setAttribute('data-id', 'code-animation');
            $pre.classList.add('java');
            $animate.appendChild($pre);

            codes.length > 1 && $pre.classList.add('split-horizontal');
            codes.forEach(({ code, lineNumbers = '', classList = [], fontSize }) => {
                const $code = document.createElement('code');
                $code.setAttribute('data-trim', true);
                $code.setAttribute('data-noescape', true);

                $code.innerHTML = code;
                $code.setAttribute('data-line-numbers', lineNumbers);
                $code.classList.add(...classList);
                fontSize && ($code.style.fontSize = fontSize);

                $pre.appendChild($code);
            });
        });
    });
}
