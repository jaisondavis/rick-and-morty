<template>
    <v-container class="grey lighten-5">
        <v-row>
            <v-col
                cols="12"
            >
                <v-card
                    class="pa-2"
                    outlined
                    tile
                    style="padding: 20px !important"
                >
                    <v-img 
                        :src="resident.data.image"
                        width="200">
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
                    <br/>
                    {{resident.data.name}} <br/>
                    {{resident.data.status}} <br/>
                    {{resident.data.species}}
                </v-card>
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