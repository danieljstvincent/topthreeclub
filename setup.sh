#!/bin/bash

# Top Three Club - Setup and Start Script
# This script installs dependencies, runs migrations, and starts both servers

set -e  # Exit on error

echo "=================================="
echo "Top Three Club - Setup Script"
echo "=================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Step 2: Setup Virtual Environment and Install Dependencies
echo -e "${BLUE}Step 2: Setting up Python virtual environment...${NC}"
cd "$SCRIPT_DIR/backend"

# Create venv if it doesn't exist
if [ ! -d "venv" ]; then
    echo -e "${YELLOW}Creating virtual environment...${NC}"
    python3 -m venv venv
fi

# Activate venv and install dependencies
source venv/bin/activate
if pip install -r requirements/base.txt; then
    echo -e "${GREEN}✓ Python dependencies installed${NC}"
else
    echo -e "${RED}✗ Failed to install Python dependencies${NC}"
    exit 1
fi
echo ""

# Step 3: Run Database Migrations
echo -e "${BLUE}Step 3: Running database migrations...${NC}"
if python manage.py migrate; then
    echo -e "${GREEN}✓ Database migrations completed${NC}"
else
    echo -e "${RED}✗ Failed to run migrations${NC}"
    exit 1
fi
echo ""

# Step 4: Create Superuser (only if one doesn't exist)
echo -e "${BLUE}Step 4: Checking for superuser...${NC}"
SUPERUSER_EXISTS=$(python manage.py shell -c "from django.contrib.auth import get_user_model; User = get_user_model(); print(User.objects.filter(is_superuser=True).exists())" 2>/dev/null || echo "False")

if [ "$SUPERUSER_EXISTS" = "True" ]; then
    echo -e "${GREEN}✓ Superuser already exists${NC}"
else
    echo -e "${YELLOW}No superuser found. You'll need to create one manually.${NC}"
    echo -e "${YELLOW}After servers start, open a new terminal and run:${NC}"
    echo -e "${YELLOW}  cd backend && source venv/bin/activate && python manage.py createsuperuser${NC}"
fi
echo ""

# Step 5 & 6: Start servers
echo -e "${BLUE}Step 5 & 6: Starting servers...${NC}"
echo ""
echo -e "${YELLOW}IMPORTANT NOTES:${NC}"
echo -e "1. Backend will start on: ${GREEN}http://localhost:8000${NC}"
echo -e "2. Frontend will start on: ${GREEN}http://localhost:3000${NC}"
echo -e "3. Press ${RED}Ctrl+C${NC} to stop both servers"
echo ""
echo -e "${YELLOW}Next Steps After Servers Start:${NC}"
echo -e "1. Go to ${GREEN}http://localhost:8000/admin/${NC}"
echo -e "2. Login with superuser credentials"
echo -e "3. Update Site domain to: ${GREEN}localhost:8000${NC}"
echo -e "4. Test OAuth at: ${GREEN}http://localhost:3000/login${NC}"
echo ""
echo -e "${BLUE}Starting servers in 3 seconds...${NC}"
sleep 3

# Function to kill all background processes on exit
cleanup() {
    echo ""
    echo -e "${YELLOW}Stopping servers...${NC}"
    kill $(jobs -p) 2>/dev/null
    echo -e "${GREEN}✓ Servers stopped${NC}"
    exit 0
}

trap cleanup SIGINT SIGTERM

# Start backend server
echo -e "${GREEN}Starting Django backend...${NC}"
cd "$SCRIPT_DIR/backend"
source venv/bin/activate
python manage.py runserver &
BACKEND_PID=$!

# Wait a bit for backend to start
sleep 3

# Start frontend server
echo -e "${GREEN}Starting Next.js frontend...${NC}"
cd "$SCRIPT_DIR/frontend"

# Check if node_modules exists, if not run npm install
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing frontend dependencies...${NC}"
    npm install
fi

npm run dev &
FRONTEND_PID=$!

echo ""
echo -e "${GREEN}=================================="
echo -e "✓ Both servers are running!"
echo -e "==================================${NC}"
echo ""
echo -e "Backend:  ${GREEN}http://localhost:8000${NC}"
echo -e "Frontend: ${GREEN}http://localhost:3000${NC}"
echo -e "Admin:    ${GREEN}http://localhost:8000/admin/${NC}"
echo ""
echo -e "Press ${RED}Ctrl+C${NC} to stop both servers"
echo ""

# Wait for both processes
wait
