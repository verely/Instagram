import Axios from 'axios'

var axios = Axios.create({
    withCredentials: true
})


const BASE_URL = import.meta.env.VITE_DEV_ENV === 'true'
  ? '//localhost:3000/api/post/'
  : '/api/post/'


export const postService = {
    query,
    get,
    remove,
    save,
    getEmptyPost,
    getDefaultFilter,
    getPostsByOwnerId,
    updateLikeStatus,
    addCommentToPost,
    getCommentsByPostId,
    getSavedPosts
}

async function query(filterBy = {}) {
    //console.log('query filterBy', filterBy)
    const response = await axios.get(BASE_URL, { params: filterBy })
    const { posts, totalCount } = response.data
    return { posts, totalCount }
}

async function get(postId) {
    const { data: post } = await axios.get(BASE_URL + postId)
    return post
}

async function remove(postId) {
    return axios.delete(BASE_URL + postId)
}

async function save(post) {
    const method = post._id ? 'put' : 'post'
    const { data: savedPost } = await axios[method](BASE_URL + (post._id || ''), {post})
    //console.log(savedPost)
    return savedPost
}

async function getPostsByOwnerId(ownerId) {
    try {
        const result = await query({postOwnerId: ownerId})
        // console.log('Query result:', result)

        if (!Array.isArray(result.posts)) {
            throw new Error('Invalid response from API')
        }

        const userPosts = result.posts?.map(post => ({
                _id: post._id,
                imgUrl: post.imgUrl,
                created_at: post.created_at,
                likeCount: post.likedBy ? post.likedBy.length : 0,
                commentCount: post.comments ? post.comments.length : 0
            }))
        return userPosts
    } catch (err) {
        console.error('Error occurred while querying posts by ownerId:', err.message)
        throw new Error('Failed to query posts by ownerId. Please try again later.')
    }
}

async function updateLikeStatus(actionType, postId, currentUser) {

    const post = await get(postId)
    if (!post) {
        throw new Error('Invalid post.')
    }

    if (!post.likedBy) {
        post.likedBy = []
    }

    if (actionType === "like") {
        post.likedBy.push(currentUser)
    } else {
        post.likedBy = post.likedBy.filter(user => user._id !== currentUser._id)
    }

    await save(post)

    return post.likedBy
}

async function addCommentToPost(postId, text, user){
    try {
        const comment = {
            postId: postId,
            txt: text,
            by: user
        }

        const httpMethod  = 'post'
        const { data: savedComment } = await axios[httpMethod](`${BASE_URL}${postId}/comments`, {comment})
        //console.log(savedComment)

        return savedComment

    } catch (err) {
        console.error('Error occurred while adding comment the post:', err.message)
        throw new Error('Failed to add comment to the post. Please try again later.')
    }
}

async function getCommentsByPostId(postId) {
    try {
        const { data: comments } = await axios.get(`${BASE_URL}${postId}/comments`)
        return comments
    } catch (err) {
        console.error('Error occurred while fetching comments by postId:', err.message)
        throw new Error('Failed to query comments by postId. Please try again later.')
    }
}

async function getSavedPosts(postIdList, userName) {
    try {
        //console.log(`postIdList: ${JSON.stringify(postIdList)}`)
        if (!postIdList || !postIdList.length) return []

        const { data: savedPosts } = await axios.post(`${BASE_URL}${userName}/saved`,{postIdList})

        return savedPosts
    } catch (err) {
        console.error('Error occurred while getting saved posts', err.message)
        throw new Error('Failed to get saved posts by postIdList. Please try again later.')
    }
}

function getEmptyPost(title = '', desc='', severity = '') {
    return { title, desc, severity }
}

function getDefaultFilter() {
    return { title: '', minSeverity: '', pageIndex: 0 }
}
