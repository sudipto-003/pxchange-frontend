<template>
    <div>
        <b-card title="Categories">
            <b-list-group>
                <div v-for="group of group_list" :key="group.category">
                    <b-list-group-item variant="success" class="d-flex justify-content-between align-items-center">
                        {{ group.category }}<b-badge variant="success" pill>{{ group.total }}</b-badge>
                    </b-list-group-item>
                </div>
            </b-list-group>
        </b-card>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'SideBar',
    mounted(){
        this.$store.dispatch('group_count')
    },
    computed: {
        ...mapState({
            group_list: state => state.groups
        })
    }
    
}
</script>