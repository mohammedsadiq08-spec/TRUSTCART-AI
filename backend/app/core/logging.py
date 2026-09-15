import logging
import sys
from app.core.config import settings

# Setup standard logger
logger = logging.getLogger("trustcart")
logger.setLevel(logging.INFO if settings.ENVIRONMENT.lower() != "debug" else logging.DEBUG)

if not logger.handlers:
    handler = logging.StreamHandler(sys.stdout)
    formatter = logging.Formatter(
        fmt="[%(asctime)s] [%(levelname)s] [%(name)s] %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S"
    )
    handler.setFormatter(formatter)
    logger.addHandler(handler)
