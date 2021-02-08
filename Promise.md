``` java
Value getValue() {
    Value value;
    // ...
    return value;
}

// ...
    Value val = getValue();
    handle(val);
// ...

```

``` java
void getValue() {
    Value value;
    // ...
    handle(value);
}

// ...
    getValue();
// ...

```
