import { NextRequest, NextResponse } from 'next/server';
import { MemoryBridge } from '@/lib/MemoryBridge';

/**
 * SYF V5.5 - Memory API
 * Fetches episodic memory points from local Qdrant and projects them to 3D.
 */
export async function GET(request: NextRequest) {
    try {
        // Fetch from local Qdrant instance
        const qdrantRes = await fetch('http://localhost:6333/collections/episodic_memory/points/scroll', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                limit: 32,
                with_payload: true,
                with_vector: true
            })
        });

        if (!qdrantRes.ok) {
            throw new Error(`Qdrant error: ${qdrantRes.statusText}`);
        }

        const data = await qdrantRes.json();
        const rawPoints = data.result?.points || [];
        
        // Project embeddings to 3D space
        const projectedPoints = MemoryBridge.hydrate(rawPoints);

        return NextResponse.json({ 
            success: true, 
            points: projectedPoints 
        });
    } catch (error: any) {
        console.error('[MEMORY_API_ERROR]', error);
        return NextResponse.json({ 
            success: false, 
            error: error.message 
        }, { status: 500 });
    }
}
