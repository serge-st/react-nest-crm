1. [x] Connect to DB (apply ConfigModule)
2. [x] Create ".env" file for the configuration information
3. [x] Add User entities and DTOs.
4. [x] Generate User CRUD resource (nest g resource users)
5. [x] Complete all REST API CRUD methods in User service.
6. [x] Add validation and error handling to User resource (app.useGlobalPipes(new ValidationPipe())).
7. [x] Store hashed passwords.
8. [x] Create auth module.
9. [x] Add JWT login functionality to the app.
10. [x] Include user role information into JWT.
11. [x] Create type interface for JwtPayload.
12. [x] Create type interface for SingIn return type (used in both auth.service and auth.controller)
13. [x] Add MinLenght(2) to create-user.dto.ts for username property
14. [x] Create a decorator to remove passwords from query results -> To hide fields use @Exclude() decorator on a property and @UseInterceptors(ClassSerializerInterceptor) decorator on a route.
15. [x] Restrict isEnabled=false users in signIn service.
16. [x] Restrict password update in @Patch(':id') method
17. [x] Create a separate route for password update
18. [x] Add eager=true to User -> UserRole relation, so that every time the relation table loads.
19. [x] Protect all routes except login
20. [x] Add collection variable in Postman for User CRUD
21. [x] See how to setup user info in req.user
22. [x] Add forbiddenRoutes to Roles DB
23. [x] Store routes as tuples '[method, route]'
24. [x] Apply tuple route approach to /approutes.
25. [x] Store the entire role object in JWT Token.
26. [x] Create Roles controller to update roles.
27. [x] Compare users actual route with forbiddenRoutes array in Roles guard.
28. [x] Give access to /users route only for 'admin' user type.
29. [x] MAYBE, implement API endpoint to get all endpoints, [link to description](https://stackoverflow.com/questions/58255000/how-can-i-get-all-the-routes-from-all-the-modules-and-controllers-available-on)
30. [x] Think about a better way to implement user roles (maybe dynamic allowed/blocked routes).
31. [x] Add create role service/controller
32. [x] Initialize Vite React app and delete all unnecessary stuff, Add axios and react-router-dom
33. [ ] Create 2 simple routes
34. [ ] Check how to configure http request interceptor for frontend app.
35. [ ] Investigate how to combine BE auth and permission based access to routes on FE.
