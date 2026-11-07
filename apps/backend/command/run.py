import uvicorn

from src.config.args import get_args
from src.config.logging import setup_logging
from src.config.settings import get_settings

if __name__ == "__main__":
    settings = get_settings()
    args = get_args()

    config = setup_logging(settings.log_level)
    uvicorn.run(
        "src.main:app",
        host=args.hostname,
        port=args.port,
        reload=args.dev,
        log_config=config,
    )
