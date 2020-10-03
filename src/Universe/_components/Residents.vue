<template>
    <v-dialog
        width="800"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="red lighten-2"
                dark
                v-bind="attrs"
                v-on="on"
            >
                Click Me
            </v-btn>
        </template>

        <v-card>
            <v-card-title class="headline">
                Residents
            </v-card-title>

            <v-card-text>
                <v-row>
                    <v-col
                        v-for="(res, index) in residentData"
                        :key="index"
                        cols="3"
                    >
                        <v-card
                            class="pa-2"
                            outlined
                            tile
                            style="padding: 20px !important"
                            @click="goToCharacterPage(res)"
                        >
                            <v-img :src="res.image">
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
                            {{res.name}} <br/> {{res.status}} <br/> {{res.species}}
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
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