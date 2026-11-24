import json
from pathlib import Path

from src.main import create_app

OPENAPI_PATH = Path(__file__).resolve().parent / "openapi.json"

if __name__ == "__main__":
    schema = create_app().openapi()
    OPENAPI_PATH.write_text(json.dumps(schema, indent=2, ensure_ascii=False) + "\n")
