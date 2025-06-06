import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler()]
)

def log_info(message: str):
    logging.info(message)

def log_error(message: str):
    logging.error(message)
