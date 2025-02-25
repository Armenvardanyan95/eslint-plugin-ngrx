# no-effect-decorator-and-creator

> This rule disallows using the `@Effect` decorator and the `createEffect` function simultaneously

## Rule Details

There are two ways we can register an Effect in NgRx. One is using the `@Effect` decorator (this is currently deprecated), the other is with the help of the `createEffect` function. Using both simultaneously will result in the Effect being registered twice, and the side-effect will be performed twice every time the corresponding action is dispatched.

Examples of **incorrect** code for this rule:

```ts
export class Effects {

  @Effect() loadData$ = createEffect(() => this.actions$.pipe(
    ofType(loadData),
    // performing the side effect
  ));

  constructor(
    private readonly actions$: Actions,
  ) {}
}
```

Examples of **correct** code for this rule:

```ts
export class Effects {

  loadData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadData),
      // performing the side effect
    ))
  };

  constructor(
    private readonly actions$: Actions,
  ) {}
}
```
