import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

import colors from 'vuetify/lib/util/colors';

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#0F1551',
                secondary: '#79AAF0',
                accent: colors.indigo.base
            }
        }
    }
});
