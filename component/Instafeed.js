import React,{useState,useEffect} from 'react'


export default function Instafeed() {
    const [InstaItems,setInstaItems]=useState([]);
    const userId='Your Username'
    const accessToken='Your Access Token'
    const instaUrl=`https://graph.instagram.com/${userId}/media?access_token=${accessToken}`
    useEffect(()=>{
        const fetchMedia=async (id)=>{
            const mediaUrl=`https://graph.instagram.com/${id}?access_token=${accessToken}}&fields=media_url,permalink,media_type,thumbnail_url`
        const res=await fetch(mediaUrl);
        const json= (await res.json())
        const response={
            permalink: json.permalink,
            mediaUrl: json.media_url,
            mediaType:json.media_type,
            thumbnailUrl:json.thumbnail_url
        }
        return response
        }
        const doFetch =async ()=>{
            if(!userId || !accessToken){
                console.log('userId or accessToken is undefined: ',{userId,accessToken})
                return;
            }
        
        const res = await fetch(instaUrl)
        const json = (await res.json()).data
        console.log(json,'json')
        let fetchedItems=[];
        for (let i=0;i<json.length&&i<9;i++){
            const item=json[i];
            const itemId=item.id;
            const instaItem =await fetchMedia(itemId);
            console.log(instaItem)
            fetchedItems.push(instaItem)

        }
        setInstaItems(fetchedItems) 
        }
        doFetch()
    },[userId,accessToken,instaUrl])
    console.log(InstaItems,'InstaItems')
    return (
    <React.Fragment>
        <div>
        {InstaItems.map((item,index)=>(
            <a index={index} href={item.permalink} target='_blank' rel="noreferrer">
                <img src={item.thumbnailUrl==undefined?item.mediaUrl:item.thumbnailUrl} alt="altText"/>
            </a>
        ))}
        </div>
    </React.Fragment>
  )
}
