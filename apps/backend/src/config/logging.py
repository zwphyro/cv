import logging.config

import yaml

from src.config.settings import BASE_DIR


def setup_logging(log_level: str, dev: bool):
    config_name = "logging.dev.yaml" if dev else "logging.yaml"
    config_file = BASE_DIR / "config" / config_name

    with open(config_file) as f:
        config = yaml.safe_load(f)

    for logger_name in config.get("loggers", {}):
        config["loggers"][logger_name]["level"] = log_level

    logging.config.dictConfig(config)

    return config
