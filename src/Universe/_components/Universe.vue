<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="3">
                <v-img
                    src="https://www.freepnglogos.com/uploads/rick-and-morty-png/rick-and-morty-portal-shoes-white-clothing-zavvi-23.png"
                ></v-img>
            </v-col>
        </v-row>
        <v-row>
            <v-col
                v-for="loc in location"
                :key="loc.id"
                cols="4"
            >
                <v-card flat style="border: 1px solid #74747429; border-radius: 30px;">
                    <v-card-text style="padding: 28px;">
                        <h1 style="line-height: 1.2;">
                            {{loc.name}}
                        </h1>
                        <h2 style="margin: 20px 0px;">
                            {{loc.type}}
                        </h2>
                        <h3 style="margin: 20px 0px;">
                            {{loc.dimension}} <span style="font-weight: 300;"> / Dimension</span>
                        </h3>

                        <Residents :residents="loc.residents"/>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<style>
    
</style>
<script>
    import api from '@/Universe/_api'

    export default {
        data() {
            return {
                location: []
            }
        },
        async created() {
            const firstLocation = await api.getLocation(1)
            this.location = [...firstLocation.data.results]
            
            for (let i=2; i<=firstLocation.data.info.pages; i++) {
                api.getLocation(i)
                    .then(response => {
                        this.location = [...this.location, ...response.data.results]
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        },
        components: {
            Residents: () => import('./Residents')
        }
    }
</script>