# Build frontend (into backend/public dir)
echo "Building frontend..."
cd ../front
npm i
npm run build
# Build backend
echo "Building backend..."
cd ../backend
npm i
