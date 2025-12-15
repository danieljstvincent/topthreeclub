#!/bin/bash

# Top Three Club - Quick Start Script
# Use this after initial setup to start both servers

set -e

echo "=================================="
echo "Top Three Club - Starting Servers"
echo "=================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Get script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo -e "${GREEN}Starting servers...${NC}"
echo ""
echo -e "Backend:  ${GREEN}http://localhost:8000${NC}"
echo -e "Frontend: ${GREEN}http://localhost:3000${NC}"
echo -e "Admin:    ${GREEN}http://localhost:8000/admin/${NC}"
echo ""
echo -e "Press ${RED}Ctrl+C${NC} to stop both servers"
echo ""

# Cleanup function
cleanup() {
    echo ""
    echo -e "${YELLOW}Stopping servers...${NC}"
    kill $(jobs -p) 2>/dev/null
    echo -e "${GREEN}✓ Servers stopped${NC}"
    exit 0
}

trap cleanup SIGINT SIGTERM

# Start backend
cd "$SCRIPT_DIR/backend"
source venv/bin/activate
python manage.py runserver &

# Wait for backend
sleep 2

# Start frontend
cd "$SCRIPT_DIR/frontend"
npm run dev &

# Wait for processes
wait
