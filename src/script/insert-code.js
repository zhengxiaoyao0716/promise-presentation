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
            title: '一个普通的方法调用',
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
            title: '要改为异步的远程调用',
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
            title: '则没法同步获取返回值',
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
            title: '可以考虑将后续步骤放到远程执行',
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
                title: '但如果后续要执行不同逻辑',
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
            title: '则需要通过参数传入待执行的λ函数',
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
            title: 'λ函数在这里扮演了监听器，改个名叫onSuccess',
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
                title: '但仍然有两个问题，一是lambda参数无法序列化',
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
                title: '二是多个异步方法不方便进行组合',
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
                return onSuccess -> onSuccess(value);
            }

            // ...
                getValue(<span class="error">val -></span>
                    <span class="error">handle(val)</span>);
            // ...
            `,
            title: '所以需要把数据流动改回单向（由参数进，由返回出）',
            lineNumbers: '1-2',
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
            title: '通过返回的管道添加监听器来获取返回值',
            lineNumbers: '2,7-8',
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
            title: '进一步就可以把管道封装为Promise了',
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
                title: '现在就可以方便的对多个异步执行结果进行组合了',
                lineNumbers: '5-7,12-13',
                fontSize: '0.8em',
            },
        ],
        [{
            code: `
            <span data-flow="2">Promise</span> getValue() {
                return <span data-flow="1">Promise.of(</span><span data-flow="0">value</span><span data-flow="1">)</span>;
            }

            <span data-flow="12">Promise</span> getOther() {
                return <span data-flow="11">Promise.of(</span><span data-flow="10">other</span><span data-flow="11">)</span>;
            }

            // ...
                Promise <span data-flow="4">pVal</span> = <span data-flow="3">getValue</span>();
                Promise <span data-flow="14">pOth</span> = <span data-flow="13">getOther</span>();
                Promise.<span data-flow="21">all(</span><span data-flow="5"><span data-flow="20">pVal</span></span>, <span data-flow="15"><span data-flow="20">pOth</span></span><span data-flow="21">)</span>
                    .<span data-flow="22">onSuccess</span>(<span data-flow="23">handle</span>);
            // ...
            `,
            id: 'flowCode',
            title: '数据流动示意图',
        }],
    ],

    code05: [
        [{
            code: `
            Promise&lt;Param&gt; someMethod(Arg0 arg0, Arg1 arg1 /*, Argi... argi*/) {
                return Promise.ofParam("result from some proxy");
            }

            // ...
                someProxy.someMethod(arg0, arg1 /*, argi...*/)
                    .onSuccessThen((val, ctx) -> {
                        System.out.println("- onSuccessThen - " + val.get());
                        return otherProxy.someMethod(); // 返回下一个远程调用
                    })
                    .onFailureThen((err, ctx) -> {
                        System.out.println("- onFailureThen - " + err.message);
                        return Promise.ofValue("catched"); // 捕获异常
                    })
                    .onSuccess((val, ctx) -> {
                        System.out.println("- onSuccess - " + val);
                        doSomeThing(val); // 异步请求成功，执行某操作
                    })
                    .onFailure((err, ctx) -> {
                        System.out.println("- onFailure - " + err.message);
                        handleException(err); // 处理所有未捕获异常
                    })
            // ...

            // out:
                println("- onSuccessThen - result from some proxy");
                println("- onSuccess - result from other proxy");
            `,
            title: '正常数据流动',
            lineNumbers: '2|1|6|7|8-9|14-15|16-17|25-27|2',
        }],
        [{
            code: `
            Promise&lt;Param&gt; someMethod(Arg0 arg0, Arg1 arg1 /*, Argi... argi*/) {
                throw new Exception("one exception");
            }

            // ...
                someProxy.someMethod(arg0, arg1 /*, argi...*/)
                    .onSuccessThen((val, ctx) -> {
                        System.out.println("- onSuccessThen - " + val.get());
                        return otherProxy.someMethod(); // 返回下一个远程调用
                    })
                    .onFailureThen((err, ctx) -> {
                        System.out.println("- onFailureThen - " + err.message);
                        return Promise.ofValue("catched"); // 捕获异常
                    })
                    .onSuccess((val, ctx) -> {
                        System.out.println("- onSuccess - " + val);
                        doSomeThing(val); // 异步请求成功，执行某操作
                    })
                    .onFailure((err, ctx) -> {
                        System.out.println("- onFailure - " + err.message);
                        handleException(err); // 处理所有未捕获异常
                    })
            // ...

            // out:
                println("- onFailureThen - one exception");
                println("- onSuccess - catched");
            `,
            title: '异常后捕获',
            lineNumbers: '2|1|6|10-11|12-13|14-15|16-17|25-27|13',
        }],
        [{
            code: `
            Promise&lt;Param&gt; someMethod(Arg0 arg0, Arg1 arg1 /*, Argi... argi*/) {
                throw new Exception("one exception");
            }

            // ...
                someProxy.someMethod(arg0, arg1 /*, argi...*/)
                    .onSuccessThen((val, ctx) -> {
                        System.out.println("- onSuccessThen - " + val.get());
                        return otherProxy.someMethod(); // 返回下一个远程调用
                    })
                    .onFailureThen((err, ctx) -> {
                        System.out.println("- onFailureThen - " + err.message);
                        throw new Exception("new exception"); // 抛出新异常
                    })
                    .onSuccess((val, ctx) -> {
                        System.out.println("- onSuccess - " + val);
                        doSomeThing(val); // 异步请求成功，执行某操作
                    })
                    .onFailure((err, ctx) -> {
                        System.out.println("- onFailure - " + err.message);
                        handleException(err); // 处理所有未捕获异常
                    })
            // ...

            // out:
                println("- onFailureThen - one exception");
                println("- onFailure - new exception");
            `,
            title: '异常后传递',
            lineNumbers: '13|2|1|6|10-11|12-13|18-19|20-21|25-27',
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
            codes.forEach(({ code, id, classList = [], title, lineNumbers = '', fontSize }) => {
                const $code = document.createElement('code');
                $code.setAttribute('data-trim', true);
                $code.setAttribute('data-noescape', true);

                $code.innerHTML = code;
                $code.setAttribute('data-line-numbers', lineNumbers);
                id && ($code.id = id);
                $code.classList.add(...classList);
                title && ($code.title = title);
                fontSize && ($code.style.fontSize = fontSize);

                $pre.appendChild($code);
            });
        });
    });
}
