// see: https://www.codewars.com/kata/57658bfa28ed87ecfa00058a/train/javascript
// use bfs to find shortest path in maze
/**
 * My take away
 * i tried DFS fist but found that DFS is the quick way to find any exit, i:e if one exists
 * but found that if you need to find the shortest you need BFS
 */

type Coord = [x: number, y: number]
export default function solve(maze: string): number | boolean {
  const grid = maze.split('\n')
  const height = grid.length
  const width = grid[0].length
  const end: Coord = [height - 1, width - 1]
  const seen: boolean[][] = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => false)
  )
  return search(grid, 'W', end, seen)
}

const DIR = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
]
/** BREADTH FIRST */
function search(maze: string[], wall: string, end: Coord, seen: boolean[][]): number | boolean {
  const q: { pos: Coord; dist: number }[] = []
  q.push({ pos: [0, 0], dist: 0 })

  while (q.length !== 0) {
    const { pos: curr, dist } = q.shift()!
    if (curr[0] < 0 || curr[0] >= maze.length || curr[1] < 0 || curr[1] >= maze[0].length) {
      // can't go here out of bounds
      continue
    }

    if (maze[curr[0]][curr[1]] === wall) {
      // can't go here were on a wall
      continue
    }

    if (seen[curr[0]][curr[1]]) {
      // we've already been here, discard it
      continue
    }

    // visit the cell
    seen[curr[0]][curr[1]] = true

    // found the exit
    if (curr[0] === end[0] && curr[1] === end[1]) {
      return dist
    }

    for (const dir of DIR) {
      const next: Coord = [curr[0] + dir[0], curr[1] + dir[1]]
      q.push({ pos: next, dist: dist + 1 })
    }
  }

  return false
}

/** DEPTH FIRST */
function _search(
  maze: string[],
  wall: string,
  curr: Coord,
  end: Coord,
  seen: boolean[][],
  path: Coord[]
): boolean {
  if (curr[0] < 0 || curr[0] >= maze.length || curr[1] < 0 || curr[1] >= maze[0].length) {
    // can't go here out of bounds
    return false
  }

  if (maze[curr[0]][curr[1]] === wall) {
    // can't go here were on a wall
    return false
  }
  if (curr[0] === end[0] && curr[1] === end[1]) {
    // found the end
    path.push(curr)
    return true
  }

  if (seen[curr[0]][curr[1]]) {
    // we've already been here, discard it
    return false
  }

  // visit the cell
  seen[curr[0]][curr[1]] = true
  path.push(curr)

  for (const dir of DIR) {
    const next: Coord = [curr[0] + dir[0], curr[1] + dir[1]]
    if (_search(maze, wall, next, end, seen, path)) {
      return true
    }
  }

  // if this wasn't a step closer, pop it out of the path
  path.pop()
  return false
}
