self.addEventListener('activate', function(event) {
    event.waitUntil(createDB(["location", "character"]))
})

self.addEventListener('fetch', function(event) {
    var requestType = event.request.headers.get("request_type")
    switch (requestType) {
        case "character":
        case "location":
            event.respondWith(
                fetchFromStore(event.request, requestType)
                    .then(function(resp) {
                        var blob = new Blob([JSON.stringify(resp.data)], {type : 'application/json'})
                        var init = { "status" : 200 , "statusText" : "success" }
                        var syntheticResponse = new Response(blob, init)
                        return syntheticResponse
                    })
            )
            break;
        default:
            event.respondWith(
                caches.open('fetch-icpt').then(function(cache) {
                    return cache.match(event.request).then(function (response) {
                        return response || fetch(event.request).then(function(response) {
                            cache.put(event.request, response.clone())
                            return response;
                        }).catch(error => {
                            return fetch(event.request).then(function(response) {
                                cache.put(event.request, response.clone())
                                return response;
                            })
                        })
                    })
                })
            )
    }    
})

function fetchFromStore(req, store) {
    return new Promise(
        function(resolve, reject) {
            var openReq = indexedDB.open('rick-requests', 1)
            openReq.onsuccess = function(event) {
                var transaction = event.target.result.transaction([store])
                var objectStore = transaction.objectStore(store)
                var request = objectStore.get(req.url)

                request.onsuccess = function(event) {
                    resp = request.result
                    if (resp) {
                        resolve(resp.response)
                    } else {
                        fetch(req).then(function(response) {
                            response.json().then(responseJson => {
                                insertIntoStore(req.url, {data: responseJson}, store)
                                resolve({data: responseJson})
                            })
                        }).catch(error => {
                            fetch(req).then(function(response) {
                                response.json().then(responseJson => {
                                    insertIntoStore(req.url, {data: responseJson}, store)
                                    resolve({data: responseJson})
                                })
                            })
                        })
                    }
                }
                request.onerror = function(event) {
                    reject("error")
                }
            }
            openReq.onerror = function(event) {
                reject("error")
            }
        }
    )
}

function insertIntoStore(req, resObj, store) {
    var openReq = indexedDB.open('rick-requests', 1)
    openReq.onsuccess = function(event) {
        var objectStore, transaction

        try {
            transaction = event.target.result.transaction([store], "readwrite")
            objectStore = transaction.objectStore(store)
        }
        catch(e) {
            objectStore = db.createObjectStore(store, { keyPath: "request" })
            objectStore.createIndex("response", "response", { unique: false })
        }

        var toAdd = { request: req, response: resObj }
        objectStore.add(toAdd)
    }
}

function createDB(store) {
    var db
    var openReq = indexedDB.open('rick-requests', 1)
    openReq.onupgradeneeded = function(event) {
        db = event.target.result
        store.map(itm => {
            let objectStore = db.createObjectStore(itm, { keyPath: "request" })
            objectStore.createIndex("response", "response", { unique: false })
        })
    }
}