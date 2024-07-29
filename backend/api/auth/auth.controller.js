import { authService } from './auth.service.js'
import { logger } from '../../services/logger.service.js'

export async function signup(req, res) {
    try {
        const { userName, password, fullName, imgUrl } = req.body

        const account = await authService.signup(userName, password, fullName, imgUrl)
        logger.debug(`auth.route - new account created: ` + JSON.stringify({userName: account.userName, fullName: account.fullName}))

        const user = await authService.login(userName, password)
        const loginToken = authService.getLoginToken(user)

        res.cookie('loginToken', loginToken)
        res.json(user)
    } catch (err) {
        logger.error('Failed to signup ' + err)
        res.status(500).send({ err: 'Failed to signup' })
    }
}

export async function login(req, res) {
    const { userName, password, isGuest } = req.body
    try {

        let user
        if (isGuest)
            user = authService.loginAsGuest()
        else
            user = await authService.login(userName, password)

        const loginToken = authService.getLoginToken(user)

        logger.info('User login: ', user)
        res.cookie('loginToken', loginToken)
        res.json(user)
    } catch (err) {
        logger.error('Failed to Login ' + err)
        res.status(401).send({ err: 'Failed to Login' })
    }
}

export async function logout(req, res){
    try {
        res.clearCookie('loginToken')
        res.send({ msg: 'Logged out successfully' })
    } catch (err) {
        logger.error('Failed to logout ' + err)
        res.status(500).send({ err: 'Failed to logout' })
    }
}
