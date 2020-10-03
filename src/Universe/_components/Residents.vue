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
            >
                <v-container style="padding: 0px 20px;">
                    <v-row>
                        <v-col cols="2" v-for="i in residentData.slice(0,4)" :key="i.id">
                            <v-avatar>
                                <img
                                    :src="i.image"
                                    alt="John"
                                >
                            </v-avatar>
                        </v-col>
                        <v-col cols="2">
                            <v-avatar style="border: 1px solid #6161618c">
                                <v-icon
                                    large
                                    color="grey darken-2"
                                >
                                    mdi-chevron-right
                                </v-icon>
                            </v-avatar>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </template>

        <v-card>
            <v-card-text style="padding: 10px 20px;">
                <v-row>
                    <v-col
                        v-for="(res, index) in residentData"
                        :key="index"
                        cols="4"
                    >
                        <v-card
                            class="pa-2"
                            style="border-radius: 30px !important; padding: 0 !important;"
                            @click="goToCharacterPage(res)"
                        >
                            <v-img :src="res.image" max-width="100%">
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
                                <h2>{{res.name}}</h2> 
                                {{res.status}} <br/> 
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
                residentData: [],
                residentPreview: []
            }
        },
        props: {
            residents: Array
        },
        mounted() {
            this.residents.map(chr => {
                api.getCharacter(chr)
                    .then(response => {
                        if (this.residentPreview.length<4) {
                            this.residentPreview.push(response.data)
                        }
                        this.residentData.push(response.data)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
            
        },
        methods: {
            goToCharacterPage(resident) {
                console.log(resident)
                this.$router.push('/character/'+resident.id)
            }
        }
    }
</script>