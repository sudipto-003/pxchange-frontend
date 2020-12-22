<template>
    <div>
        <div class="mb-3">
            <b-row align-v="stretch" cols="2">
                <div v-for="item in items" :key="item.id">
                    <b-col align-self="strectch">
                        <b-card no-body class="overflow-hidden" style="max-width: 540px;">
                            <b-row no-gutters>
                                <b-col md="6">
                                    <b-card-img :src="item.image" alt="Image" class="rounded-0"></b-card-img>
    
                                </b-col>
                                <b-col md="6">
                                    <b-card-body :title="item.title">
                                        <b-card-text>
                                            Location: <strong>{{ item.location }}</strong><br>
                                            Quantity: <strong>{{ item.quantity }}</strong><br>
                                            Price: <strong>{{ item.asked_price }} BDT.</strong><br>
                                            
                                        </b-card-text>
                                        <router-link :to="{ name: 'Detail', params:{id: item.id }}">Details...</router-link> 
                                    </b-card-body>
                                </b-col>
                            </b-row>
                        </b-card>
                    </b-col>
                </div>
            </b-row>
            <b-row>
                <b-col align-self="end">
                    <p>Showing Page {{ cur_page }} of total {{ total_pages }} Pages.</p>
                    <b-button-group>
                        <b-button variant="info" :disabled="hasPrevious">
                            <b-icon icon="arrow-left-circle"></b-icon>Previous</b-button>
                        <b-button variant="info" :disabled="hasNext">Next
                            <b-icon icon="arrow-right-circle"></b-icon>
                        </b-button>
                    </b-button-group>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Page',
    data(){
        return{
            cur_page: null,
            total_pages: 0,
            total_items: 0,
            next_page: null,
            previous_page: null,
            items: []
        }
    },
    mounted(){
        axios({url: 'http://127.0.0.1:9000/sell/allposts/', method: 'GET'})
        .then(resp => {
            this.next_page = resp.data.next_page
            this.previous_page = resp.data.previous_page
            this.cur_page = resp.data.cur_page
            this.total_pages = resp.data.total_pages
            this.total_items = resp.data.count
            this.items = resp.data.results
        })
        .catch(err => {
            console.log(err)
        })
    },
    computed: {
        hasNext(){
            return this.next_page === null
        },

        hasPrevious(){
            return this.previous_page === null
        }
    }

}
</script>