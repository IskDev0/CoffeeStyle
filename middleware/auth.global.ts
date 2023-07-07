export default defineNuxtRouteMiddleware(async (to, from) => {

    const user = useSupabaseUser()


    const client = useSupabaseAuthClient()



    if (to.path === "/profile" && !user.value) {
        return navigateTo('/auth/register');
    }

    if ((to.path === "/auth/login" || to.path === "/auth/register") && user.value) {
        return navigateTo('/profile');
    }

})