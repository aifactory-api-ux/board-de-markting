#!/bin/bash
set -e

echo "Starting Board Marketing Application..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Error: Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "Error: docker-compose is not installed. Please install docker-compose first."
    exit 1
fi

# Build and start containers
echo "Building and starting containers..."
docker-compose up -d --build

# Wait for healthchecks
echo "Waiting for services to be healthy..."

# Check backend health
for i in {1..30}; do
    if curl -f http://localhost:4000/health &> /dev/null; then
        echo "Backend is healthy"
        break
    fi
    echo "Waiting for backend... ($i/30)"
    sleep 2
done

echo ""
echo "========================================"
echo "Board Marketing Application"
echo "========================================"
echo "Frontend: http://localhost"
echo "Backend:  http://localhost:4000"
echo "API Docs: http://localhost:4000/health"
echo ""
echo "Default credentials:"
echo "  Email:    admin@apiux.com"
echo "  Password:  strongpassword"
echo "========================================"