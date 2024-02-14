#!/bin/zsh

# Starts a docker container running postgres, makes migrations and start a prisma studio server.
# Destroys the container when prisma studio is stopped

# Function to handle SIGINT signal (Ctrl+C)
function cleanup {
  echo "Cleaning up..."
  sudo docker rm -f postgres
  exit 0
}

# Set the trap to call the cleanup function on exit
trap cleanup EXIT

# Set the trap to call the handle_sigint function when SIGINT is received
trap cleanup SIGINT

# Start the PostgreSQL container
sudo docker run --rm -p 5432:5432 -e POSTGRES_HOST_AUTH_METHOD=trust --name postgres -d postgres

# Wait until postgres is ready
until docker exec postgres pg_isready ; do
    sleep 2;
done

# Make migrations
npx prisma migrate dev

# Run prisma studio
npx prisma studio
