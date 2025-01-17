export interface NewsPost {
    id: number;
    title: string;
    content: string;
    categoryId: number;
    createdAt: Date;
    updatedAt: Date;
}

export class NewsPostModel {
    private newsPosts: NewsPost[] = [];
    private currentId: number = 1;

    public getAllNewsPosts(limit?: number, offset?: number): NewsPost[] {
        return this.newsPosts.slice(offset || 0, (limit ? (offset || 0) + limit : undefined));
    }

    public getNewsPostById(id: number): NewsPost | undefined {
        return this.newsPosts.find(post => post.id === id);
    }

    public createNewsPost(title: string, content: string, categoryId: number): NewsPost {
        if (!title || !content || !categoryId) {
            throw new Error("All fields are required.");
        }
        if (typeof categoryId !== 'number') {
            throw new Error("Category ID must be a number.");
        }

        const newPost: NewsPost = {
            id: this.currentId++,
            title,
            content,
            categoryId,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.newsPosts.push(newPost);
        return newPost;
    }

    public updateNewsPost(id: number, title?: string, content?: string, categoryId?: number): NewsPost | undefined {
        const post = this.getNewsPostById(id);
        if (!post) {
            throw new Error("News post not found.");
        }

        if (title) post.title = title;
        if (content) post.content = content;
        if (categoryId) post.categoryId = categoryId;
        post.updatedAt = new Date();

        return post;
    }

    public deleteNewsPost(id: number): boolean {
        const index = this.newsPosts.findIndex(post => post.id === id);
        if (index === -1) {
            throw new Error("News post not found.");
        }
        this.newsPosts.splice(index, 1);
        return true;
    }
}