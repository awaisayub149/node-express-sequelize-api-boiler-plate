echo "**********start Deployment*************"

echo "**********MIGRATING DATABASE************"

sequelize db:migrate

echo "********** INSTALLING PACKAGES***********"

npm install

echo "********** RESTARTING DEMON ************* "

pm2 restart API

echo "********** ALL DONE******************** "