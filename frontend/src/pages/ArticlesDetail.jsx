import { useLoaderData } from "react-router-dom"

export async function loader({ params }) {
    try{
        const req = await fetch(`http://localhost:3000/api/articles/${params.id}`);
        if(!req.ok){
            throw new Error('HTTP Error')
        }
        const res = await req.json()
        const article = res.data;
        return article;
    }catch(error){
        console.log(error);
        return error;
    }   
}

export default  function ArticleDetail() {
    const article = useLoaderData();

    


    
    
        return (
            <>
                <h1>Article Detail Page</h1>
                <h1>{article.title}</h1>

            </>
        )
}