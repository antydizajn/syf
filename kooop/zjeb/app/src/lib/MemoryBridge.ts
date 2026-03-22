/**
 * SYF V5.5 - Memory Bridge
 * Maps Qdrant episodic memory embeddings to 3D world coordinates.
 */

export interface MemoryPoint {
  id: string;
  text: string;
  embedding: number[];
  position: [number, number, number]; // Projected [x, y, z]
  metadata: any;
}

export class MemoryBridge {
  /**
   * Projects a high-dimensional embedding into 3D space.
   * Using a simplified Random Projection / PCA-lite approach for real-time performance.
   * In a production scenario, this could be a pre-calculated PCA matrix.
   */
  static project(embedding: number[]): [number, number, number] {
    if (!embedding || embedding.length < 3) return [0, 0, 0];

    // Simple projection: Use first 3 dimensions but mix them with others for variance
    // We want to normalize to [-1, 1] for WebGPU world space
    const x = (embedding[0] + embedding[10]) * 0.5;
    const y = (embedding[1] + embedding[20]) * 0.5;
    const z = (embedding[2] + embedding[30]) * 0.5;

    // Scale to visible range
    return [x * 2, y * 2, z * 2];
  }

  /**
   * Hydrates raw Qdrant points with projected positions.
   */
  static hydrate(points: any[]): MemoryPoint[] {
    return points.map(p => ({
      id: p.id || Math.random().toString(36),
      text: p.payload?.text || p.payload?.content || "???",
      embedding: p.vector || [],
      position: this.project(p.vector || []),
      metadata: p.payload || {}
    }));
  }
}
