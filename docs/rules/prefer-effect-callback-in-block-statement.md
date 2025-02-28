# Prefer Effect Callback In BlockStatement

> A block statement is easier to troubleshoot

## Rule Details

This rule prefers that the callback of an effect is a block statements.
This makes it easier to troubleshoot type errors, for when example an RxJS operator isn't imported.

Examples of **incorrect** code for this rule:

```ts
class Effect {
  effectNOK = createEffect(() =>
    this.actions.pipe(
      ofType(detailsLoaded),
      concatMap(() => ...),
    )
  )
}
```

Examples of **correct** code for this rule:

```ts
class Effect {
  effectOK = createEffect(() => {
    return this.actions.pipe(
      ofType(detailsLoaded),
      concatMap(() => ...),
    )
  })
}
```

## Further reading

- https://github.com/ngrx/platform/issues/2192
