import apiClient from "./api-client";


export interface User {
    id : number,
    name : string
  }
  



class UserService {
    getAllUser () {
        const controller = new AbortController();
       const request = apiClient
        .get<User[]>('/users', {signal : controller.signal})

        return {request, cancle : () => controller.abort()}
    }
    deleteUser (id : number){
       return apiClient.delete('/users/' + id)
    }

    addUser (user : User) {
        return   apiClient.post('/users', user)
    }

     updateUser  = (user : User) => {
        return apiClient.patch('/users/' + user.id , user)
        
    }
}


export default new UserService()