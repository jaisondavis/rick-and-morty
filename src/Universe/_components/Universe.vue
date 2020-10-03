<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="3">
                <v-img
                    src="https://www.logolynx.com/images/logolynx/b4/b4c778e995540fc7d344a1ddf33a035b.png"
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
                        <h2>
                            {{loc.name}}
                        </h2>
                        <h3>
                            {{loc.type}}
                        </h3>
                        <p>{{loc.dimension}}</p>
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