# Use selector in select

> Using a selector in a select method is preferred in favor of strings or props drilling

It's recommended to use selectors to get data out of the state tree.
A selector is memoized, thus this has the benefit that it's faster because the result is cached and will only be recalculated when it's needed.

Because a selector is just a pure function, it's also easy to test the selector's logic.

## Rule Details

Examples of **incorrect** code for this rule:

```ts
// ⚠ Usage of strings to select state slices
this.store.select('customers')
this.store.pipe(select('customers'))

// ⚠ Usage of props drilling to select state slices
this.store.select((state) => state.customers)
this.store.pipe(select((state) => state.customers))
```

Examples of **correct** code for this rule:

```ts
import * as fromCustomers from '@customers/selectors'

this.store.select(fromCustomers.selectAllCustomers)
this.store.pipe(select(fromCustomers.selectAllCustomers))
```

## Further reading

- [Selector docs](https://ngrx.io/guide/store/selectors)
- [Testing selectors docs](https://ngrx.io/guide/store/testing#testing-selectors)
