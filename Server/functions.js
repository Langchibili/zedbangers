/* UTILITY FUNCTIONS */


/*  document api concatinator  */


/* counts updating function */

async function upDateCounts(id,subject,fetchData,updateData,count=null,countType=null){
    const countsFinalObject = { counts: {}}; // setting blank final counts object
    let counts; 
    let countsObject = await fetchData(id,"","counts"); // get initial counts object
    countsObject = countsObject.counts;
    if(count){
        counts = count;
    }
    else{
        if(countType === "reduce"){
           counts = countsObject[subject] - 1;
        }
        else{
           counts = countsObject[subject] + 1;
        } 
    }
    countsObject[subject] = counts;
    countsFinalObject.counts = countsObject; 
    await updateData(id,countsFinalObject);
}

/* function for getting an array of objects from an array of ids*/
async function getObjectsArrayByIds(idArray,fields,limit,fetchObjectArray=null,post_type=null){
  if(idArray.length === 0){
   return [];
  }
  else{ 
   idArray.reverse(); // reverse order of ids to sort them by last added
   idArray = idArray.slice(0, limit); // get new array by the limit amount
   let response = await fetchObjectArray(fields, limit, idArray);
   if(post_type){
     response = await fetchObjectArray(fields, limit, idArray, post_type);
   }
   return await response;
  }
}

// remove id in array and return new array of removed id
function removeId (inputArray, id) {
   let response;
   if(inputArray.length === 0){
       response = [];
   }  
   else{
       response = inputArray.filter(function(currentId){
           return currentId != id;
       });
   }
   return response;
}


/*activity utility functions */
async function createActivity(userId, postId, fetchData, addData, action){
   const user = await fetchData[0](userId); // get user object by first fetchData function
   const post = await fetchData[1](postId); // get post object by second fetchData function
   let post_type;
   let short_description;
   short_description = post.title;

   if(post.post_type === "text"){
       post_type = "post";
   }
   else if(post.post_type === "music"){
       post_type = "song";
       short_description = post.title;
   }
   else if(post.post_type === "video"){
       short_description = post.title;
   }
   let body = user.niceName + " " + action + " the " + post_type+ ": " + short_description; // to customize later

   actionTypes = ["posted", "liked", "played", "viewed", "commented", "replied","reposted", "followed"];
   if(actionTypes.includes(action)){
       if(action === "commented"|| action === "replied"){
           body = user.niceName + " " + action + " on the " + post_type+ ": " + short_description; // to customize later
       }
       const activityObject= {
           post_id: post._id,
           userId:  user._id,
           otherUserId: post.userId,
           userNiceName: user.niceName,
           privacy: post.privacy,
           user_picture_xl: user.picture.small,
           user_name: user.username,	
           action_type: action, 
           description: {
               post_thumbnail:post.thumbnail['thumbnail'],
               body:body
           }
       }

       // create activity
       await addData[0](activityObject); // add activity function
       if(userId === post.userId && action !== "posted"){ 
           return null;
       }
       else{
           // return notification object form activityObject
           return activityObject; //NOTIFICATION object
       }
   } 
}

/* follow activity log */

async function createFollowActivity(userId, otherUserId, fetchData, addData){
   const user = await fetchData(userId); // get user object by first fetchData function
   const otherUser = await fetchData(otherUserId); // get user object by first fetchData function
   let body = user.niceName + " followed "+ otherUser.niceName;
       const activityObject= {
           userId:  user._id,
           otherUserId: otherUser._id,
           userNiceName: user.niceName,
           privacy: "private",
           user_picture_xl: user.picture.small,
           user_name: user.username,	
           action_type: "followed", 
           description: {
               body:body
           }
       }

       // create activity
       await addData[0](activityObject); // add activity function
       if(userId === otherUserId){ 
           return null;
       }
       else{
           activityObject.description.body = user.niceName + " is now following you"; // to customize later
           // return notification object form activityObject
           return activityObject; //NOTIFICATION object
       }
}


/* notifications utily functions */

async function createNotification(notificationObject, addData){
   const notification = await addData[1](notificationObject); // create notication object(document) from activity object
   return notification; // return notification object
}

async function sendNotification(type, notificationObject, fetchData, updateData, updateObjectsArrayByIds=null) {
  const notificationId = notificationObject._id; // get notification id to use in broadcasting notification
  let userId; // initialize blank userId variable
  if(type === "private"){
      //send notification to 
      userId = notificationObject.otherUserId;
      let notifications = await fetchData(userId,"","notifications"); // get  user's notifications list 
      notifications = notifications.notifications; // get notifications array from resultant object
      counts = notifications.push(notificationId) // add userId to list
      await updateData(userId,{notifications: notifications});
      upDateCounts(userId,"notifications",fetchData,updateData,counts);// update user's notifications count
  }
  else if(type === "public" && updateObjectsArrayByIds){
      userId = notificationObject.userId;
      let userFollowers = await fetchData(userId,"","followers"); // get  user's followers list
      userFollowers = userFollowers.followers; // get array from resultant object
      await updateObjectsArrayByIds(userFollowers, "", "pushInArray", "notifications",notificationId) //sending the notification to all user's followers
  }
}

/* action creation object */

async function createPostAction(userId, postId, fetchData, updateData, addData, action){
   const user = await fetchData[0](userId, ""); // get user object by first fetchData function
   const post = await fetchData[1](postId, ""); // get post object including counts by second fetchData function
   let actionType =  ["play", "like", "view", "download"];
   let actioned = action + "ed"; // add ed to end of action name in order to make it past tense example "played
   if(action === "like"){ // just add d to action if action is like, to make it, liked
       actioned = action + "d"  
   }
   const actionObject= {
       post_id: post._id,
       userId:  user._id,
       other_user_id: post.userId,
       user_picture_xl: user.picture.small,
       user_name: user.username,	
       type: action, 
       body: {
           post_thumbnail:post.thumbnail['thumbnail']
       }
   }

  if(actionType.includes(action)){
    // create action
    let otherUserUpdateObject = {}; // empty object to symbolize the object to use to update action array
    let userUpdateObject = {}; // empty object to symbolize the object to use to update action array
    const response = await addData[2](actionObject); // add action function
    const actionId = response._id; // get action's id from responce object
    let actionsForuser = await fetchData[0](userId,"",actioned); // get  user's actions list 
    actionsForuser = actionsForuser[actioned]; // get actions array from resultant object
    let counts = actionsForuser.push(actionId) // add userId to list
    userUpdateObject[actioned] = actionsForuser; // set the actions array to the new array
    await updateData[0](userId,userUpdateObject); // save new array of actions to database
    upDateCounts(userId,actioned,fetchData[0],updateData[0],counts);// update user's actions count
    
    let usersActionedOnPosts = await fetchData[0](userId,"",actioned+"Posts"); // get  user's actionedOnPosts list 
    usersActionedOnPosts = usersActionedOnPosts[actioned+"Posts"]; // get actionedOnPosts array from resultant object
    
    let postsUniqueCounts = post.counts["unique_"+action+"s"]; /// get post's unique action counts
    if(!usersActionedOnPosts.includes(postId)){ // check if actionedOnPosts does not include current post
       // update unique post counts, if post counts id not in user's object     
       postsUniqueCounts= postsUniqueCounts+1;  // add action unique count to post
       await upDateCounts(postId,"unique_"+action+"s",fetchData[1],updateData[1],postsUniqueCounts);// update post's action count
       // update update user's actionedOnPosts    
       let usersActionedOnPostsUpdate = {}  // empty object to symbolize the object to use to update action array
       counts = usersActionedOnPosts.push(postId) // add userId to list and return count of new ids
       usersActionedOnPostsUpdate[actioned+"Posts"] = usersActionedOnPosts; // set the actions array to the new array
       await updateData[0](userId,usersActionedOnPostsUpdate); // save new array of actions to database
       upDateCounts(userId,actioned+"Posts",fetchData[0],updateData[0],counts);// update user's actions count
    }
   
    actionsForOtheruser = await fetchData[0](post.userId,"",action+"s"); // get  other user's actions list 
    actionsForOtheruser = actionsForOtheruser[action+"s"]; // get notifications array from resultant object
    counts = actionsForOtheruser.push(actionId); // add userId to list
    otherUserUpdateObject[action+"s"] = actionsForOtheruser; // set the actions array to the new array
    await updateData[0](post.userId,otherUserUpdateObject); // save new array of actions to database
    upDateCounts(post.userId,action+"s",fetchData[0],updateData[0],counts);// update user's notifications count

    // update post action counts either ways even if not unique
    let postsActionCount = post.counts[action+"s"] // get post's action counts
    postsActionCount = postsActionCount+1 // add action count to post
    await upDateCounts(postId,action+"s",fetchData[1],updateData[1],postsActionCount);// update post's action count
  }
}

/* exported functions object    */



module.exports = {
   /* FOLLOWING FUNCTIONS */
   
   addFollower: async function(userId, otherUserId, fetchData, updateData) {
       let response; // function response object
       let counts; // counts variable
       let userFollowing = await fetchData(userId,"","following"); // get following user's following list 
       let userFollowers = await fetchData(userId,"","followers"); // get following user's followers list
       let otherUserFollowers = await fetchData(otherUserId,"","followers"); // get followed user's followers list
       userFollowing = userFollowing.following; // get array from resultant object
       userFollowers = userFollowers.followers; // get array from resultant object
       otherUserFollowers = otherUserFollowers.followers; // get array from resultant object
       
       if(userFollowing.includes(otherUserId)){ // if user already exists in user's following box
           response = {message: "already following user"} 
           return response;
       }
       else{  // otherwise add user if doesn't exist in following box
           response = {message: "user added to following box"}
           counts = userFollowing.push(otherUserId); // add otherUserId to list
           upDateCounts(userId,"following",fetchData,updateData,counts);// update user's Following count
           counts = otherUserFollowers.push(userId); // add userId to list
           upDateCounts(otherUserId,"followers",fetchData,updateData,counts);// update otheruser followers count
           await updateData(userId,{following: userFollowing});
           const apIresponse = await updateData(otherUserId,{followers: otherUserFollowers});
           if(apIresponse){
               if(userFollowers.includes(otherUserId)){
                   let otherUserMutualFollowers = await fetchData(otherUserId,"","mutualFollowers"); // get followed user's mutualFollowers list 
                   let userMutualFollowers = await fetchData(userId,"","mutualFollowers"); // get following user's mutualFollowers list
                   otherUserMutualFollowers = otherUserMutualFollowers.mutualFollowers; // get array from resultant object
                   userMutualFollowers = userMutualFollowers.mutualFollowers; // get array from resultant object
                   counts = otherUserMutualFollowers.push(userId) // add userId to list
                   upDateCounts(otherUserId,"mutualFollowers",fetchData,updateData,counts);// update otheruser's mutualFollowers count
                   counts = userMutualFollowers.push(otherUserId) // add otherUserId
                   upDateCounts(userId,"mutualFollowers",fetchData,updateData,counts);// update user's mutualFollowers count
                   await updateData(otherUserId,{mutualFollowers: otherUserMutualFollowers}); // update followed user's mutualFollowers list
                   await updateData(userId,{mutualFollowers: userMutualFollowers}); // update following user's mutualFollowers list
                   return response
               }
               else{
                   return response; // send response of user being added even when they are not mutual followers
               }
           }
       }
  },

  getFollowers: async function (userId, subject, fields, limit, fetchData, fetchObjectArray){
     let response = [];
     if(typeof(limit) == "string"){
         limit = parseInt(limit);
     }
      
      switch (subject) {
          case "followers":
               let userFollowers = await fetchData(userId,"","followers", limit); // get following user's followers list
               userFollowers = userFollowers.followers; // get array from resultant object
               if(userFollowers.length === 0){
                   return response;
               }
               else{
                   return await getObjectsArrayByIds(userFollowers,fields,limit,fetchObjectArray); // get user's followers' user objects from ids
               }
              break;
          case "following":
               let userFollowing = await fetchData(userId,"","following"); // get following user's following list 
               userFollowing = userFollowing.following; // get array from resultant object
               if(userFollowing.length === 0){
                   return response;
               }
               else{
                   return await getObjectsArrayByIds(userFollowing,fields,limit,fetchObjectArray); // get user's followings' user objects from ids
               }
              break;
          case "mutualFollowers":
               let userMutualFollowers = await fetchData(userId,"","mutualFollowers"); // get following user's mutualFollowers list
               userMutualFollowers = userMutualFollowers.mutualFollowers; // get array from resultant object
               if(userMutualFollowers.length === 0){
                   return response;
               }
               else{
                   return await getObjectsArrayByIds(userMutualFollowers,fields,limit,fetchObjectArray); // get user's mutualfollowers' user objects from ids
               }
              break;
      
          default:
              return response;
      }
  },
 
  unFollow: async function (userId, otherUserId, fetchData, updateData){
       let userFollowing = await fetchData(userId,"","following"); // get following user's following list 
       let otherUserFollowers = await fetchData(otherUserId,"","followers"); // get followed user's followers list
       userFollowing = userFollowing.following; // get array from resultant object
       otherUserFollowers = otherUserFollowers.followers; // get array from resultant object
       let userMutualFollowers = await fetchData(userId,"","mutualFollowers"); // get following user's mutualFollowers list
       userMutualFollowers = userMutualFollowers.mutualFollowers; // get array from resultant object
       
       if(userMutualFollowers.includes(otherUserId)){
           let otherUserMutualFollowers = await fetchData(otherUserId,"","mutualFollowers"); // get followed user's mutualFollowers list 
           otherUserMutualFollowers = otherUserMutualFollowers.mutualFollowers; // get array from resultant object
           await updateData(otherUserId,{mutualFollowers: removeId(otherUserMutualFollowers,userId)}); // update followed user's mutualFollowers list
           upDateCounts(otherUserId,"mutualFollowers",fetchData,updateData,"","reduce");// update user's mutualFollowers count
           await updateData(userId,{mutualFollowers: removeId(userMutualFollowers,otherUserId)}); // update following user's mutualFollowers list
           upDateCounts(userId,"mutualFollowers",fetchData,updateData,"","reduce");// update user's mutualFollowers count
           await updateData(userId,{following: removeId(userFollowing, otherUserId)});
           upDateCounts(userId,"following",fetchData,updateData,"","reduce");// update user's mutualFollowers count
           await updateData(otherUserId,{followers: removeId(otherUserFollowers, userId)});
           upDateCounts(otherUserId,"followers",fetchData,updateData,"","reduce");// update user's mutualFollowers count
       }
       else{
           await updateData(userId,{following: removeId(userFollowing, otherUserId)});
           upDateCounts(userId,"following",fetchData,updateData,"","reduce");// update user's mutualFollowers count
           await updateData(otherUserId,{followers: removeId(otherUserFollowers, userId)});
           upDateCounts(otherUserId,"followers",fetchData,updateData,"","reduce");// update user's mutualFollowers count
       }
       return {message: "user unfollowed"}; // function response object
  },
 

   /* POSTS FUNCTIONS */    
   
   getFeed: async function(userId,fields,limit,fetchData,fetchObjectArray,post_type=null){
      limit = parseInt(limit); 
      let userFollowing = await fetchData(userId,"","following"); // get following user's feed
      userFollowing = userFollowing.following; // get array from resultant object
      if(userFollowing.length === 0){
           return [];
      }
      else{
          if(post_type) {
              return await getObjectsArrayByIds(userFollowing,fields,limit,fetchObjectArray,post_type);
           } // get user's followings' user objects from ids but by post_type
          return await getObjectsArrayByIds(userFollowing,fields,limit,fetchObjectArray); // get user's followings' user objects from ids
           
      } 
   },

   /* ACTIVITIIES FUNCTIONS */
   
   logActivityAndSendNotification: async function(userId, postId, type, action, addData, fetchData, updateData, updateObjectsArrayByIds){
       const activityObject = await createActivity(userId,postId,fetchData,addData,action) // log activity and return activityObject
       if(!activityObject){ // if activityObject is null then return and not add notification
          return;
       }
       else{
        const notificationObject = await createNotification(activityObject, addData); //create notification object and save it into database and return it's _id
        sendNotification(type, notificationObject, fetchData[0], updateData, updateObjectsArrayByIds); // send notification, either as private, or to all user's followers if public
       }
   },

   logFollowActivityAndSendNotification: async function(userId, otherUserId, addData, fetchData, updateData){
       const activityObject = await createFollowActivity(userId,otherUserId, fetchData, addData) // log activity and return activityObject
       if(!activityObject){ // if activityObject is null then return and not add notification
          return;
       }
       else{
        const notificationObject = await createNotification(activityObject, addData); //create notification object and save it into database and return it's _id
        sendNotification("private", notificationObject, fetchData, updateData); // send notification, either as private, or to all user's followers if public
       }
   },

   /* POST ACTION FUNCTIONS */
   logPostActionAndSendNotification: async function(userId, postId, action, addData, fetchData, updateData, updateObjectsArrayByIds, type="private"){
       let actioned = action + "ed"; // add ed to end of action name in order to make it past tense example "played
       if(action === "like"){ // just add d to action if action is like, to make it, liked
           actioned = action + "d"  
       }
       await createPostAction(userId, postId, fetchData, updateData, addData, action);
       const activityObject = await createActivity(userId,postId,fetchData,addData,actioned) // log activity and return activityObject
       if(!activityObject){ // if activityObject is null then return and not add notification
          return;
       }
       else{
        const notificationObject = await createNotification(activityObject, addData); //create notification object and save it into database and return it's _id
        sendNotification(type, notificationObject, fetchData[0], updateData[0], updateObjectsArrayByIds); // send notification, either as private, or to all user's followers if public
       }
   },
   getActedOnPost: async function(userId,fields,limit,fetchData,fetchObjectArray,action){
           limit = parseInt(limit);
           let actionIds = await fetchData(userId,"",action); // get  user's actions
           actionIds = actionIds[action]; // get array from resultant object
           if(actionIds.length === 0){
                return [];
           }
           else{
                return await fetchObjectArray(fields,limit,actionIds); // get user's followings' user objects from ids
           } 
   },
   getActedOnPostsById: async function(userId,fields,limit,fetchData,fetchObjectArray,action){
       limit = parseInt(limit);
       let actionIds = await fetchData(userId,"",action); // get  user's actions
       actionIds = actionIds[action]; // get array from resultant object
       if(actionIds.length === 0){
            return [];
       }
       else{
            return await fetchObjectArray(fields,limit,actionIds); // get user's followings' user objects from ids
       } 
   },
    // adds an api url to the docs file paths like http/https://domain.com/files/filtype/filename
    docApiConcatinator: function (api, doc={}, docs=[]){
        concatinatedDoc = doc;
        if(doc){ // this intels the doc is a single document 
                doc = doc._doc;
                const allProps = Object.keys(doc);
                allProps.forEach(function(prop){ // loop through array of inner objects or strings
                    if(doc[prop] && typeof doc[prop] === "object"){ // check if property is an object (an inner object)
                        const innerObj = doc[prop];
                        const innerObjProps = Object.keys(innerObj); // get inner objects keys
                        innerObjProps.forEach(function(innerObjProp){
                            if(typeof innerObj[innerObjProp] === "string") // check if property is just a string
                            {
                                let arrayWithColon = innerObj[innerObjProp].split(":"); // if true then it's a uri with http://domain/ or https://domain/
                                    if(arrayWithColon.length > 1){
                                       const splitFileUri = innerObj[innerObjProp].split("/");
                                       const newFilePathArray = splitFileUri.filter((uri)=>{ return splitFileUri.indexOf(uri) > 2}); // filter off the first 3 elements
                                       const newFilePathString = "/" + newFilePathArray.join("/");
                                       doc[prop][innerObjProp] = api + newFilePathString; //change document value 
                                    }
                                    else if(innerObj[innerObjProp].startsWith("/files") || innerObj[innerObjProp].startsWith("/downloads")){
                                        doc[prop][innerObjProp] = api + doc[prop][innerObjProp]; //change document value 
                                    }
                            }
                        });
                    }
                    else{
                        if(typeof doc[prop] === "string") // check if property is just a string 
                        {
                                let arrayWithColon = doc[prop].split(":"); // if true then it's a uri with http://domain/ or https://domain/
                                if(arrayWithColon.length > 1){
                                    const splitFileUri = doc[prop].split("/");
                                    const newFilePathArray = splitFileUri.filter((uri)=>{ return splitFileUri.indexOf(uri) > 2}); // filter off the first 3 elements
                                    const newFilePathString = "/" + newFilePathArray.join("/");
                                    doc[prop] = api + newFilePathString; //change document value 
                                }
                                else if(doc[prop].startsWith("/files") || doc[prop].startsWith("/downloads")){
                                    doc[prop] = api + doc[prop]; //change document value completely
                                }
                        }
                    }
                    concatinatedDoc = doc;
                });
            }
            else if(docs){ // this intels that the docs are an array, so loop through them and change them one at a time
                if(docs){  
                    concatinatedDoc = docs.map(function(doc) { // make a new set of docs with the new api concatinated
                    doc = doc._doc; 
                    const allProps = Object.keys(doc);
                    allProps.forEach(function(prop){
                        if(doc[prop] && typeof doc[prop] === "object"){  // check if property is an object (an inner object)
                            const innerObj = doc[prop];
                            const innerObjProps = Object.keys(innerObj);
                            innerObjProps.forEach(function(innerObjProp){
                                if(typeof innerObj[innerObjProp] === "string") // check if property is just a string
                                {
                                    let arrayWithColon = innerObj[innerObjProp].split(":"); // if true then it's a uri with http://domain/ or https://domain/
                                    if(arrayWithColon.length > 1){
                                       const splitFileUri = innerObj[innerObjProp].split("/");
                                       const newFilePathArray = splitFileUri.filter((uri)=>{ return splitFileUri.indexOf(uri) > 2}); // filter off the first 3 elements
                                       const newFilePathString = "/" + newFilePathArray.join("/");
                                       doc[prop][innerObjProp] = api + newFilePathString; //change document value 
                                    }
                                    else if(innerObj[innerObjProp].startsWith("/files") || innerObj[innerObjProp].startsWith("/downloads")){
                                        doc[prop][innerObjProp] = api + doc[prop][innerObjProp]; //change document value 
                                    }
                                    
                                }
                            });
                        }
                        else{
                            if(typeof doc[prop] === "string")
                            {
                                let arrayWithColon = doc[prop].split(":"); // if true then it's a uri with http://domain/ or https://domain/
                                if(arrayWithColon.length > 1){
                                    const splitFileUri = doc[prop].split("/");
                                    const newFilePathArray = splitFileUri.filter((uri)=>{ return splitFileUri.indexOf(uri) > 2}); // filter off the first 3 elements
                                    const newFilePathString = "/" + newFilePathArray.join("/");
                                    doc[prop] = api + newFilePathString; //change document value 
                                }
                                else if(doc[prop].startsWith("/files") || doc[prop].startsWith("/downloads")){
                                    doc[prop] = api + doc[prop]; //change document value completely
                                }
                            }
                        }           
                    });
                    return doc;
                  });
                }
            }
            return concatinatedDoc;
    },
    
    externalSiteUserAuth: async function(authData){
        /*  check if user exists by using username  */
          // if exists, log user in
          // if not, create new user with the external site data
          // must add externalSiteUSerId
          // in creation of new user, skip verification, by running a user.verification = 'activated'
          // remember to fill up the authData
        /*  */
        
    },

    deletePostAction: async function(){

    },
    updatePlayOrViewCount: async function(){

    }
   
     /* MISCELLANEOUS FUNCTIONS */
    
     

    /* NOTIFICATIONS FUNCTIONS */
   
}