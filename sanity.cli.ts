/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
    api: {
        projectId: 'bxzly96g',
        dataset: 'production',

    },
    studioHost: 'sayidali-portfolio-studio'
})