export const calculateOverlapPercentage = (substringIdx1, substringIdx2) => {
  /* Calculate what % of characters in the two strings overlap out of
     the total number of characters in both (without double counting overlaps).
  */

  const [start1, end1] = substringIdx1;
  const [start2, end2] = substringIdx2;

  let numOverlapping;
  // No overlap: one string ends before the other starts
  if (end1 - 1 < start2 || end2 - 1 < start1) {
    numOverlapping = 0;
  }
  else {
    // The overlap starts where the latest substring starts
    // and ends where the earliest substring ends
    const overlapStart = Math.max(start1, start2);
    const overlapEnd = Math.min(end1, end2);
    numOverlapping = overlapEnd - overlapStart;
  }

  // This will double count overlapping characters
  const totalCharacters = (end2 - start2) + (end1 - start1);
  // Remove double counted characters in overlap
  const totalCharactersDedup = totalCharacters - numOverlapping;

  return numOverlapping / totalCharactersDedup;
}