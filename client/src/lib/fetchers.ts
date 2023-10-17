import { userProps } from "@/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";


//Login to chat app
export async function handleSubmit (e:any, router: AppRouterInstance, avatarId:string, socket:any) {
    e.preventDefault();

    try {
        await fetch("/auth", {
            method: "POST",
            body: JSON.stringify({
                name: e.target[0].value,
                email: e.target[1].value,
                imageId: `https://robohash.org/${avatarId}.png`,
            }),
            headers: {
                "Content-Type":"application/json",
            }
        });

        socket.emit("joined", "new user");  //trigger event

        router.push('/chat');
        
    } catch (err) {
        console.log(err);
    }
}



//Sidebar user fetching
export async function fetchUser(cookie: { user?: any; }, setUser: { (user: any): void; (arg0: any): void; }) {
    const accessToken = cookie.user;
    // console.log(accessToken);

    const response = await fetch('/user', {
        method: "GET",
        headers: {
            Authorization: `${accessToken}`
        },
    });

    const user = await response.json();
    // console.log({user});  

    setUser(user[0]);  //set to first element in a user array
}


//Chatlist >>> fetch all users except myself
export async function fetchUsers(mySelf:userProps, setUsers:any) {
    const data = await fetch("/users"); //fetch all users from DB
    const myUsers = await data.json();
    // console.log({myUsers});

    // set users and filter myself
    setUsers(myUsers.filter((user:any)=> user.email !== mySelf?.email));
}


export async function fetchMessages(sender:any, receiver:any, setMessages:any) {
    if (sender && receiver ) {
        try {
            const res = await fetch(`/messages?sender=${sender?.email}&receiver=${receiver?.email}`);
            const data = await res?.json();
            // console.log({data});

            setMessages(data);

        } catch (err) {
            console.log(err);
            setMessages(null);
        }
    }
}