# Bedder
> By: Noa Shalom, Omer Botbol and Shira Meirovitz

## What is Bedder?
A platform that create and expand the circles of volunteering and giving in Israeli society,
with an emphasis on free accommodation. In order to promote this
vision, we have developed an application that makes accessible and
quick search for accommodation, as well as advertising accommodation
at the click of a button.

## Link
[Bedder](https://serene-depths-29374.herokuapp.com/)

## How does it work?
There are 2 kinds of users: host & guest
- **Host:** 
    - Can add assets for people to stay in
    - After a guest gives like to an asset, the host can like him back, and after that their contact information will publish for both of them to confirm the order
    - Can mark if the order is booked or not

- **Guset:**
   - Can search a place to stay by city/google maps/GPS
   - Can filter assets
   - Like a place he would like to stay
   - If the host liked hom back their contact information will publish for both of them to confirm the order
   
Both host and guset, have a profile page to view their deatils and an my orders page to watch their order status

## Technologies we used
- S3 (AWS) - to upload & save photos
- MYSQL
- React
- Node.js
- Express
- Google cloud - to upload database
- Google maps
- GPS
- JWT
- Heroku

## How to upload the project local?
1. Fork this repository
2. Clone it to your computer
3. Create .env file in the main folder
4. Add the following variables that will match to your file:
PORT=""
DB_PASSWORD=""
DB_HOST=""
DATABASE=""
ACCESS_TOKEN=""
REFRESH_TOKEN=""
ID=""
SECRET=""
BUCKET_NAME=""
5. Create .env file in the client folder
6. Add the following varaible that will match your file: REACT_APP_GOOGLE_API_KEY=""
7. Install project dependencies by running `npm i` in the main & client folders
8. Change the config file that will match your SQL
9. Go to the terminal, in the main folder run: `npm run db` (to upload all the tables & seeders to your local database)
10. Run `npm run dev` in the main folder
11. Open another terminal and run `cd client` and `npm start` to start the app

