1. [x] Connect to DB (apply ConfigModule)
2. [x] Create ".env" file for the configuration information
3. [x] Add User entities and DTOs.
4. [x] Generate User CRUD resource (nest g resource users)
5. [x] Complete all REST API CRUD methods in User service.
6. [x] Small updates to User controller.
7. [x] Add validation and error handling to User resource (app.useGlobalPipes(new ValidationPipe())).
8. [x] Store hashed passwords.
9. [x] Fix create User service (should not return password in the response body)
10. [x] Create auth module.
11. [x] Add JWT login functionality to the app.
12. [x] Include user role information into JWT.
13. [x] Create type interface for JwtPayload.
14. [x] Create type interface for SingIn return type (used in both auth.service and auth.controller)
15. [ ] Protect all routes except login
16. [ ] Give access to /users route only for 'admin' user type.
17. [ ] Investigate how to combine BE auth and permission based access to routes on FE.
18. [ ] Create a simple FE to test auth and protected routes.
19. [ ] Add MinLenght(2) to create-user.dto.ts for username property
20. [ ] Delete passwords from getAll method (check if any other find method returns passwords)
21. [ ] Restrict password update in @Patch(':id') method
22. [ ] Create a separate route for password update
