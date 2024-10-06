export const storageService = {
    query,
    get,
    post,
    put,
    remove,
}

function getStorage(storageType = 'local') {
    return storageType === 'session' ? sessionStorage : localStorage
}

function query(entityType, storageType = 'local', delay = 0) {
    const storage = getStorage(storageType)
    var entities = JSON.parse(storage.getItem(entityType)) || []
    return new Promise(resolve => setTimeout(() => resolve(entities), delay))
}

function get(entityType, entityId, storageType = 'local') {
    return query(entityType, storageType).then(entities => {
        const entity = entities.find(entity => entity._id === entityId)
        if (!entity) throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        return entity
    })
}

function post(entityType, newEntity, storageType = 'local') {
    newEntity = JSON.parse(JSON.stringify(newEntity))
    newEntity._id = _makeId()
    return query(entityType, storageType).then(entities => {
        entities.push(newEntity)
        _save(entityType, entities, storageType)
        return newEntity
    })
}

function put(entityType, updatedEntity, storageType = 'local') {
    updatedEntity = JSON.parse(JSON.stringify(updatedEntity))
    return query(entityType, storageType).then(entities => {
        const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
        if (idx < 0) throw new Error(`Update failed, cannot find entity with id: ${updatedEntity._id} in: ${entityType}`)
        entities.splice(idx, 1, updatedEntity)
        _save(entityType, entities, storageType)
        return updatedEntity
    })
}

function remove(entityType, entityId, storageType = 'local') {
    return query(entityType, storageType).then(entities => {
        const idx = entities.findIndex(entity => entity._id === entityId)
        if (idx < 0) throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        entities.splice(idx, 1)
        _save(entityType, entities, storageType)
    })
}

// Private functions

function _save(entityType, entities, storageType = 'local') {
    const storage = getStorage(storageType)
    storage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}
