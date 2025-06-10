declare class CreateArticleDto {
    a_name: string;
    a_slug: string;
    a_description?: string;
    a_content?: string;
    a_avatar?: string;
    a_hot?: number;
    a_active?: number;
    a_view?: number;
}
export default CreateArticleDto;
