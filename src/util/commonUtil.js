/**
 * Common Utilities
 */

export function removeDuplicates(array) {
  return [...new Set(array)];
}

export function countUniqueArrayMember(array) {
  return removeDuplicates(array).length;
}