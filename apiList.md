# Dev Tinder APIs

## authRouter  
-POST /signup
-POST /login
-POST /logout

## profileRouter
-GET  /profile/view
-PATCH /profile/edit
-PATCH /profile/password

## RequestRouter
-POST  /request/send/interested/:UserId
-POST  /request/send/ignored/:UserId
-POST  /request/review/accepted/:requestId
-POST  /request/review/rejected/:requestId

## userRouter
-GET /user/connections
-GET /user/requests
-GET /user/feed - gets us the profile of other users on the platform (doesn't  do it one by one rather fetches 20-30 profiles at a time)

Status: ignored,interested,accepted,rejected