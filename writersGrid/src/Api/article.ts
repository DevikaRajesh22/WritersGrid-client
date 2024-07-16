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