"""
Script: drop_payments_table.py
Safely drops the legacy `payments` table if it exists.
Run: python scripts/drop_payments_table.py
"""
from sqlalchemy import text

# Import the engine from the project's database connection
import sys
import os
# Ensure repo root is on sys.path so imports work when running scripts directly
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

try:
    from backend.app.database.connection import engine
except Exception:
    # Fallback import for other execution contexts
    from app.database.connection import engine


def drop_table():
    """Drop the payments table if it exists."""
    with engine.begin() as conn:
        conn.execute(text("DROP TABLE IF EXISTS payments"))
        print("Dropped 'payments' table if it existed.")


if __name__ == "__main__":
    drop_table()