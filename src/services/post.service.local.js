import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'



export const postService = {
    query,
    getById,
    save,
    remove,
    addCommentToPost,
    updateLikeStatus,
    // sharePost,
    getEmptyPost,
    recentPosts
}
window.cs = postService

const STORAGE_KEY = 'posts'
_createPosts()

async function query(filterBy = { txt: '' }) {
    try {
        var posts = await storageService.query(STORAGE_KEY)
        if (filterBy.txt) {
            const regex = new RegExp(filterBy.txt, 'i')
            posts = posts.filter(post => regex.test(post.desc))
        }
        return posts
    } catch (error) {
        console.error('Error occurred while querying posts:', error.message)
        throw new Error('Failed to query posts. Please try again later.')
    }
}

function getById(postId) {
    try {
        return storageService.get(STORAGE_KEY, postId)
    } catch (error) {
        console.error(`Error occurred while getting the post ${postId}:`, error.message)
        throw new Error('Failed to remove the post. Please try again later.')
    }
}

async function remove(postId) {
    try {
        await storageService.remove(STORAGE_KEY, postId)
    } catch (error) {
        console.error(`Error occurred while removing the post ${postId}:`, error.message)
        throw new Error('Failed to remove the post. Please try again later.')
    }
}

async function updateLikeStatus(actionType, postId, currentUser) {

    const post = await getById(postId)
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

    await storageService.put(STORAGE_KEY, post)

    return post.likedBy
}

async function save(post) {
    try {
      const isNewPost = !post._id
      const storageFunction = isNewPost? storageService.post : storageService.put

      if (isNewPost){
        post.owner = getLoggedInUser()
        post.created_at = new Date()
      }

      const savedPost = storageFunction(STORAGE_KEY, post)
      return savedPost

    } catch (error) {
        console.error('Error occurred while saving the post:', error.message)
        throw new Error('Failed to save the post. Please try again later.')
    }
}

async function addCommentToPost(postId, text, user){
    try {
        const post = await getById(postId)

        if (!post) {
            throw new Error('Invalid post.')
        }

        if (!post.comments) {
            post.comments = []
        }

        const comment = {
            id: utilService.makeId(),
            created_at: new Date(),
            txt: text,
            by: user
        }

        post.comments.push(comment)
        await storageService.put(STORAGE_KEY, post)
        return comment

    } catch (error) {
        console.error('Error occurred while adding comment the post:', error.message)
        throw new Error('Failed to add comment to the post. Please try again later.')
    }
}

function sharePost(postId, senderId, recipientId){
    //to do
    try {
        console.log(`Share Post ${postId} with user ${recipientId} by user ${senderId}`)
    } catch (error) {
        console.error('Error occurred while sharing the post:', error.message)
        throw new Error('Failed to share the post. Please try again later.')
    }
}

function recentPosts(num=6) {
    const imagePaths = [
        '/media_samples/recent/01.jpeg',
        '/media_samples/recent/02.jpeg',
        '/media_samples/recent/03.jpeg',
        '/media_samples/recent/04.jpeg',
        '/media_samples/recent/05.jpeg',
        '/media_samples/recent/06.jpeg'
    ];

    const recentPosts = imagePaths.slice(0, num).map(path => ({
        imgUrl: path
    }));

    return recentPosts;
}

function getEmptyPost() {
    try {
        const loggedInUser = getLoggedInUser()
        if (!loggedInUser) {
            throw new Error('No user is logged in')
        }
        const user = {_id: loggedInUser._id, userName: loggedInUser.userName, imgUrl: loggedInUser.imgUrl}

        const imgPath = '../media_samples/img_flowers/1.jpg'
        //utilService.getAssetSrc('react.svg')
        const post = {
            _id: utilService.makeId(),
            desc: 'Flower blossoms',
            imgUrl: imgPath,
            owner: user
        }
        return post
    } catch (error) {
        console.error('Error occurred while creating post:', error.message)
        throw new Error('Failed to create the post. Please try again later.')
    }
}

function _createPosts() {
    let posts = utilService.loadFromStorage(STORAGE_KEY)
    if (!posts || !posts.length) {

        const userImgPath = '../media_samples/img_profile/sloner.jpeg'
        const user =  { "_id": "u101", "userName": "sloner_garden", "fullName": "משתלת סלונר", "imgUrl": userImgPath}

        posts = [
            {   _id: utilService.makeId(),
                desc: 'היי חברים, רצינו לתת לכם השראה לעשר מתנות שאפשר לקנות מראש אצלנו במשתלה כבר בשבוע הקרוב כדי לא להגיע לערב החג לחוצים...',
                imgUrl: '../media_samples/img_flowers/sahlav.jpeg',
                owner: user,
                created_at: Date.now(),
                likedBy: [
                    {
                      "_id": "u105",
                      "userName": "naftaly_mashtelot",
                      "fullName": "משתלות נפתלי",
                      "imgUrl": "../media_samples/img_profile/naftaly_mashtela.jpg"
                    },
                    {
                      "_id": "u106",
                      "userName": "tina_jepsen",
                      "fullName": "Tina Jepsen",
                      "imgUrl": "../media_samples/img_profile/tina_jepsen.jgp"
                    },
                    {
                        "_id": "u106",
                        "userName": "sima_biniuri",
                        "fullName": "Sima Biniuri",
                        "imgUrl": "../media_samples/img_profile/sima_biniuri.jgp"
                    }
                  ],
            },
            {   _id: utilService.makeId(),
                desc: 'בוקר של פרחים',
                imgUrl: '../media_samples/img_flowers/in_store.jpeg',
                owner: user,
                created_at: Date.now(),
                likedBy: [
                    {
                      "_id": "u105",
                      "userName": "naftaly_mashtelot",
                      "fullName": "משתלות נפתלי",
                      "imgUrl": "../media_samples/img_profile/naftaly_mashtela.jpg"
                    },
                    {
                      "_id": "u106",
                      "userName": "tina_jepsen",
                      "fullName": "Tina Jepsen",
                      "imgUrl": "../media_samples/img_profile/tina_jepsen.jgp"
                    }
                  ],
            },
        ]

        // const userImgPath = '../media_samples/img_profile/1.jpg'
        // const user =  { "_id": "u101", "userName": "Tuppence", "fullName": "Tuppence Beresford", "imgUrl": userImgPath}

        // posts = [
        //     {   _id: utilService.makeId(),
        //         desc: 'Flower blossoms',
        //         imgUrl: '../media_samples/img_flowers/1.jpg',
        //         owner: user,
        //         created_at: Date.now()
        //     },
        //     {   _id: utilService.makeId(),
        //         desc: 'More flower blossoms',
        //         imgUrl: '../media_samples/img_flowers/2.jpg',
        //         owner: user,
        //         created_at: Date.now()
        //     },
        // ]

        utilService.saveToStorage(STORAGE_KEY, posts)
    }
}

function getLoggedInUser() {
    const imgPath = '../media_samples/img_profile/1.jpg'
    return { "_id": "u101", "userName": "Tuppence", "fullName": "Tuppence Beresford", "imgUrl": imgPath}
    //return userService.getLoggedInUser()
}
