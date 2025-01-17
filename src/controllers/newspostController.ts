export class NewsPostController {
    private newsPosts: any[] = []; // This will act as our in-memory database for news posts

    getAllNewsPosts(req: any, res: any) {
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;
        const paginatedPosts = this.newsPosts.slice(offset, offset + limit);
        res.json(paginatedPosts);
    }

    getNewsPostById(req: any, res: any) {
        const id = parseInt(req.params.id);
        const newsPost = this.newsPosts.find(post => post.id === id);
        if (newsPost) {
            res.json(newsPost);
        } else {
            res.status(404).send('News post not found');
        }
    }

    createNewsPost(req: any, res: any) {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).send('Title and content are required');
        }
        const newPost = { id: this.newsPosts.length + 1, title, content };
        this.newsPosts.push(newPost);
        res.status(201).json(newPost);
    }

    updateNewsPost(req: any, res: any) {
        const id = parseInt(req.params.id);
        const { title, content } = req.body;
        const newsPost = this.newsPosts.find(post => post.id === id);
        if (!newsPost) {
            return res.status(404).send('News post not found');
        }
        if (title) newsPost.title = title;
        if (content) newsPost.content = content;
        res.json(newsPost);
    }

    deleteNewsPost(req: any, res: any) {
        const id = parseInt(req.params.id);
        const index = this.newsPosts.findIndex(post => post.id === id);
        if (index === -1) {
            return res.status(404).send('News post not found');
        }
        this.newsPosts.splice(index, 1);
        res.status(204).send();
    }
}