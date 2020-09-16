const api_url = require("../constants/api_url");

 const api = {
   /* GET REQUESTS */
   getItemById: async function (apiEndPoint,id,fields){
    try{
      const response = await fetch(api_url+apiEndPoint+ "/"+id+'/?fields='+fields,{credentials: "include"});
      const myResponse = await response.json();
      return myResponse;
    }
    catch (error) {
      console.error('Error:', error);
    }
   },

   getItemByUsername: async function (apiEndPoint,username,fields=null){
    try{
      let response;
      if(fields){
          response = await fetch(api_url+apiEndPoint+'/?username='+username+'&fields='+fields,{credentials: "include"});
      }
      else{
        response = await fetch(api_url+apiEndPoint+'/?username='+username,{credentials: "include"});
      }
      const myResponse = await response.json();
      return myResponse;
    }
    catch (error) {
      console.error('Error:', error);
    }
   },

   getItems: async function (apiEndPoint,postId=null,postType=null,commentType=null,userId=null,fields=null,limit=null, otherQueriesObject=[]){
    try{
      let otherQueries = "";
      for(let query in otherQueriesObject){
          otherQueries = otherQueries + "&" + query + "=" + otherQueriesObject[query];
      }
      const response = await fetch(api_url+apiEndPoint+'/?fields='+fields+'&postId='+postId+'&postType='+postType+'&commentType='+commentType+'&userId='+userId+'&limit='+limit+otherQueries,{credentials: "include"});
      const myResponse = await response.json();
      return myResponse;
    }
    catch (error) {
      console.error('Error:', error);
    }
   },
   gePostsByTaxonomy: async function (apiEndPoint,post_type, taxonomy, taxonomyValue, userId=null, username=null, fields=null, limit=null){
    try{
      let queries;
      if(userId){
        queries =  '?userId='+userId+'&fields='+fields+'&limit='+limit;
      }
      else if(username){
        queries =  '?username='+username+'&fields='+fields+'&limit='+limit;
      }
      else{
        queries =  '?fields='+fields+'&limit='+limit;
      }
      const params = "/"+post_type+"/"+taxonomy+"/"+taxonomyValue+"/";
      const response = await fetch(api_url+apiEndPoint+params+queries);
      const myResponse = await response.json();
      return myResponse;
    }
    catch (error) {
      console.error('Error:', error);
    }
   },
   

   /* POST REQUESTS */
   createItem: async function (apiEndPoint,data){
    try{
      const response = await fetch(api_url+apiEndPoint,{
          method: 'POST', 
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          body: JSON.stringify(data),
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
      });
      if(response.status){
        const myResponse = await response.json();
        return myResponse;
      }
    
    }
      catch (error) {
        console.error('Error:', error);
      }
      
   },
   
   /* PUT REQUESTS */
   updateItem: async function (apiEndPoint,data,id){
    try{
      const response = await fetch(api_url+apiEndPoint+"/"+id,{
          method: 'PUT',
          body: JSON.stringify(data), 
          credentials: "include",
          headers: {
            'Content-Type': 'application/json'
          }
      });
      if(response.status){
        const myResponse = await response.json();
        return myResponse;
      }

    }
      catch (error) {
        console.error('Error:', error);
      }
      
   },
   /* DELETE REQUESTS */

   deleteItemByid: async function (apiEndPoint,id){
    const data = {id: id};
    try{
          const response = await fetch(api_url+apiEndPoint,{
          method: 'DELETE', 
          body: JSON.stringify(data), 
          credentials: "include",
          headers: {
            'Content-Type': 'application/json'
          }
      });
      if(response.status){
        const myResponse = await response.json();
        return myResponse;
      }

    }
      catch (error) {
        console.error('Error:', error);
      }
      
  },

  deleteItem: async function (apiEndPoint,deleteObject){
    const data = deleteObject;
    try{
          const response = await fetch(api_url+apiEndPoint,{
          method: 'DELETE', 
          body: JSON.stringify(data), 
          credentials: "include",
          headers: {
            'Content-Type': 'application/json'
          }
      });
      if(response.status){
        const myResponse = await response.json();
        return myResponse;
      }

    }
      catch (error) {
        console.error('Error:', error);
      }
      
  }
}

export default api;