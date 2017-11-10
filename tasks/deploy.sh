#!/bin/bash

set -ex

# ENV Variables, Note: NOW_TOKEN in travisCI
TIMEOUT=9999999
REACT_APP_GA_ID='UA-33845990-13'
# NOW config
TEAM='website-api'
PROJECT='micro-website-api'
ALIAS='micro-website-api.now.sh'

export PATH="./node_modules/.bin:$PATH"

# 1. Wair for deployment ready
URL=$(now -e TIMEOUT="$TIMEOUT" -e REACT_APP_GA_ID="$REACT_APP_GA_ID" --public --token "$NOW_TOKEN" --team $TEAM)
now ls --token "$NOW_TOKEN" --team $TEAM

# 2. Alias
now alias set "$URL" "$ALIAS" --token "$NOW_TOKEN" --team $TEAM

# 3. Purge old services
now remove --yes --safe --token "$NOW_TOKEN" --team $TEAM $PROJECT

# 4. Scale to 1
now scale "$ALIAS" 1 auto --token "$NOW_TOKEN" --team $TEAM

# 5. Log results
now ls --token "$NOW_TOKEN" --team $TEAM
now alias ls --token "$NOW_TOKEN" --team $TEAM
