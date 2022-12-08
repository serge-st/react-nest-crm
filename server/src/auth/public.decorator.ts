import { SetMetadata } from '@nestjs/common';

// To make some specific app route protected and use our JWT strategy we need to apply:
// @UseGuards(JwtAuthGuard)
// The above decorator can be applied to a route or to the entire controller. 

// BUT, since most of the app routes need to be secured the below was added to app.module.ts
// providers: [AppService, {
//     provide: APP_GUARD,
//     useClass: JwtAuthGuard,
// }
// This setting makes all routes protected

// SO, in this file we create a @Public() decorator
// Which we can use to mark the publicly available routes/controllers.

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);