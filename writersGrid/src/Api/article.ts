import Api from "../Service/axios";
import ArticleEndPoint from '../Service/endpoints/articleEndPoints'

export const newArticle = async (formData: FormData) => {
    try {
        const res = await Api.post(ArticleEndPoint.newArticle, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getArticles=async()=>{
    try{
        const res=await Api.get(ArticleEndPoint.getArticles)
        return res
    }catch(error){
        console.log(error)
    }
}

export const findArticleById=async(id:string)=>{
    try{
        const res=await Api.get(`${ArticleEndPoint.findArticleById}?articleId=${id}`);
        return res
    }catch(error){
        console.log(error)
    }
}