import {defineStore} from "pinia";
import blogsList from "/blogs.json"

export const useBlogsStore = defineStore('blogs', () => {
    // @ts-ignore
    const blogs = ref<BlogType[]>(blogsList)

    return {
        blogs
    }
})