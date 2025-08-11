// see: https://www.codewars.com/kata/53f40dff5f9d31b813000774
// is an example of topological sorting a directed acyclic graph (DAG)
// using Kahn's Algorithm
type Triplet = [string, string, string]
export default function topologicalSort(triplets: Triplet): string {
  const { graph, inDegree } = buildGraph(triplets)

  // for simplicity using a JS array as my queue
  // it would be more performant to use a properly defined queue
  const q: string[] = []

  // go through the connection list and push the node with zero
  // incoming connections to the queue
  for (const node in inDegree) {
    if (inDegree[node] === 0) q.push(node)
  }

  // initialise a string to collect the sorted characters
  let result = ''

  // while there are nodes in the queue
  while (q.length !== 0) {
    // take the next one off the queue and add it's character to the result
    const node = q.shift()!
    result += node

    // for each adjacent node to the current one
    for (const next of graph[node]) {
      // decrement it's incoming connections
      inDegree[next]--
      // if that node has no more incoming connections
      // that is the next node to visit and push it to the queue
      if (inDegree[next] === 0) {
        q.push(next)
      }
    }
  }

  // after the while loop has completed, the result will be the string were are looking for
  // the characters in topological order of the the DAG that was the collection of triples
  return result
}

function buildGraph(triplets: Triplet) {
  // use a set to make a collection of unique characters from the triples
  const nodes = new Set<string>()
  // iterate of each triple and collect each character into the set
  for (const [a, b, c] of triplets) {
    nodes.add(a)
    nodes.add(b)
    nodes.add(c)
  }

  // dictionaries keyed by the node character
  // and adjacency list for tracking adjacent nodes
  const graph = {}
  // and one the counts the amount of incoming connections to a node
  const inDegree = {}

  // initialise the count of connections and a set to track adjacent nodes
  for (const node of nodes) {
    graph[node] = new Set<string>()
    inDegree[node] = 0
  }

  /**
   * iterate over every triple and enforce the constraints we have been given
   * C --> is downstream of --> B --> is downstream of --> A
   */
  for (const [a, b, c] of triplets) {
    // if "a" has not been marked as adjacent to "b"
    if (!graph[a].has(b)) {
      // mark it as adjacent
      graph[a].add(b)
      // increment the number of incoming connections for "b"
      inDegree[b]++
    }

    // if "b" has not been marked as adjacent to "c"
    if (!graph[b].has(c)) {
      // mark it as adjacent
      graph[b].add(c)
      // increment the number of incoming connections for "c"
      inDegree[c]++
    }
  }
  // return the adjacency list and the incoming connection list
  return { graph, inDegree }
}
