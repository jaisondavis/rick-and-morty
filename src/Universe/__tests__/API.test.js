import api from '@/Universe/_api'

describe('API test', () => {
    test("if getLocation works", async () => {
        let resp = await api.getLocation(1)
        expect(resp.status).toBe(200)
    })

    test("if getCharacterbyId works", async () => {
        let resp = await api.getCharacterbyId(23)
        expect(resp.status).toBe(200)
    })

    test("if getCharacter works", async () => {
        let resp = await api.getCharacter('https://rickandmortyapi.com/api/character/15')
        expect(resp.status).toBe(200)
    })
})