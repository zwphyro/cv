"""limit requests fields length

Revision ID: eddadfea3ae0
Revises: a5721cf48faf
Create Date: 2026-11-10 01:13:50.174241

"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = "eddadfea3ae0"
down_revision: str | Sequence[str] | None = "a5721cf48faf"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


LENGTHS = {"author": 100, "email": 254, "message": 5000}


def upgrade() -> None:
    """Upgrade schema."""
    for column, length in LENGTHS.items():
        op.alter_column(
            "requests",
            column,
            type_=sa.String(length=length),
            existing_type=sa.String(),
            existing_nullable=False,
        )


def downgrade() -> None:
    """Downgrade schema."""
    for column, length in LENGTHS.items():
        op.alter_column(
            "requests",
            column,
            type_=sa.String(),
            existing_type=sa.String(length=length),
            existing_nullable=False,
        )
