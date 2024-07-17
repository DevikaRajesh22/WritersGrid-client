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

export const getArticles = async () => {
    try {
        const res = await Api.get(ArticleEndPoint.getArticles)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const findArticleById = async (id: string) => {
    try {
        const res = await Api.get(`${ArticleEndPoint.findArticleById}?articleId=${id}`);
        return res
    } catch (error) {
        console.log(error)
    }
}

export const editArticle = async (formData: FormData) => {
    try {
        const res = await Api.put(ArticleEndPoint.editArticle, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        return res
    } catch (error) {
        console.log(error)
    }
}

export const deleteArticle = async (id: string) => {
    try {
        const res = await Api.delete(`${ArticleEndPoint.deleteArticle}?articleId=${id}`)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getAllArticles=async()=>{
    try{
        const res=await Api.get(ArticleEndPoint.getAllArticles)
        return res
    }catch(error){
        console.log(error)
    }
}