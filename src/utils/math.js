export function map(n, start1, stop1, start2 = 0, stop2 = 1) {
    return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2
}
export function constraint(n, min = 0, max = 1) {
    return Math.min(Math.max(n, min), max)
}
