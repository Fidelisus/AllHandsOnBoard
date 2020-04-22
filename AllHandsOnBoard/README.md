# All Hands on Board
1. Idea
2. How to run
3. Website plan
4. Technical outline

### Idea
As we have discovered, students don't normally work for the university. Most of them have told us that they don't know where to look for job offers (because now there is no such a tool) and they don't have the motivation to do that. So we have decided to create a website that will enable university staff to post any job that they have. Moreover, we have prepared a remuneration for students. They will gain points for their work and then exchange them for the meaningful prices. To encourage them to gather points we have also prepared gamification.

### How to run

You have to have .NET, Angular and Postgresql Server installed. You have to simultaneously turn on the frontend with `ng serve` and the Backend with Visual Studio or another tool. You also have to have the DB running. You have to add the connection string to appsettings.json.
**Important**: When we will end development stage it should be removed from there.

To log in to the app your credentials have to be in the database. you can populate it yourself or use a query with mock data that we have created: *AllHandsOnBoardBackend\dbTestCreateQuery.txt*

### Website plan
We have 3 user types:
- student
- teacher
- admin
And every single one has different privileges and available views.

Here you can see website plan:

![website plan](https://github.com/Fidelisus/AllHandsOnBoard/AllHandsOnBoard/WebsiteMap.png)

Everyone can go to:
- Profile
- Task List
- Login

Only student and admin can go to:
- Scoreboard
- Rewards

Only teacher and admin can go to:
- Task Adder

Of course Administration panel is for admin use only.
### Technical outline
We have frontend done in Angular and backend in ASP.NET. Backend is connected to Postgresql DB. You have to add the connection string to appsettings.json.
**Important** When we will end development stage it should be removed from there.

You can find a query creating the database with some mock data in *AllHandsOnBoardBackend\dbTestCreateQuery.txt*
You can run it in the Postgresql DB.

Our database:

![website plan](https://github.com/Fidelisus/AllHandsOnBoard/AllHandsOnBoard/DatabaseDiagram.png)

We are using MVC as the design pattern. Frontend is set up to communicate with backend via HTTP requests.
For login, we use JWT authentication. In the frontend the logic of it is in the auth.service, in backend in LoginController.
You can find all the icons and images in the assets folder in the frontend.
