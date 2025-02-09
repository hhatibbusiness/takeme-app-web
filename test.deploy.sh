USER="root"
HOST="191.96.1.25"
REMOTE_DIR="/var/www/react-app"
LOCAL_DIR="./build"

echo "starting deployment process"

echo "uploading files...."

scp -r $LOCAL_DIR $USER@$HOST:$REMOTE_DIR

# Check if scp was successful
if [ $? -eq 0 ]; then
  echo "Files uploaded successfully."
else
  echo "Error uploading files. Exiting."
  exit 1
fi

echo "Changing to remote directory..."
ssh $USER@$HOST "cd $REMOTE_DIR && ls -l"

echo "Restarting the server..."
ssh $USER@$HOST "sudo systemctl restart nginx"

# Final message
echo "Deployment completed successfully!"
