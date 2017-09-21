#!/bin/sh

PIDFILE=server.pid
LOGFILE=server.log

echo "Starting server"

nohup \
    java -cp `find libs | xargs | sed "s/ /:/g"` org.openflexo.http.server.OpenFlexoServer --port 9300 --project demo.prj \
    & echo $! > $PIDFILE

