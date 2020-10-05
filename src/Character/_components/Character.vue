<template>
    <v-container>
        <v-row>
            <v-col
                cols="8"
                offset-md="2"
                justify="center"
                style="margin-top: 10%"
            >
                <v-row>
                    <v-col
                        cols="12"
                    >
                        <v-avatar color="grey" size="36">
                            <v-icon dark @click="goBack">
                                mdi-arrow-left
                            </v-icon>
                        </v-avatar>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col
                        cols="4"
                    >
                        <v-img
                            :src="resident.data?resident.data.image:''"
                            width="100%"
                            style="border-radius: 20px">
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
                    </v-col>
                    <v-col
                        cols="8"
                        v-if="resident.data"
                    >
                        <h1>{{resident.data.name}} <span style="font-size: 12px; font-weight: normal">{{resident.data.status}}</span></h1>
                        <h3>{{resident.data.species}}</h3>
                        
                        <p style="margin-top: 20px">{{resident.data.type?resident.data.type:'Unknown'}} / type</p>
                        <p>{{resident.data.gender}} / gender</p>
                        <p>{{resident.data.origin?resident.data.origin.name:'Unknown'}} / origin</p>
                        <p>{{resident.data.location?resident.data.location.name:'Unknown'}} / location</p>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
    import api from '../_api'

    export default {
        data() {
            return {
                resident: {}
            }
        },
        created() {
            if (this.$route.params.id) {
                api.getCharacter(this.$route.params.id)
                    .then(response => {
                        this.resident = response
                        document.title = response.data.name + ' | Rick & Morty'
                    })
                    .catch(error => {
                        console.log(error)
                        api.getCharacter(this.$route.params.id)
                            .then(response => {
                                this.resident = response
                                document.title = response.data.name + ' | Rick & Morty'
                            })
                    })
            } else {
                this.$router.push('/character-not-found')
            }
            
        },
        methods: {
            goBack() {
                this.$router.push({name: 'Home'})
            }
        }
    }
</script>