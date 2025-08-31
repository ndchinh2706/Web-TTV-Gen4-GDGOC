import multiprocessing
import os

# Server socket
bind = "127.0.0.1:5000"
backlog = 2048

workers = 2
worker_class = "sync"
worker_connections = 1000
timeout = 30
keepalive = 2

max_requests = 1000
max_requests_jitter = 50

log_dir = "/home/guser/Web-TTV-Gen4-GDGOC/server/logs"
os.makedirs(log_dir, exist_ok=True)

errorlog = f"{log_dir}/gunicorn_error.log"
accesslog = f"{log_dir}/gunicorn_access.log"
loglevel = "info"

access_log_format = '%(h)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s "%(f)s" "%(a)s" %(D)s'

proc_name = "gdgoc_backend"

preload_app = True
daemon = False

user = "guser"
group = "guser"

graceful_timeout = 30
worker_tmp_dir = "/dev/shm"


def when_ready(server):
    server.log.info("Server is ready. Spawning workers")

def worker_int(worker):
    worker.log.info("worker received INT or QUIT signal")

def pre_fork(server, worker):
    server.log.info("Worker spawned (pid: %s)", worker.pid)

def post_fork(server, worker):
    server.log.info("Worker spawned (pid: %s)", worker.pid)

def post_worker_init(worker):
    worker.log.info("Worker initialized (pid: %s)", worker.pid)

def worker_abort(worker):
    worker.log.info("Worker aborted (pid: %s)", worker.pid)
