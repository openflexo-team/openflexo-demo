#!/bin/sh

PIDFILE=$PWD/server.pid
LOGFILE=$PWD/logs/server.log

echo "Starting server from $PWD"

setsid \
    java -cp `find libs | xargs | sed "s/ /:/g"` org.openflexo.http.server.OpenFlexoServer \
    --port 9300 --project demo.prj > $LOGFILE 2>&1 &

echo $! > $PIDFILE
