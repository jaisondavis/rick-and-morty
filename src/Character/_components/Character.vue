<template>
    <v-container class="grey lighten-5">
        <v-row>
            <v-col
                cols="6"
                offset-md="3"
                justify="center"
                style="margin-top: 12%"
            >
                <v-row style="margin: 0">
                    <v-col
                        cols="4"
                    >
                        <v-img
                            :src="resident.data.image"
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
                    >
                        <h1>{{resident.data.name}} <span style="font-size: 12px; font-weight: normal">{{resident.data.status}}</span></h1>
                        <h2>{{resident.data.species}}</h2>
                        <br/>
                        <p>{{resident.data.type}} / type</p>
                        <p>{{resident.data.gender}} / gender</p>
                        <p>{{resident.data.origin.name}} / origin</p>
                        <p>{{resident.data.location.name}} / location</p>
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
                        document.title = response.data.name
                    })
                    .catch(error => {
                        console.log(error)
                    })
            } else {
                this.$route.push('/character-not-found')
            }
            
        }
    }
</script>