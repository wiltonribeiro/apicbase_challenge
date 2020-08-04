import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

import colors from 'vuetify/lib/util/colors';

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#1B73D9',
                secondary: '#79AAF0',
                accent: colors.indigo.base
            }
        }
    }
});
