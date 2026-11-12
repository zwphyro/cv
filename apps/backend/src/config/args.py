from argparse import ArgumentParser


def get_args():
    argument_parser = ArgumentParser()
    argument_parser.add_argument(
        "--dev",
        action="store_true",
        help="Run in development mode",
    )
    argument_parser.add_argument(
        "--hostname",
        action="store",
        default="0.0.0.0",
        help="Hostname interface to run the server on",
    )
    argument_parser.add_argument(
        "--port",
        action="store",
        default=8000,
        type=int,
        help="Port to run the server on",
    )
    return argument_parser.parse_args()
