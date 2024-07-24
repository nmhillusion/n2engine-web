# Continue of the story

> A very sad and epic story about the legendary warrior

## Part 2: You can do it, yes, you can do it

Although the stone is very very heavy, but with the best of faith and effort, he wants to take it off the ground...

```typescript
function liftUpTheStone(stoneWeight: number, liftForce: number) {
  if (liftForce > stoneWeight) {
    logger.info("stone lifted");
  } else {
    logger.info("stone is too heavy, he can't lift it");
  }
}

liftUpTheStone(10, 20);
liftUpTheStone(10, 5);
liftUpTheStone(10, 30);

```

He does practice day by day, and his power increase over time.