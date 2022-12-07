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
21. [ ] See how to setup user info in req.user
22. [ ] Give access to /users route only for 'admin' user type.
23. [ ] Investigate how to combine BE auth and permission based access to routes on FE.
24. [ ] Create a simple FE to test auth and protected routes.
25. [ ] Think about a better way to implement user roles (maybe dynamic allowed/blocked routes).
26. [x] MAYBE, implement API endpoint to get all endpoints, [link to description](https://stackoverflow.com/questions/58255000/how-can-i-get-all-the-routes-from-all-the-modules-and-controllers-available-on)
27. [ ] and then it would be possible to get dynamic access for user roles? /routes endpoint
