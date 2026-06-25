#!/usr/bin/env python3
"""
ViralClawOS — Neo4j Schema Setup
Run: python scripts/seed-neo4j.py

Creates constraints and indexes for the Brand DNA graph.
"""

import os
import sys

try:
    import neo4j
except ImportError:
    print("neo4j not installed. Run: pip install neo4j")
    sys.exit(1)

NEO4J_URI = os.getenv("NEO4J_URI", "bolt://localhost:7687")
NEO4J_USER = os.getenv("NEO4J_USER", "neo4j")
NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD", "viralclaw")

CONSTRAINTS = [
    "CREATE CONSTRAINT creator_userId IF NOT EXISTS FOR (c:Creator) REQUIRE c.userId IS UNIQUE",
    "CREATE CONSTRAINT asset_id IF NOT EXISTS FOR (a:ContentAsset) REQUIRE a.id IS UNIQUE",
    "CREATE CONSTRAINT signal_id IF NOT EXISTS FOR (t:TrendSignal) REQUIRE t.id IS UNIQUE",
    "CREATE CONSTRAINT format_name IF NOT EXISTS FOR (f:Format) REQUIRE f.name IS UNIQUE",
    "CREATE CONSTRAINT topic_name IF NOT EXISTS FOR (t:Topic) REQUIRE t.name IS UNIQUE",
    "CREATE CONSTRAINT platform_name IF NOT EXISTS FOR (p:Platform) REQUIRE p.name IS UNIQUE",
]

INDEXES = [
    "CREATE INDEX asset_platform IF NOT EXISTS FOR (a:ContentAsset) ON (a.platform)",
    "CREATE INDEX asset_publishedAt IF NOT EXISTS FOR (a:ContentAsset) ON (a.publishedAt)",
    "CREATE INDEX signal_urgency IF NOT EXISTS FOR (t:TrendSignal) ON (t.urgency)",
    "CREATE INDEX signal_detectedAt IF NOT EXISTS FOR (t:TrendSignal) ON (t.detectedAt)",
]


def main():
    driver = neo4j.GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))
    print(f"Connecting to Neo4j at {NEO4J_URI}...")

    with driver.session() as session:
        for cypher in CONSTRAINTS:
            label = cypher.split("CONSTRAINT ")[1].split(" IF")[0]
            session.run(cypher)
            print(f"✓ Constraint: {label}")

        for cypher in INDEXES:
            label = cypher.split("INDEX ")[1].split(" IF")[0]
            session.run(cypher)
            print(f"✓ Index: {label}")

    driver.close()
    print("\nNeo4j schema setup complete.")


if __name__ == "__main__":
    main()
