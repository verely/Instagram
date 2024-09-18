import { userService } from './user.service.js'
import { logger } from '../../services/logger.service.js'

export async function getUser(req, res) {
    try {
        const user = await userService.getById(req.params.id)
        res.send(user)
    } catch (err) {
        logger.error('Failed to get user', err)
        res.status(500).send({ err: 'Failed to get user' })
    }
}

export async function getUsers(req, res) {
    try {
        const filterBy = {
            txt: req.query?.txt || '',
            followingCount: +req.query?.followingCount || 0,
            followersCount: +req.query?.followersCount || 0
        }
        const users = await userService.query(filterBy)
        res.send(users)
    } catch (err) {
        logger.error('Failed to get users', err)
        res.status(500).send({ err: 'Failed to get users' })
    }
}

export async function deleteUser(req, res) {
    try {
        await userService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete user', err)
        res.status(500).send({ err: 'Failed to delete user' })
    }
}

export async function updateUser(req, res) {
    try {
        const userId = req.params.id
        const userData = req.body

        const updatedUser  = await userService.update(userId, userData)
        if (updatedUser) {
            res.send(updatedUser)
        } else {
            res.status(404).send({ error: 'User not found or update failed' })
        }
    } catch (err) {
        logger.error('Failed to update user', err)
        res.status(500).send({ err: 'Failed to update user' })
    }
}

export async function addUser(req, res) {
    try {
        const userData = req.body
        const newUser = await userService.add(userData)
        res.status(201).json(newUser)
    } catch (err) {
        logger.error(`Failed to add user`, err)
        res.status(400).send({ err: 'Failed to add user' })
    }
}

// export async function addUser(req, res) {
//     const {userName, fullName, password} = req.body
//     console.log(req.body)
//     let userToSave = {
//         userName: userName,
//         password: password || '', // Use bcrypt for hashed password on server
//         fullName: fullName || 'New User',
//         imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
//         bio: '',
//         followingCount: 0,
//         followersCount: 0,
//         savedPostIds: [],
//         isAdmin: false
//     }

//     try {
//         userToSave = await userService.add(userToSave)
//         res.send(userToSave)
//     } catch (error) {
//         logger.error(`Cannot add a user`, error)
//         res.status(400).send(`Cannot add a user`)
//     }
// }
