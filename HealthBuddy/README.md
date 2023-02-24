# HealthBuddy Project
- - -
## Author
Liu Shulong, email: e0424740@u.nus.edu
- - -
## What the project is about
HealthBuddy is a website designed for people who wish to manage their health through body weight and diet. It contains three major functions: **Health Diary**, **Health Report**, **Health Menu**. All the functions are in different pages that users can access via the header menu. Furthermore, to fully utilize the functions, users would have to login or register from the login/register page.

### * Health Diary
This is the page where users can record their health data according to dates (year, month, date). The dates are displayed in a calender format and are dynamically rendered according to actual dates. Users can switch years and month by using the arrow buttons on the top right corner and switch dates by simply clicking on the date item. This allows user to select a certain date for the diary. To edit the diary data for the chosen date, user needs to click on the edit button, key in data for the provided fields and then click on the save button. 
If user has logined in, the saved data will be uploaded to database. Also, when he loads the page, all the data relevant to the user will be fetched from database and loaded to the page. All the dates with data will have a tick mark to indicate that user has recorded data for that date. There are two reasons, first is to provide a sense of milestone or progress to encourage more inputs, second is to make it easier to find or modify the data. If he clicks on the date in the calender, the diary will display the respective data for the date.

### * Health Report
This the page that displays the cumulative health report for the user. If the user is not logined in or the user has not recorded any data, all the fields will be empty as there is no data to be analyzed. If the user has data recorded from the diary, all the data will be fetched and collated in the report. The report calculates and provides data such as number of records, daily average cal, dominant cal, weight change. User also provides weight goal and if their current weight is lower than the targeted value, a tick appears. There are also two line graphs reflecting the total weight and cal changes over time, as well as a pie chart reflecting the portion of each of the food category.

### * Health Menu
This the page where users can search for the calorie of a food from the menu. They can search with the food name, or scope it down by selecting the food type they want to search for. If the search name is empty, the search will also perform by searching with the selected food category. There are only 10 items per page by pagniation and previous or next button is rendered accordingly.

If the user is logined in, the user can create a new food item and insert into the menu pool. They can also click at the cross button on the food items that was created by them previously. The food menu pool is shared by all the users and hence the more the user create, the more all the users will benefit.

- - -
## Distinctiveness and Complexity
### * Distinctiveness
The website is distinct from all the previous projects and the details of the website can be found under the first section.
The theme of the website is a health manager and is neither a google search, wiki, e-commerce, email or social media website. 
The components are also different, the dynamically rendered calender, dynamically rendered graphs are not inside any previous project. The **css preprocessor - scss** is also not used in the previous projects

### * Complexity
The website is a full stack website with frontend created using html, javascript and css and backend using Django. 
On the frontend site, the website is **fully mobile responsive** with almost no classes from Bootstrap, but instead mostly by hand written. The media responsiveness is achieved by using media query. Furthermore, this project uses **SCSS** which is a **CSS preprocessor** that watches scss files and convert to css files live. This allows modularization to categorize scss files into seperate files, and provides other benefits such as variables, functions and mixins that can be reused in all parts of the scss files that greatly improve efficiencies. There are also **animations** inside the website. The menu burger button switches into a cross when the button is clicked and the menu drops down and the nav items slide in from the right.
The website also involves bulks of **date computations**, for example, the dynamically rendered calender, total calorie in the diary, the data entries in the report and the graph points using **Chartjs**.
The search function is also more complicated with ***both the name and category**. **Pagination** is also provided to reduce clustering and excessively long pages. 

On the backend site, there are four models **User, FoodMenuItem, DiaryItem, WeightGoal** in the database and users can perform actions such as **save** data to database(dairy inputs, weight goal, food menu items), **edit** data (dairy inputs, weight goal) in the database and **delete** data(food menu items) from the database.
- - -
## Project File Structure
The Django project HealthTool contains one application called HealthBuddy.
### * Inside HealthBuddy
There is a view file that contains all the Django functions, url file that contains all the website urls and the respective function names, models that contain all the Django models in the database and admin which contains models registered to Django admin site. There are also three folders, migrations that contain results from server migrations, static that contains images, scss/css files and js files of the project and a template folder which contains all the html files.
### * Inside styles
The scss files that begin with '_' is a modularised scss file that will be integrated in the styles.scss file and compiled into actual css files in the styles.css. All the file names indicate the component that they represent. Variables.scss represent the common variables that will be shared by all such as colors and components are some useful functions and mixins and responsive contains a function that renders media query according to the input.
### * Inside scripts
The calender.js contain all javascript related to health diary page and charts that corresponds to health report page. man.js that contains all function related to layout and menu.js that relates to health menu page.
### * Inside templates
The layout.html contains the overall layout that is inherited by all other html files and it contains the header menu with the links that sticks to the top as well as a footer that sticks to the bottom. Index.html is the home page and the content of all other html files are reflected by their names. diary.html contains a calender and a diary, menu.html contains search bar, a form that used to create new item and the list that contains all food menu items. login and register contains all the related input fields.
- - -
## To run the project
pip install gunicorn and django-heroku
pip install whitenoise
Use the usual Django command: python3 manage.py runserver
Or Click on the link to visit the website:  [HealthBuddy](https://www.youtube.com)
