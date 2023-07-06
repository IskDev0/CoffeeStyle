import {defineStore} from "pinia";


export const useBlogsStore = defineStore('blogs', () => {
    const blogs = ref<BlogType[]>([])

    return {
        blogs
    }
})