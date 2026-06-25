#!/usr/bin/env tsx
/**
 * ViralClawOS — Qdrant Collection Seed
 * Run: pnpm tsx scripts/seed-qdrant.ts
 *
 * Creates the viralclawos Qdrant collection if it doesn't exist.
 */

import { QdrantClient } from "@qdrant/js-client-rest";

const QDRANT_URL = process.env.QDRANT_URL ?? "http://localhost:6333";
const COLLECTION = "viralclawos";
const VECTOR_SIZE = 1536; // text-embedding-3-small

async function main() {
  const client = new QdrantClient({ url: QDRANT_URL });

  console.log(`Connecting to Qdrant at ${QDRANT_URL}...`);

  const { collections } = await client.getCollections();
  const exists = collections.some((c) => c.name === COLLECTION);

  if (exists) {
    console.log(`✓ Collection "${COLLECTION}" already exists`);
    return;
  }

  await client.createCollection(COLLECTION, {
    vectors: { size: VECTOR_SIZE, distance: "Cosine" },
    optimizers_config: { default_segment_number: 2 },
    replication_factor: 1,
  });

  // Create payload indexes for fast filtering
  await client.createPayloadIndex(COLLECTION, {
    field_name: "userId",
    field_schema: "keyword",
  });
  await client.createPayloadIndex(COLLECTION, {
    field_name: "type",
    field_schema: "keyword",
  });
  await client.createPayloadIndex(COLLECTION, {
    field_name: "platform",
    field_schema: "keyword",
  });
  await client.createPayloadIndex(COLLECTION, {
    field_name: "publishedAt",
    field_schema: "datetime",
  });

  console.log(`✓ Created collection "${COLLECTION}" with ${VECTOR_SIZE}d vectors`);
  console.log(`✓ Created payload indexes: userId, type, platform, publishedAt`);
}

main().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
