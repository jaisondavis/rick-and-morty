import api from '@/Character/_api'

describe('API test', () => {
    test("if getCharacter works", async () => {
        let resp = await api.getCharacter(45)
        expect(resp.status).toBe(200)
    })
})