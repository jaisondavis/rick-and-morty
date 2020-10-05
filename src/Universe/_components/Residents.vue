<template>
    <v-dialog
        width="900"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-card
                color="white lighten-2"
                dark
                v-bind="attrs"
                v-on="on"
                style="border-radius: 18px; min-height: 70px;"
                v-if="residents.length"
                @click="getAllCharacters"
            >
                <v-container style="padding: 0px 20px;">
                    <v-row>
                        <v-col cols="2" v-for="(res, i) in residents.slice(0,4)" :key="res.id">
                            <v-avatar>
                                <v-img
                                    v-if="!residentData[i]"
                                    src="https://rickandmortyapi.com/api/character/avatar/66.jpeg"
                                ></v-img>
                                <v-img
                                    lazy-src="https://rickandmortyapi.com/api/character/avatar/66.jpeg"
                                    v-if="residentData[i]"
                                    :src="residentData[i].image"
                                    alt="Alien"
                                ></v-img>
                            </v-avatar>
                        </v-col>
                        <v-col cols="2">
                            <v-avatar style="border: 1px solid #a7a7a78c">
                                <i aria-hidden="true" class="v-icon notranslate mdi mdi-chevron-right theme--dark black--text text--darken-1" style="font-size: 36px;"></i>
                            </v-avatar>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
            <v-card
                color="white"
                dark
                style="border-radius: 18px; min-height: 70px;"
                v-else
            >
                <v-container style="padding: 0px 20px;">
                    <v-row>
                        <v-col style="color: grey; text-align: center;">
                            <v-avatar style="border: 1px solid #a7a7a78c">
                                <v-icon
                                    large
                                    color="grey darken-1"
                                >
                                    mdi-close-circle
                                </v-icon>
                            </v-avatar>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </template>

        <v-card>
            <v-card-text style="padding: 10px 20px;">
                <v-row style="justify-content: center;">
                    <v-progress-circular
                        v-if="!residentData[0]"
                        indeterminate
                        color="dark lighten-5"
                    ></v-progress-circular>
                    <v-col
                        v-for="(res, index) in residentData"
                        :key="index"
                        cols="4"
                    >
                        <v-card
                            style="border-radius: 30px !important; padding: 0 !important;"
                            @click="goToCharacterPage(res)"
                        >
                            <v-img 
                                v-if="!residentData[index]"
                                src="https://rickandmortyapi.com/api/character/avatar/66.jpeg"></v-img>
                            <v-img 
                                v-if="residentData[index]"
                                lazy-src="https://rickandmortyapi.com/api/character/avatar/66.jpeg"
                                :src="residentData[index].image"
                                max-width="100%">
                                <template v-slot:placeholder>
                                    <v-row
                                        class="fill-height ma-0"
                                        align="center"
                                        justify="center"
                                    >
                                        <v-progress-circular
                                            indeterminate
                                            color="dark lighten-5"
                                        ></v-progress-circular>
                                    </v-row>
                                </template>
                            </v-img>
                            <div style="padding: 15px 20px">
                                <h2 style="white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis;">
                                    {{res.name}}
                                </h2> 
                                <h4>{{res.status}} </h4> 
                                {{res.species}}
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<style>
    .v-dialog {
        border-radius: 30px !important;
    }
</style>
<script>
    import api from '../_api'

    export default {
        data() {
            return {
                residentData: []
            }
        },
        props: {
            residents: Array
        },
        created() {
            this.residents.map(chr => {
                api.getCharacter(chr)
                    .then(response => {
                        if(this.residentData.length<response.data.length) {
                            this.residentData.push(response.data)
                        }
                    })
                    .catch(() => {
                        api.getCharacter(chr)
                            .then(response => {
                                if(this.residentData.length<response.data.length) {
                                    this.residentData.push(response.data)
                                }
                            })
                    })
            })
        },
        methods: {
            goToCharacterPage(resident) {
                this.$router.push({ 
                    path: '/character/'+resident.id
                })
            },
            getAllCharacters() {
                console.log("getAllCharacters")
                this.residents.map(chr => {
                    api.getCharacter(chr)
                        .then(response => {
                            this.residentData.push(response.data)
                        })
                        .catch(() => {
                            api.getCharacter(chr)
                                .then(response => {
                                    this.residentData.push(response.data)
                                })
                        })
                })
            }
        }
    }
</script>